import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import CommentsSection from '@src/components/Comment/CommentsSection';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('<CommentsSection />', () => {
  let mockComments = [];
  let mockOnCommentChange = jest.fn();
  let mockOnCommentSubmit = jest.fn();
  let mockCommentText = '댓글 내용';
  let mockErrorMessage = null;

  beforeEach(() => {
    mockComments = [
      {
        _id: 'testCommentId',
        comment: 'testCommentContent',
        author: {
          _id: 'testAuthorId',
          nickname: 'testAuthorNickname',
        },
      },
    ];

    useSession.mockReturnValue({ data: { mongoId: 'testUserId' } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('댓글 렌더링 및 새 댓글 작성 기능이 올바르게 렌더링 되어야 한다.', async () => {
    act(() => {
      render(
        <CommentsSection
          comments={mockComments}
          commentText={mockCommentText}
          onCommentChange={mockOnCommentChange}
          onCommentSubmit={mockOnCommentSubmit}
          errorMessage={mockErrorMessage}
        />,
      );
    });

    expect(screen.getByText('testCommentContent')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('댓글 내용을 입력하세요');
    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });

    fireEvent.change(textarea, {
      target: { value: 'edited testCommentContent' },
    });
    expect(mockOnCommentChange).toHaveBeenCalled();

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockOnCommentSubmit).toHaveBeenCalled();
    });
  });
});
