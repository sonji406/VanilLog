import React from 'react';
import { render } from '@testing-library/react';
import ConnectedSocial from '@src/components/Profile/ConnectedSocial';

const mockUserData = {
  _id: '60af5a48bbed8635907d8f78',
  nickname: 'testUser',
  email: 'test@test.com',
  socialLoginType: 'google',
  profileImage: 'https://example.com/image.jpg',
  blogPosts: ['60af5a48bbed8635907d8f79'],
  comments: ['60af5a48bbed8635907d8f80'],
};

describe('<ConnectedSocial />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ConnectedSocial socialLoginType={mockUserData.socialLoginType} />);
  });

  it('should display the correct socialLoginType', () => {
    const { getByText } = render(
      <ConnectedSocial socialLoginType={mockUserData.socialLoginType} />,
    );

    expect(getByText(mockUserData.socialLoginType)).toBeInTheDocument();
  });
});
