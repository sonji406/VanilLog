import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Comment from '@src/components/Comment/Comment';

describe('<Comment />', () => {
  const mockCommentInfo = {
    _id: 'commentId',
    comment: '댓글 내용',
    blogPost: 'postId',
    author: 'authorId',
  };

  it('댓글 텍스트와 작성자가 올바르게 렌더링되어야 한다.', () => {
    useSession.mockReturnValue({
      data: {
        mongoId: '현재 접속자 mongoId',
      },
    });

    act(() => {
      render(<Comment commentInfo={mockCommentInfo} />);
    });

    expect(screen.getByText('댓글 내용')).toBeInTheDocument();
    expect(screen.getByText('작성자: authorId')).toBeInTheDocument();
  });

  it('사용자가 작성자일 경우 수정 및 삭제 버튼이 나타나야 한다.', () => {
    useSession.mockReturnValue({
      data: {
        mongoId: 'authorId',
      },
    });

    act(() => {
      render(<Comment commentInfo={mockCommentInfo} />);
    });

    expect(screen.getByText('수정')).toBeInTheDocument();
    expect(screen.getByText('삭제')).toBeInTheDocument();
  });

  it('댓글 수정이 올바르게 이루어져야 한다.', async () => {
    useSession.mockReturnValue({
      data: {
        mongoId: 'authorId',
      },
    });

    axios.put.mockResolvedValue({
      data: {
        status: 'success',
      },
    });

    act(() => {
      render(<Comment commentInfo={mockCommentInfo} />);
    });

    act(() => {
      fireEvent.click(screen.getByText('수정'));
    });

    const input = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(input, { target: { value: 'Updated comment' } });
      fireEvent.click(screen.getByText('확인'));
    });

    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  it('댓글 삭제가 올바르게 이루어져야 한다.', async () => {
    useSession.mockReturnValue({
      data: {
        mongoId: 'authorId',
      },
    });

    axios.delete.mockResolvedValue({
      data: {
        status: 'success',
      },
    });

    act(() => {
      render(<Comment commentInfo={mockCommentInfo} />);
    });

    act(() => {
      fireEvent.click(screen.getByText('삭제'));
    });

    await waitFor(() => expect(axios.delete).toHaveBeenCalled());
  });
});
