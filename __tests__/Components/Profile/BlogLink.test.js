import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import BlogLink from '@src/components/Profile/BlogLink';

global.navigator.clipboard = {
  writeText: jest.fn(() => Promise.resolve()),
};

describe('<BlogLink />', () => {
  let mockData;

  beforeEach(() => {
    mockData = {
      sessionId: 'testUserId',
    };
    jest.clearAllMocks();
  });

  it('블로그 링크 컴포넌트가 올바르게 렌더링 되어야 합니다.', () => {
    render(<BlogLink sessionId={mockData.sessionId} />);
  });

  it('올바른 URL을 표시해야 합니다.', () => {
    const { getByText } = render(<BlogLink sessionId={mockData.sessionId} />);
    expect(
      getByText(`https://vanillog/posts/${mockData.sessionId}`),
    ).toBeInTheDocument();
  });

  it('복사하기 버튼 클릭 시 내 블로그 링크가 복사되어야 합니다.', async () => {
    const { getByText, queryByText } = render(
      <BlogLink sessionId={mockData.sessionId} />,
    );
    const copyButton = getByText('복사하기');

    expect(queryByText('내 블로그 링크 복사 완료!')).toBeNull();

    await act(async () => {
      fireEvent.click(copyButton);
    });

    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `https://vanillog/posts/${mockData.sessionId}`,
      ),
    );

    await waitFor(() =>
      expect(getByText('내 블로그 링크 복사 완료!')).toBeInTheDocument(),
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    expect(queryByText('내 블로그 링크 복사 완료!')).toBeNull();
  });
});
