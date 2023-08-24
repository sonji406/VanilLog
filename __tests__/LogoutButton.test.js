import { render, screen, fireEvent } from '@testing-library/react';
import { LogoutButton } from '@src/components/LogoutButton';
import { signOut } from 'next-auth/react';

describe('<LogoutButton />', () => {
  it('로그아웃 버튼 컴포넌트 렌더링 테스트', () => {
    render(<LogoutButton />);
    const buttonElement = screen.getByText(/Logout/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('로그아웃 버튼 컴포넌트 클릭 시, signOut 함수가 올바른 파라미터로 호출 되는지 테스트', () => {
    signOut.mockClear();

    render(<LogoutButton />);
    const buttonElement = screen.getByText(/Logout/i);

    fireEvent.click(buttonElement);

    expect(signOut).toHaveBeenCalled();
  });
});
