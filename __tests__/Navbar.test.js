import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@src/components/Navbar';

beforeEach(() => {
  useSession.mockReturnValue({ status: 'loading' });
  usePathname.mockImplementation(() => '/some/path');
});

describe('<Navbar />', () => {
  beforeEach(() => {
    usePathname.mockImplementation(() => '/some/path');
  });

  it('로딩 상태에서 "Loading..." 텍스트가 나타나야 한다.', () => {
    useSession.mockReturnValue({ status: 'loading' });

    render(<Navbar />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('비인증 상태에서 "로그인"과 "내 블로그" 텍스트가 나타나야 한다.', () => {
    useSession.mockReturnValue({ status: 'unauthenticated' });

    render(<Navbar />);

    expect(screen.getByText('로그인')).toBeInTheDocument();

    expect(screen.getByText('내 블로그')).toBeInTheDocument();
  });

  it('인증된 상태에서 사용자 이름과 로그아웃 버튼이 나타나야 한다.', () => {
    useSession.mockReturnValue({
      status: 'authenticated',
      data: { name: '우지현', mongoId: '123abc' },
    });

    render(<Navbar />);

    expect(screen.getByText('우지현님 반갑습니다.')).toBeInTheDocument();
  });

  it('검색 칸이 올바르게 렌더링되어야 한다.', () => {
    useSession.mockReturnValue({ status: 'unauthenticated' });

    render(<Navbar />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();

    expect(screen.getByText('통합검색')).toBeInTheDocument();
  });
});
