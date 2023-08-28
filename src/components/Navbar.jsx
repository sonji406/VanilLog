'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';
import { usePathname } from 'next/navigation';
import { getLastPartOfUrl } from '@utils/getLastPartOfUrl';

function Navbar() {
  const { data, status } = useSession();
  const userId = data?.mongoId;
  const pathname = usePathname();
  const pattern = /^\/posts\/[0-9a-fA-F]{24}$/;
  const blogUserId = pattern.test(pathname) ? getLastPartOfUrl(pathname) : '';

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <nav className='fixed top-0 left-0 w-full h-[55px] z-50 bg-[#16354D]'>
      <div className='flex justify-between h-full items-center shadow-md shadow-gray-400 p-2 px-6 max-w-[1920px] mx-auto'>
        <Link href='/'>
          <span className="fon  t-['DiaGothicMedium'] text-[#E4E5EA] text-3xl font-bold">
            vanilLog
          </span>
        </Link>

        <div className='flex items-center'>
          {status === 'unauthenticated' ? (
            <Link
              href='/auth/login'
              className="font-['DiaGothicMedium'] ml-4 text-[#E4E5EA] text-xl"
            >
              Login
            </Link>
          ) : (
            <>
              <div className="ml-4 font-['DiaGothicMedium'] ml-4 text-[#E4E5EA] text-xl">
                {data?.name}
              </div>
              <Link
                href={`/posts/${userId}`}
                className="ml-4 font-['DiaGothicBold'] ml-4 text-[#EBC678] text-xl mb-1 hover:text-[#E4E5EA]"
              >
                MyLog
              </Link>
              <LogoutButton />
            </>
          )}
          <form
            action={blogUserId ? `/posts/${blogUserId}` : '/posts'}
            method='get'
            className='flex ml-4'
          >
            <div>
              <input
                className='px-3 py-1 bg-[#f9f7ed] rounded-full placeholder-white focus:border-none focus:outline-none'
                type='text'
                name='q'
                required
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.form.submit();
                  }
                }}
              />
            </div>
            <input type='hidden' name='page' value='1' />
            <input type='hidden' name='limit' value='10' />
          </form>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
