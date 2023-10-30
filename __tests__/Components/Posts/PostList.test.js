import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { render, waitFor, screen } from '@testing-library/react';
import { PostList } from '@src/components/Posts/PostList';
import axios from 'axios';

const mockAxiosGet = (data) => {
  axios.get.mockResolvedValue({
    data: {
      status: 200,
      ...data,
    },
  });
};

const renderPostListWithQuery = (query) => {
  const mockRouter = {
    push: jest.fn(),
    query,
  };

  useRouter.mockReturnValue(mockRouter);
  useSession.mockReturnValue({ data: null });

  return render(<PostList blogUserId={null} />);
};

describe('<PostList /> - Pagination', () => {
  it('페이지 넘버 2 버튼이 표시될 때 그 버튼은 올바른 href로 렌더링 되어야 한다.', async () => {
    mockAxiosGet({
      data: [],
      totalPosts: 50,
    });

    renderPostListWithQuery({ page: '2', limit: '10' });

    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument());

    const linkElement2 = screen.getByText('2').closest('a');
    expect(linkElement2).toHaveAttribute('href', '/posts?page=2&limit=10');
  });
});

describe('<PostList /> - Search Results', () => {
  it('검색어에 해당되는 포스트가 있는 경우 검색 결과가 렌더링 되어야 한다.', async () => {
    const mockSearchResults = [
      {
        _id: 'testPostId1',
        author: 'testAuthorId1',
        title: 'Search Result 1',
        content: { ...global.mockPostData, blocks: [] },
      },
      {
        _id: 'testPostId2',
        author: 'testAuthorId2',
        title: 'Search Result 2',
        content: { ...global.mockPostData, blocks: [] },
      },
    ];

    mockAxiosGet({
      data: mockSearchResults,
      totalPosts: mockSearchResults.length,
    });

    renderPostListWithQuery({ q: 'searchQuery' });

    await waitFor(() => {
      expect(screen.getByText('Search Result 1')).toBeInTheDocument();
      expect(screen.getByText('Search Result 2')).toBeInTheDocument();
    });
  });

  it('검색어에 해당되는 포스트가 없는 경우 검색 결과가 없다는 텍스트가 렌더링 되어야 한다.', async () => {
    mockAxiosGet({
      data: [],
      totalPosts: 0,
    });

    renderPostListWithQuery({ q: 'searchQuery' });

    await waitFor(() => {
      expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });
  });
});
