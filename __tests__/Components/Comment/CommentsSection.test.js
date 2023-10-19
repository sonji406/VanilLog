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

describe('CommentsSection', () => {
  let mockComments = [];
  let mockOnCommentChange = jest.fn();
  let mockOnCommentSubmit = jest.fn();
  let mockCommentText = 'This is a comment';
  let mockErrorMessage = null;

  beforeEach(() => {
    mockComments = [
      {
        _id: 'someId1',
        comment: 'Great post!',
        author: {
          _id: 'userId1',
          nickname: 'JohnDoe',
        },
      },
    ];

    useSession.mockReturnValue({ data: { mongoId: 'someMongoId' } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders comments and allows new comments to be submitted', async () => {
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

    expect(screen.getByText('Great post!')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('댓글 내용을 입력하세요');
    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });

    fireEvent.change(textarea, { target: { value: 'Another great post!' } });
    expect(mockOnCommentChange).toHaveBeenCalled();

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockOnCommentSubmit).toHaveBeenCalled();
    });
  });
});
