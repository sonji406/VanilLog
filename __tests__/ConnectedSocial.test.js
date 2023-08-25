import React from 'react';
import { render, screen } from '@testing-library/react';
import ConnectedSocial from '@src/components/Profile/ConnectedSocial';

describe('<ConnectedSocial />', () => {
  it('연동된 소셜 정보가 올바르게 렌더링되어야 한다.', () => {
    const mockSocialLoginType = 'Google';

    render(<ConnectedSocial socialLoginType={mockSocialLoginType} />);

    expect(screen.getByText('연동된 소셜:')).toBeInTheDocument();

    expect(screen.getByText(mockSocialLoginType)).toBeInTheDocument();
  });
});
