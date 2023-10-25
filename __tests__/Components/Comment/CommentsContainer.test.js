import React from 'react';
import {
  render,
  act,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import CommentsContainer from '@src/components/Comment/CommentsContainer';
import axios from 'axios';
import { useComments } from '@utils/useComment';

jest.mock('axios');
jest.mock('@utils/useComment');

describe('<CommentsContainer />', () => {
  const mockPostId = 'testPostId';
  const mockComments = [
    {
      _id: 'testCommentId1',
      comment: 'testCommentContent1',
      author: {
        _id: 'testCommentAuthorId1',
      },
    },
    {
      _id: 'testCommentId2',
      comment: 'testCommentContent2',
      author: {
        _id: 'testCommentAuthorId2',
      },
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { status: 200, data: mockComments } });

    useComments.mockReturnValue({
      commentText: '',
      setCommentText: jest.fn(),
      handleCommentSubmit: jest.fn(),
      errorMessage: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('댓글을 로딩하는 API 호출이 올바르게 이루어져야 한다.', async () => {
    await act(async () => {
      render(<CommentsContainer postId={mockPostId} />);
    });

    expect(axios.get).toHaveBeenCalledWith(`/api/v1/comment/${mockPostId}`);
    expect(screen.getByText('testCommentContent1')).toBeInTheDocument();
    expect(screen.getByText('testCommentContent2')).toBeInTheDocument();
  });

  it('새 댓글을 작성하는 함수가 제대로 동작해야 한다.', async () => {
    const newComment = {
      _id: 'newTestCommentId',
      comment: 'newTestCommentContent',
      author: 'newTestCommentAuthorId',
    };

    useComments.mockReturnValue({
      commentText: newComment.comment,
      setCommentText: jest.fn(),
      handleCommentSubmit: jest.fn().mockResolvedValue(newComment),
      errorMessage: null,
    });

    await act(async () => {
      render(<CommentsContainer postId={mockPostId} />);
    });

    const textarea = screen.getByPlaceholderText('댓글 내용을 입력하세요');
    fireEvent.change(textarea, { target: { value: newComment.comment } });

    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('newTestCommentContent')).toBeInTheDocument();
    });
  });
});
