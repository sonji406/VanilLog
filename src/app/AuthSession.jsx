'use client';
import { SessionProvider } from 'next-auth/react';

function AuthSession({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export { AuthSession };
