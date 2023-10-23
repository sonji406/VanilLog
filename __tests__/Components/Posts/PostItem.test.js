import { render, screen } from '@testing-library/react';
import { PostItem } from '@src/components/Posts/PostItem';

jest.mock('next/legacy/image', () => {
  const MockedImage = ({ src, alt }) => <img src={src} alt={alt} />;
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

describe('<PostItem />', () => {
  it('이미지가 있는 포스트의 경우 이미지가 썸네일로 렌더링 되어야 합니다.', () => {
    const mockPostWithImage = {
      title: 'Test Title',
      content: {
        blocks: [
          {
            type: 'image',
            data: { file: { url: 'https://example.com/test.jpg' } },
          },
          { type: 'paragraph', data: { text: 'Test Post Content' } },
        ],
      },
    };

    render(<PostItem post={mockPostWithImage} />);

    const imageElement = screen.getByRole('img', {
      name: /Test Post Content/i,
    });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://example.com/test.jpg');
  });

  it('이미지가 없는 포스트의 경우 랜덤 색상이 썸네일로 렌더링 되어야 합니다.', () => {
    const mockPost = {
      title: 'Test Title',
      content: {
        blocks: [{ type: 'paragraph', data: { text: 'Test Post Content' } }],
      },
    };

    render(<PostItem post={mockPost} />);

    const coloredDiv =
      screen.getByText('Test Post Content').parentElement.previousSibling;
    expect(coloredDiv).toHaveClass('w-full', 'h-[170px]');
  });

  it('제목과 콘텐츠가 올바르게 렌더링 되어야 합니다.', () => {
    const mockPost = {
      title: 'Test Title',
      content: {
        blocks: [{ type: 'paragraph', data: { text: 'Test Post Content' } }],
      },
    };

    render(<PostItem post={mockPost} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Post Content')).toBeInTheDocument();
  });
});
