import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from '@src/components/PostDetail/DeleteModal';

describe('<DeleteModal />', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onConfirm.mockClear();
  });

  it('isOpen이 false일 때 렌더링 되지 않아야 한다.', () => {
    render(
      <DeleteModal isOpen={false} onClose={onClose} onConfirm={onConfirm} />,
    );

    expect(
      screen.queryByText('이 포스트를 삭제하시겠습니까?'),
    ).not.toBeInTheDocument();
  });

  it('isOpen이 true일 때 올바르게 렌더링 되어야 한다.', () => {
    render(
      <DeleteModal isOpen={true} onClose={onClose} onConfirm={onConfirm} />,
    );

    expect(
      screen.getByText('이 포스트를 삭제하시겠습니까?'),
    ).toBeInTheDocument();

    expect(screen.getByText('확인')).toBeInTheDocument();

    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('확인 버튼을 누르면 onClose와 onConfirm 함수가 호출되어야 한다.', () => {
    render(
      <DeleteModal isOpen={true} onClose={onClose} onConfirm={onConfirm} />,
    );

    fireEvent.click(screen.getByText('확인'));

    expect(onClose).toHaveBeenCalledTimes(1);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('취소 버튼을 누르면 onClose만 호출되어야 한다.', () => {
    render(
      <DeleteModal isOpen={true} onClose={onClose} onConfirm={onConfirm} />,
    );

    fireEvent.click(screen.getByText('취소'));

    expect(onClose).toHaveBeenCalledTimes(1);

    expect(onConfirm).not.toHaveBeenCalled();
  });
});
