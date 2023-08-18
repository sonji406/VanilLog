'use client';

import { signOut } from 'next-auth/react';

function LogoutButton() {
  const handleSignOut = () => signOut();

  return (
    <>
      <button onClick={handleSignOut}>Logout</button>
    </>
  );
}

export { LogoutButton };
