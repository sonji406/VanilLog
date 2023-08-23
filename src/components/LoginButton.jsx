'use client';

import { signIn } from 'next-auth/react';

function LoginButton({ loginCompany }) {
  const callbackUrl = process.env.DOMAIN;
  const handleSignIn = () => signIn(loginCompany, { callbackUrl });

  return (
    <div>
      <button
        onClick={handleSignIn}
        className='text-xl text-white font-bold bg-[#0044ff] rounded-lg hover:bg-[#0000ff] py-2 px-8'
      >
        google login
      </button>
    </div>
  );
}

export { LoginButton };
