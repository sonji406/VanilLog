import { render, screen } from '@testing-library/react';
import { ProfileBox } from '@src/components/SideNavbar/ProfileBox';

describe('<ProfileBox />', () => {
  it('에러가 발생하였을 때 에러 메시지가 렌더링 되어야 한다.', () => {
    render(<ProfileBox profile={{}} error='test error message' />);

    expect(screen.getByText('test error message')).toBeInTheDocument();
  });

  it('프로필 이미지가 없고 에러도 없을 때에는 로그인 버튼이 렌더링 되어야 한다.', () => {
    render(<ProfileBox profile={{}} error={null} />);

    expect(screen.getByText('로그인을 해주세요.')).toBeInTheDocument();
  });

  it('사용자 ID가 제공되면 사용자의 프로필 사진, 닉네임, 프로필 정보/수정 버튼이 렌더링 되어야 한다.', () => {
    const mockUserId = 'testUserId';
    const mockNickname = 'testNickname';
    const mockImage = '/test-image.jpg';

    render(
      <ProfileBox
        profile={{
          _id: mockUserId,
          profileImage: mockImage,
          nickname: mockNickname,
        }}
        error={null}
      />,
    );

    expect(screen.getByAltText('프로필 사진')).toBeInTheDocument();
    expect(screen.getByText(mockNickname)).toBeInTheDocument();
    expect(screen.getByText('프로필 정보/수정')).toBeInTheDocument();
  });
});
