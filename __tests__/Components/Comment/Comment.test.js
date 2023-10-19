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
  _id: 'comment1',
  comment: 'This is a comment',
  author: { _id: 'author1', nickname: 'Author1' },
  blogPost: 'post1',
};

describe('Comment Component', () => {
  beforeEach(() => {
    useSession.mockReturnValue({ data: { mongoId: 'author1' } });
    axios.put.mockResolvedValue({ data: { status: 200 } });
    axios.delete.mockResolvedValue({ data: { status: 200 } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<Comment commentInfo={mockCommentInfo} />);
    expect(screen.getByText('This is a comment')).toBeInTheDocument();
  });

  it('should allow editing comments', async () => {
    render(<Comment commentInfo={mockCommentInfo} />);
    fireEvent.click(screen.getByText('수정'));

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Comment' } });

    await act(async () => {
      fireEvent.click(screen.getByText('확인'));
    });

    expect(axios.put).toHaveBeenCalled();
  });

  it('should allow canceling editing', () => {
    render(<Comment commentInfo={mockCommentInfo} />);
    fireEvent.click(screen.getByText('수정'));
    fireEvent.click(screen.getByText('취소'));
    expect(screen.getByText('This is a comment')).toBeInTheDocument();
  });

  it('should allow deleting comments', async () => {
    render(<Comment commentInfo={mockCommentInfo} />);

    await act(async () => {
      fireEvent.click(screen.getByText('삭제'));
    });

    expect(axios.delete).toHaveBeenCalled();
  });
});
