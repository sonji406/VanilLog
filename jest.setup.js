import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('axios');

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
    usePathname: jest.fn(),
  };
});

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { mongoId: 'someId' },
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@utils/useComment', () => ({
  useComments: jest.fn(),
}));

jest.mock('@utils/usePost', () => ({
  usePost: jest.fn(),
}));

jest.mock('@utils/useUserProfile');
jest.mock('@utils/useImageUpload');
jest.mock('@utils/useNicknameUpdate');

jest.mock('@editorjs/editorjs');

const mockPostData = {
  title: 'Test Title',
  author: {
    $oid: 'authorId',
  },
  content: {
    blocks: [
      {
        id: 'testPostContentId1',
        type: 'image',
        data: {
          file: {
            url: 'https://example.com/test.jpg',
            name: 'test_image.jpeg',
          },
          caption: 'caption',
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      {
        id: 'testPostContentId2',
        type: 'paragraph',
        data: {
          text: 'testParagraphContent',
        },
      },
    ],
  },
  comments: [
    {
      $oid: 'commentId1',
    },
    {
      $oid: 'commentId2',
    },
  ],
};

global.mockPostData = mockPostData;
