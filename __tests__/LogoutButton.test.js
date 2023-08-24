import { render, screen, fireEvent } from '@testing-library/react';
import { LogoutButton } from '@src/components/LogoutButton';
import { signOut } from 'next-auth/react';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<LogoutButton />', () => {
  it('로그아웃 버튼 컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(<LogoutButton />);
    const buttonElement = screen.getByText(/Logout/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it('로그아웃 버튼 컴포넌트 클릭 시, signOut 함수가 올바른 파라미터로 호출 되어야 한다.', () => {
    render(<LogoutButton />);
    const buttonElement = screen.getByText(/Logout/i);

    fireEvent.click(buttonElement);

    expect(signOut).toHaveBeenCalled();
  });
});
