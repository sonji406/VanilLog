import { render, screen, act } from '@testing-library/react';
import { ProfileBox } from '@src/components/SideNavbar/ProfileBox';

describe('<ProfileBox />', () => {
  it('유저 아이디와 프로필 이미지가 주어졌을 때, 닉네임과 프로필 이미지 렌더링 테스트', async () => {
    const profile = {
      _id: '123abc',
      profileImage: '/some/image.jpg',
      nickname: '우지현',
    };

    await act(async () => {
      render(<ProfileBox profile={profile} />);
    });

    const image = screen.getByAltText('프로필 사진');

    expect(image).toBeInTheDocument();
    expect(decodeURIComponent(image.src)).toMatch(/some\/image\.jpg/);
    expect(screen.getByText('우지현')).toBeInTheDocument();
  });

  it('유저 아이디가 주어지지 않을 때, 로그인 버튼이 올바르게 렌더링되어야 한다.', async () => {
    const profile = {
      _id: null,
      profileImage: '이미지',
      nickname: '햄스터',
    };

    await act(async () => {
      render(<ProfileBox profile={profile} />);
    });

    expect(screen.getByText(/로그인을 해주세요\./i)).toBeInTheDocument();
  });

  it('프로필 이미지가 주어지지 않을 때, 에러 메세지가 올바르게 렌더링되어야 한다.', async () => {
    const profile = {
      _id: '123abc',
      profileImage: null,
      nickname: '우지현',
    };

    await act(async () => {
      render(<ProfileBox profile={profile} error='Error loading image' />);
    });

    expect(screen.getByText('Error loading image')).toBeInTheDocument();
  });
});
