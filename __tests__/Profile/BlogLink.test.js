import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogLink from '@src/components/Profile/BlogLink';

describe('<BlogLink />', () => {
  it('렌더링과 세션 ID 표시를 검증해야 한다.', () => {
    const mockSessionId = '123abc';

    render(<BlogLink sessionId={mockSessionId} />);

    expect(screen.getByText('내 블로그 링크:')).toBeInTheDocument();

    expect(
      screen.getByText(`https://vanillog/posts/${mockSessionId}`),
    ).toBeInTheDocument();
  });
});
