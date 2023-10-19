import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SideNavbar } from '@src/components/SideNavbar/SideNavbar';

jest.mock('axios');
jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('SideNavbar Component', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/home');
  });

  it('fetches profile data when userId is present', async () => {
    useSession.mockReturnValue({ data: { mongoId: 'sampleId' } });
    axios.get.mockResolvedValueOnce({
      data: { status: 200, data: { _id: 'sampleId', nickname: 'testUser' } },
    });

    render(<SideNavbar />);

    await waitFor(() => {
      expect(screen.getByText('testUser')).toBeInTheDocument();
    });
  });

  it('sets error message when there is an API error', async () => {
    useSession.mockReturnValue({ data: { mongoId: 'sampleId' } });
    axios.get.mockRejectedValueOnce(new Error());

    render(<SideNavbar />);

    await waitFor(() => {
      expect(
        screen.getByText('프로필을 불러오는 중 문제가 발생했습니다.'),
      ).toBeInTheDocument();
    });
  });

  it('opens the sidebar menu on mouse enter', async () => {
    useSession.mockReturnValue({ data: {} });

    render(<SideNavbar />);

    const menuButton = screen.getByTitle('menu');
    fireEvent.mouseEnter(menuButton);

    await waitFor(() => {
      expect(screen.getByText('로그인을 해주세요.')).toBeVisible();
    });
  });

  it('opens the sidebar menu on mouse enter for logged-in user', async () => {
    useSession.mockReturnValue({ data: { mongoId: 'sampleId' } });
    axios.get.mockResolvedValueOnce({
      data: { status: 200, data: { _id: 'sampleId', nickname: 'testUser' } },
    });

    render(<SideNavbar />);

    const menuButton = screen.getByTitle('menu');
    fireEvent.mouseEnter(menuButton);

    await waitFor(() => {
      expect(screen.getByText('testUser')).toBeVisible();
    });
  });

  it('closes the sidebar menu on mouse leave', async () => {
    useSession.mockReturnValue({ data: {} });

    render(<SideNavbar />);

    const sidebarMenu = screen.getByRole('navigation');
    fireEvent.mouseEnter(sidebarMenu);
    fireEvent.mouseLeave(sidebarMenu);

    await waitFor(() => {
      expect(screen.queryByText('testUser')).not.toBeInTheDocument();
    });
  });

  it('does not render the SideNavbar when pathname starts with /profile', () => {
    useSession.mockReturnValue({ data: {} });
    usePathname.mockReturnValue('/profile/sample');

    render(<SideNavbar />);

    expect(screen.queryByRole('navigation')).toBeNull();
  });
});
