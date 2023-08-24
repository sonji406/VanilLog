import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('next-auth/react', () => {
  return {
    useSession: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
});

jest.mock('next/navigation', () => {
  return {
    usePathname: jest.fn(),
  };
});
