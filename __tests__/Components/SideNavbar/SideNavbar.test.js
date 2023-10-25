import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SideNavbar } from '@src/components/SideNavbar/SideNavbar';

jest.mock('axios');
jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('<SideNavbar />', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/home');
  });

  it('userId가 존재할 때 프로필 데이터를 가져와야 한다.', async () => {
    useSession.mockReturnValue({ data: { mongoId: 'testUserId' } });
    axios.get.mockResolvedValueOnce({
      data: {
        status: 200,
        data: { _id: 'testUserId', nickname: 'testUserNickname' },
      },
    });

    render(<SideNavbar />);

    await waitFor(() => {
      expect(screen.getByText('testUserNickname')).toBeInTheDocument();
    });
  });

  it('API 에러가 있을 경우 에러 메시지가 렌더링 되어야 한다.', async () => {
    useSession.mockReturnValue({ data: { mongoId: 'testUserId' } });
    axios.get.mockRejectedValueOnce(new Error());

    render(<SideNavbar />);

    await waitFor(() => {
      expect(
        screen.getByText('프로필을 불러오는 중 문제가 발생했습니다.'),
      ).toBeInTheDocument();
    });
  });

  it('비로그인 시, 사이드바 메뉴에 로그인 버튼이 렌더링 되어야 한다.', async () => {
    useSession.mockReturnValue({ data: {} });

    render(<SideNavbar />);

    const menuButton = screen.getByTitle('menu');
    fireEvent.mouseEnter(menuButton);

    await waitFor(() => {
      expect(screen.getByText('로그인을 해주세요.')).toBeVisible();
    });
  });

  it('로그인 시, 사이드바 메뉴에 사용자의 닉네임이 렌더링 되어야 한다.', async () => {
    useSession.mockReturnValue({ data: { mongoId: 'testUserId' } });
    axios.get.mockResolvedValueOnce({
      data: {
        status: 200,
        data: { _id: 'testUserId', nickname: 'testUserNickname' },
      },
    });

    render(<SideNavbar />);

    const menuButton = screen.getByTitle('menu');
    fireEvent.mouseEnter(menuButton);

    await waitFor(() => {
      expect(screen.getByText('testUserNickname')).toBeVisible();
    });
  });

  it('사이드바에서 마우스를 떼면 사이드바가 닫혀야 한다.', async () => {
    useSession.mockReturnValue({ data: {} });

    render(<SideNavbar />);

    const sidebarMenu = screen.getByRole('navigation');
    fireEvent.mouseEnter(sidebarMenu);
    fireEvent.mouseLeave(sidebarMenu);

    await waitFor(() => {
      expect(screen.queryByText('testUserNickname')).not.toBeInTheDocument();
    });
  });

  it('프로필 페이지에서는 사이드바가 렌더링 되지 않아야 한다.', () => {
    useSession.mockReturnValue({ data: {} });
    usePathname.mockReturnValue('/profile/sample');

    render(<SideNavbar />);

    expect(screen.queryByRole('navigation')).toBeNull();
  });
});
