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
      sessionId: '12345',
    };
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<BlogLink sessionId={mockData.sessionId} />);
  });

  it('should display the correct URL', () => {
    const { getByText } = render(<BlogLink sessionId={mockData.sessionId} />);
    expect(
      getByText(`https://vanillog/posts/${mockData.sessionId}`),
    ).toBeInTheDocument();
  });

  it('should handle the copy button click', async () => {
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
