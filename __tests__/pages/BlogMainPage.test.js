import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Posts from '@src/app/posts/[[...userId]]/page';
import { PostList } from '@src/components/PostList/PostList';

jest.mock('@src/components/PostList/PostList', () => ({
  PostList: jest.fn(() => <div>Mocked Post List</div>),
}));

describe('Posts', () => {
  it('올바른 유저Id의 블로그의 포스트 목록이 렌더링되어야 합니다.', () => {
    const mockParams = {
      userId: ['유저Id'],
    };

    act(() => {
      render(<Posts params={mockParams} />);
    });

    expect(screen.getByText('Mocked Post List')).toBeInTheDocument();
    expect(PostList).toHaveBeenCalledWith({ blogUserId: '유저Id' }, {});
  });
});
