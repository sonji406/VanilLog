import { render, screen } from '@testing-library/react';
import { ProfileBox } from '@src/components/SideNavbar/ProfileBox';

describe('ProfileBox Component', () => {
  it('displays an error message when an error is present', () => {
    render(<ProfileBox profile={{}} error='Sample error message' />);

    expect(screen.getByText('Sample error message')).toBeInTheDocument();
  });

  it('displays the profile image when provided', () => {
    const mockImage = '/sample-image.jpg';
    render(<ProfileBox profile={{ profileImage: mockImage }} error={null} />);

    expect(screen.getByAltText('프로필 사진')).toBeInTheDocument();
  });

  it('displays login button when no profile image and no error', () => {
    render(<ProfileBox profile={{}} error={null} />);

    expect(screen.getByText('로그인을 해주세요.')).toBeInTheDocument();
  });

  it('displays nickname and profile info/edit button when userId is provided', () => {
    const mockUserId = 'sampleUserId';
    const mockNickname = 'sampleNickname';

    render(
      <ProfileBox
        profile={{ _id: mockUserId, nickname: mockNickname }}
        error={null}
      />,
    );

    expect(screen.getByText(mockNickname)).toBeInTheDocument();
    expect(screen.getByText('프로필 정보/수정')).toBeInTheDocument();
  });
});
