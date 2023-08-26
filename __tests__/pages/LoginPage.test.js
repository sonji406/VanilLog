import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LoginPage from '@src/app/auth/login/page';
import { LoginButton } from '@src/components/LoginButton';

jest.mock('@src/components/LoginButton', () => ({
  __esModule: true,
  LoginButton: jest.fn(() => (
    <button data-testid='mocked-login-button'>Mocked Login Button</button>
  )),
}));

describe('LoginPage', () => {
  it('로그인페이지가 렌더링되어야 한다.', () => {
    act(() => {
      render(<LoginPage />);
    });

    const logoText = screen.getByText('vanilLog');
    const loginButton = screen.getByTestId('mocked-login-button');
    const browseButton = screen.getByText('비회원으로 둘러보기');

    expect(logoText).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(browseButton).toBeInTheDocument();
  });

  it('로그인 페이지 렌더링 및 구글 로그인 버튼이 나타나야 한다.', () => {
    act(() => {
      render(<LoginPage />);
    });

    expect(LoginButton).toHaveBeenCalledWith({ loginCompany: 'google' }, {});

    jest.clearAllMocks();
  });
});
