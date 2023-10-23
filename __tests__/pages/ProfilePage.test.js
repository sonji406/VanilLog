import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ProfilePage from '@src/app/profile/[userId]/page';
import { useSession } from 'next-auth/react';
import { useUserProfile } from '@utils/useUserProfile';
import { useImageUpload } from '@utils/useImageUpload';
import { useNicknameUpdate } from '@utils/useNicknameUpdate';

describe('<ProfilePage />', () => {
  it('프로필 데이터가 올바르게 렌더링 되어야 한다.', async () => {
    useSession.mockReturnValue({
      data: { session: { mongoId: 'testUserId' } },
    });

    useUserProfile.mockReturnValue({
      userProfile: { nickname: 'testUserNickname', socialLoginType: 'google' },
      loading: false,
      error: null,
    });

    useImageUpload.mockReturnValue({
      uploadedImage: null,
      handleImageUpload: jest.fn(),
    });

    useNicknameUpdate.mockReturnValue({
      nickname: 'testUserNickname',
      setNickname: jest.fn(),
      message: '',
      updateNickname: jest.fn(),
    });

    await act(async () => {
      render(<ProfilePage params={{ userId: 'testUserId' }} />);
    });

    expect(screen.getByText('testUserNickname')).toBeInTheDocument();
    expect(screen.getByText('google')).toBeInTheDocument();
  });

  it('로딩 상태가 올바르게 렌더링 되어야 한다.', async () => {
    useUserProfile.mockReturnValue({
      userProfile: null,
      loading: true,
      error: null,
    });

    await act(async () => {
      render(<ProfilePage params={{ userId: 'testUserId' }} />);
    });

    expect(screen.getByText('프로필을 불러오는 중입니다.')).toBeInTheDocument();
  });

  it('에러 상태를 올바르게 처리해야 한다.', async () => {
    useUserProfile.mockReturnValue({
      userProfile: null,
      loading: false,
      error: '에러 발생',
    });

    await act(async () => {
      render(<ProfilePage params={{ userId: 'testUserId' }} />);
    });

    expect(screen.getByText('Error: 에러 발생')).toBeInTheDocument();
  });
});
