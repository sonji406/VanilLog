import React from 'react';
import { render } from '@testing-library/react';
import ConnectedSocial from '@src/components/Profile/ConnectedSocial';

const mockUserData = {
  _id: 'testUserId',
  nickname: 'testUserNickname',
  email: 'test@test.com',
  socialLoginType: 'google',
  profileImage: 'https://example.com/image.jpg',
  blogPosts: ['blogId'],
  comments: ['commentId'],
};

describe('<ConnectedSocial />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('연결된 소셜 컴포넌트가 올바르게 렌더링 되어야 합니다.', () => {
    render(<ConnectedSocial socialLoginType={mockUserData.socialLoginType} />);
  });

  it('올바른 socialLoginType이 표시되어야 합니다.', () => {
    const { getByText } = render(
      <ConnectedSocial socialLoginType={mockUserData.socialLoginType} />,
    );

    expect(getByText(mockUserData.socialLoginType)).toBeInTheDocument();
  });
});
