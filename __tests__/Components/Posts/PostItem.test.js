import { render, screen } from '@testing-library/react';
import { PostItem } from '@src/components/Posts/PostItem';

jest.mock('next/legacy/image', () => {
  const MockedImage = ({ src, alt }) => <img src={src} alt={alt} />;
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

describe('PostItem Component', () => {
  it('renders image content when provided', () => {
    const mockPostWithImage = {
      title: 'Test Post',
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

  it('renders random color when post has no image content', () => {
    const mockPost = {
      title: 'Test Post',
      content: {
        blocks: [{ type: 'paragraph', data: { text: 'Test Post Content' } }],
      },
    };

    render(<PostItem post={mockPost} />);

    const coloredDiv =
      screen.getByText('Test Post Content').parentElement.previousSibling;
    expect(coloredDiv).toHaveClass('w-full', 'h-[170px]');
  });

  it('renders title and content correctly', () => {
    const mockPost = {
      title: 'Test Post',
      content: {
        blocks: [{ type: 'paragraph', data: { text: 'Test Post Content' } }],
      },
    };

    render(<PostItem post={mockPost} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Post Content')).toBeInTheDocument();
  });
});
