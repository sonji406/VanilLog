import React from 'react';
import { render, screen, act } from '@testing-library/react';
import PostDetailPage from '@src/app/post/[userId]/[postId]/page';

jest.mock('@src/components/PostDetail/PostDetail', () => {
  return function MockedPostDetail() {
    return <div>Mocked Post Detail</div>;
  };
});

jest.mock('@src/components/Comment/CommentsContainer', () => {
  return function MockedCommentsContainer() {
    return <div>Mocked Comments Container</div>;
  };
});

describe('<PostDetailPage />', () => {
  it('가상의 PostDetail과 CommentsContainer가 렌더링되어야 한다.', async () => {
    const mockParams = {
      userId: '1',
      postId: '1',
    };

    await act(async () => {
      render(<PostDetailPage params={mockParams} />);
    });

    expect(screen.getByText('Mocked Post Detail')).toBeInTheDocument();
    expect(screen.getByText('Mocked Comments Container')).toBeInTheDocument();
  });
});
