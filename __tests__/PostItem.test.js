import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { PostItem } from '@src/components/postlist/PostItem';

describe('<PostItem />', () => {
  it('이미지 URL이 있을 경우 이미지가 렌더링되어야 한다.', () => {
    const mockPost = {
      content: {
        blocks: [
          {
            type: 'image',
            data: { file: { url: 'http://이미지파일명.png' } },
          },
          { type: 'paragraph', data: { text: '텍스트' } },
        ],
      },
    };

    act(() => {
      render(<PostItem post={mockPost} />);
    });

    const image = screen.getByAltText('텍스트');

    expect(image).toBeInTheDocument();

    expect(image.src).toMatch(/이미지파일명.png|data:image\/gif;base64/);
  });

  it('텍스트 "No Image"는 이미지 URL이 제공되지 않았을 때 렌더링 되어야 한다.', () => {
    const mockPost = {
      content: {
        blocks: [{ type: 'paragraph', data: { text: '텍스트' } }],
      },
    };

    act(() => {
      render(<PostItem post={mockPost} />);
    });

    const noImageText = screen.getByText('No Image');

    expect(noImageText).toBeInTheDocument();
  });
});
