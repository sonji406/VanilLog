import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { PostList } from '@src/components/postlist/PostList';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

describe('PostList', () => {
  it('포스트들이 정상적으로 렌더링되어야 한다.', async () => {
    useSession.mockReturnValue({
      data: { mongoId: 'testUserId' },
    });

    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('1'),
    });

    axios.get.mockResolvedValueOnce({
      data: {
        status: 'success',
        data: [
          {
            _id: '1',
            author: '작성자',
            content: {
              blocks: [],
            },
          },
        ],
        totalPosts: 1,
      },
    });

    await act(async () => {
      render(<PostList blogUserId='blogUserId' />);
    });

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('에러 상태를 정상적으로 처리해야 한다.', async () => {
    axios.get.mockRejectedValueOnce(new Error('에러 발생'));

    await act(async () => {
      render(<PostList blogUserId='blogUserId' />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('포스트를 불러오는 중 문제가 발생했습니다.'),
      ).toBeInTheDocument();
    });
  });
});
