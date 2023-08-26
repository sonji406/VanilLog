import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import CommentsSection from '@src/components/Comment/CommentsSection';

describe('<CommentsSection />', () => {
  it('댓글이 없을 경우 알맞은 문구가 출력되어야 한다.', () => {
    act(() => {
      render(
        <CommentsSection
          comments={[]}
          commentText=''
          onCommentChange={() => {}}
          onCommentSubmit={() => {}}
        />,
      );
    });

    expect(
      screen.getByText('아직 작성된 댓글이 없습니다.'),
    ).toBeInTheDocument();
  });

  it('댓글이 있을 경우 댓글 목록이 렌더링된다', () => {
    const mockComments = [
      { _id: '1', comment: '첫 번째 댓글' },
      { _id: '2', comment: '두 번째 댓글' },
    ];

    act(() => {
      render(
        <CommentsSection
          comments={mockComments}
          commentText=''
          onCommentChange={() => {}}
          onCommentSubmit={() => {}}
        />,
      );
    });

    expect(screen.getByText('첫 번째 댓글')).toBeInTheDocument();

    expect(screen.getByText('두 번째 댓글')).toBeInTheDocument();
  });

  it('댓글 작성 영역이 존재해야 한다.', () => {
    act(() => {
      render(
        <CommentsSection
          comments={[]}
          commentText=''
          onCommentChange={() => {}}
          onCommentSubmit={() => {}}
        />,
      );
    });

    expect(
      screen.getByPlaceholderText('댓글을 작성하세요.'),
    ).toBeInTheDocument();
  });

  it("'댓글 작성' 버튼을 클릭하면 onCommentSubmit이 호출되어야 한다.", () => {
    const mockOnCommentSubmit = jest.fn();

    act(() => {
      render(
        <CommentsSection
          comments={[]}
          commentText=''
          onCommentChange={() => {}}
          onCommentSubmit={mockOnCommentSubmit}
        />,
      );
    });

    act(() => {
      fireEvent.click(screen.getByText('댓글 작성'));
    });

    expect(mockOnCommentSubmit).toHaveBeenCalledTimes(1);
  });
});
