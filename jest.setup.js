import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('axios');

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { mongoId: 'someId' },
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => {
  return {
    usePathname: jest.fn(),
  };
});

jest.mock('@utils/useComment', () => ({
  useComments: jest.fn(),
}));
