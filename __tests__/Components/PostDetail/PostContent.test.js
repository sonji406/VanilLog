import React from 'react';
import { render, screen, act } from '@testing-library/react';
import PostContent from '@src/components/PostDetail/PostContent';

describe('<PostContent />', () => {
  const mockContent = {
    blocks: [
      {
        type: 'image',
        id: 'testImageId',
        data: {
          file: {
            url: 'testImageUrl',
            name: 'testImageName',
          },
        },
      },
      {
        type: 'paragraph',
        id: 'testParagraph1',
        data: {
          text: 'testParagraphDataText',
        },
      },
    ],
  };

  it('제목이 올바르게 렌더링 되어야 한다.', () => {
    act(() => {
      render(<PostContent title='Test Title' content={mockContent} />);
    });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('본문 블록이 올바르게 렌더링 되어야 한다.', () => {
    act(() => {
      render(<PostContent title='Test Title' content={mockContent} />);
    });

    const image = screen.getByAltText('testImageName');
    const paragraph = screen.getByText('testParagraphDataText');

    expect(image).toHaveAttribute('src', 'testImageUrl');
    expect(paragraph).toBeInTheDocument();
  });
});
