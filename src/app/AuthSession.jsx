'use client';

import { Navbar } from '@src/components/Navbar';
import { SessionProvider } from 'next-auth/react';

function AuthSession({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}

export { AuthSession };
