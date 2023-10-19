import { render, screen, waitFor, act } from '@testing-library/react';
import { Navbar } from '@src/components/Navbar';
import { useSession } from 'next-auth/react';
import axios from 'axios';

jest.mock('next-auth/react');
jest.mock('axios');

describe('Navbar Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Login link when user is unauthenticated', () => {
    useSession.mockReturnValue({ status: 'unauthenticated' });

    render(<Navbar />);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders user info and profile image when user is authenticated', async () => {
    useSession.mockReturnValue({
      status: 'authenticated',
      data: { mongoId: 'sampleId' },
    });

    const mockProfileResponse = {
      data: {
        status: 200,
        data: {
          profileImage: '/sample-image.jpg',
          nickname: 'testNickname',
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockProfileResponse);

    render(<Navbar />);

    await waitFor(() => {
      expect(screen.getByAltText('프로필 사진')).toBeInTheDocument();
      expect(screen.getByText('testNickname')).toBeInTheDocument();
    });
  });

  it('sets error state if there is an error while fetching profile', async () => {
    useSession.mockReturnValue({
      status: 'authenticated',
      data: { mongoId: 'sampleId' },
    });

    axios.get.mockRejectedValueOnce(new Error('API error'));

    render(<Navbar />);

    await waitFor(() => {
      expect(
        screen.getByText('프로필을 불러오는 중 문제가 발생했습니다.'),
      ).toBeInTheDocument();
    });
  });
});
