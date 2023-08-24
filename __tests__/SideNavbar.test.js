import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { SideNavbar } from '@src/components/SideNavbar/SideNavbar';

jest.mock('axios');
jest.mock('next-auth/react');

beforeEach(() => {
  useSession.mockReturnValue({});
});

describe('<SideNavbar />', () => {
  it('크래시 없이 렌더링 되어야 한다.', async () => {
    await act(async () => {
      render(<SideNavbar />);
    });
  });

  it('userId가 주어졌을 때, 프로필 데이터를 가져와야 한다.', async () => {
    useSession.mockReturnValueOnce({
      data: {
        mongoId: 'testId',
      },
    });

    axios.get.mockResolvedValueOnce({
      data: {
        status: 'success',
        data: [],
      },
    });

    await act(async () => {
      render(<SideNavbar />);
    });

    await waitFor(() => expect(axios.get).toHaveBeenCalled());
  });

  it('버거 메뉴를 호버하면 사이드바 메뉴가 나타나야 한다.', async () => {
    await act(async () => {
      render(<SideNavbar />);
    });

    const burgerMenu = screen.getByTitle('menu');

    act(() => {
      fireEvent.mouseEnter(burgerMenu);
    });

    const sidebar = screen.getByRole('navigation');

    expect(sidebar).toHaveClass('translate-x-0');
  });

  it('마우스가 사이드바에서 벗어났을 때 사이드바 메뉴가 사라져야 한다.', async () => {
    await act(async () => {
      render(<SideNavbar />);
    });

    const burgerMenu = screen.getByTitle('menu');

    act(() => {
      fireEvent.mouseEnter(burgerMenu);
    });

    const sidebar = screen.getByRole('navigation');
    act(() => {
      fireEvent.mouseLeave(sidebar);
    });

    expect(sidebar).toHaveClass('-translate-x-full');
  });
});
