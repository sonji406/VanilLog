import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Comment from '@src/components/Comment/Comment';
import axios from 'axios';
import { useSession } from 'next-auth/react';

jest.mock('axios');
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const mockCommentInfo = {
  _id: 'testCommentId',
  comment: 'testCommentContent',
  author: { _id: 'testAuthorId' },
  blogPost: 'testPostId',
};

describe('<Comment />', () => {
  beforeEach(() => {
    useSession.mockReturnValue({ data: { mongoId: 'testAuthorId' } });
    axios.put.mockResolvedValue({ data: { status: 200 } });
    axios.delete.mockResolvedValue({ data: { status: 200 } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('댓글 컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(<Comment commentInfo={mockCommentInfo} />);
    expect(screen.getByText('testCommentContent')).toBeInTheDocument();
  });

  it('댓글 편집이 가능해야 한다.', async () => {
    render(<Comment commentInfo={mockCommentInfo} />);
    fireEvent.click(screen.getByText('수정'));

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'edited testCommentContent' } });

    await act(async () => {
      fireEvent.click(screen.getByText('확인'));
    });

    expect(axios.put).toHaveBeenCalled();
  });

  it('댓글 편집 취소가 가능해야 한다.', () => {
    render(<Comment commentInfo={mockCommentInfo} />);
    fireEvent.click(screen.getByText('수정'));
    fireEvent.click(screen.getByText('취소'));
    expect(screen.getByText('testCommentContent')).toBeInTheDocument();
  });

  it('댓글 삭제가 가능해야 한다.', async () => {
    render(<Comment commentInfo={mockCommentInfo} />);

    await act(async () => {
      fireEvent.click(screen.getByText('삭제'));
    });

    expect(axios.delete).toHaveBeenCalled();
  });
});
