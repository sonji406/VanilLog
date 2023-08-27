import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import CommentsContainer from '@src/components/Comment/CommentsContainer';
import { useComments } from '@utils/useComment';

describe('CommentsContainer', () => {
  it('댓글이 올바르게 렌더링되어야 한다.', async () => {
    const mockComments = [
      { _id: '1', comment: '첫 번째 댓글' },
      { _id: '2', comment: '두 번째 댓글' },
    ];

    axios.get.mockResolvedValueOnce({
      data: { status: 'success', data: mockComments },
    });

    useComments.mockReturnValue({
      commentText: '',
      setCommentText: jest.fn(),
      handleCommentSubmit: jest.fn(),
      errorMessage: null,
    });

    act(() => {
      render(<CommentsContainer postId='some-post-id' />);
    });

    await waitFor(() => {
      expect(screen.getByText('첫 번째 댓글')).toBeInTheDocument();
      expect(screen.getByText('두 번째 댓글')).toBeInTheDocument();
    });
  });

  it('새로운 댓글 작성 후 제출이 올바르게 되어야 한다.', async () => {
    const newComment = { _id: '3', comment: '새로운 댓글' };

    useComments.mockReturnValue({
      commentText: '새로운 댓글',
      setCommentText: jest.fn(),
      handleCommentSubmit: jest.fn().mockResolvedValue(newComment),
      errorMessage: null,
    });

    act(() => {
      render(<CommentsContainer postId='some-post-id' />);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('댓글 작성'));
    });

    await waitFor(() => {
      const allMatchingElements = screen.getAllByText('새로운 댓글');
      expect(allMatchingElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});
