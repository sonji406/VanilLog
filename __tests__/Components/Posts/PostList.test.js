import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { PostList } from '@src/components/Posts/PostList';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('<PostList /> - Pagination', () => {
  const mockRouter = {
    push: jest.fn(),
    query: {
      q: null,
      page: null,
      limit: null,
    },
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    useSession.mockReturnValue({ data: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('페이지 넘버 1 버튼이 표시될 때 그 버튼은 올바른 href로 렌더링 되어야 한다.', async () => {
    axios.get.mockResolvedValue({
      data: {
        status: 200,
        data: [],
        totalPosts: 10,
      },
    });

    render(<PostList blogUserId={null} />);

    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());

    const linkElement1 = screen.getByText('1').closest('a');
    expect(linkElement1).toHaveAttribute('href', '/posts?page=1&limit=10');
  });

  it('페이지 넘버 2 버튼이 표시될 때 그 버튼은 올바른 href로 렌더링 되어야 한다.', async () => {
    axios.get.mockResolvedValue({
      data: {
        status: 200,
        data: [],
        totalPosts: 50,
      },
    });

    render(<PostList blogUserId={null} />);

    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument());

    const linkElement2 = screen.getByText('2').closest('a');
    expect(linkElement2).toHaveAttribute('href', '/posts?page=2&limit=10');
  });
});

describe('<PostList /> - Search Results', () => {
  const mockRouter = {
    push: jest.fn(),
    query: {
      q: 'searchQuery',
      page: null,
      limit: null,
    },
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    useSession.mockReturnValue({ data: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('검색어에 해당되는 포스트가 있는 경우 검색 결과가 렌더링 되어야 한다.', async () => {
    const mockPosts = [
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

    axios.get.mockResolvedValue({
      data: {
        status: 200,
        data: mockPosts,
        totalPosts: mockPosts.length,
      },
    });

    render(<PostList blogUserId={null} />);

    await waitFor(() => {
      expect(screen.getByText('Search Result 1')).toBeInTheDocument();
      expect(screen.getByText('Search Result 2')).toBeInTheDocument();
    });
  });

  it('검색어에 해당되는 포스트가 없는 경우 검색 결과가 없다는 텍스트가 렌더링 되어야 한다.', async () => {
    axios.get.mockResolvedValue({
      data: {
        status: 200,
        data: [],
        totalPosts: 0,
      },
    });

    render(<PostList blogUserId={null} />);

    await waitFor(() => {
      expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });
  });
});
