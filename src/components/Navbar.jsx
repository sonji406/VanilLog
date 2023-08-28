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
    <nav className='fixed top-0 left-0 w-full h-[48px] z-50 bg-[#249D8C]'>
      <div className='flex justify-between items-center shadow-md shadow-gray-400 p-2 px-8'>
        <Link href='/'>
          <span className="font-['DiaGothic'] text-[#F4C84B] text-2xl font-bold">
            vanilLog
          </span>
        </Link>

        <div className='flex items-center'>
          {status === 'unauthenticated' ? (
            <Link
              href='/auth/login'
              className="font-['DiaGothic'] ml-4 text-[#9a8e5e] text-xl"
            >
              Login
            </Link>
          ) : (
            <>
              <div className='ml-4'>{data?.name}님 반갑습니다.</div>
              <LogoutButton />
              <Link href={`/posts/${userId}`} className='ml-4'>
                내 블로그
              </Link>
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
