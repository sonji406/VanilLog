import React from 'react';
import { render, screen, act } from '@testing-library/react';
import PostContent from '@src/components/PostDetail/PostContent';

jest.mock('next/legacy/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img alt={props.alt || 'default alt text'} {...props} />;
  },
}));

describe('<PostContent />', () => {
  const mockContent = {
    blocks: [
      {
        type: 'image',
        id: 'image1',
        data: {
          file: {
            url: 'image_url',
            name: 'image_name',
          },
        },
      },
      {
        type: 'paragraph',
        id: 'paragraph1',
        data: {
          text: '본문 텍스트',
        },
      },
    ],
  };

  it('제목이 올바르게 렌더링되어야 한다.', () => {
    act(() => {
      render(<PostContent title='Test Title' content={mockContent} />);
    });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('본문 블록이 올바르게 렌더링되어야 한다.', () => {
    act(() => {
      render(<PostContent title='Test Title' content={mockContent} />);
    });

    const image = screen.getByAltText('image_name');
    expect(image).toHaveAttribute('src', 'image_url');

    const paragraph = screen.getByText('본문 텍스트');
    expect(paragraph).toBeInTheDocument();
  });
});
