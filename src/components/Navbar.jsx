'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className='fixed top-0 left-0 w-full z-50 bg-[#e0e0e0]'>
      <div className='flex justify-between items-center shadow-md shadow-gray-400'>
        <Link href='/'>
          <Image
            src='/image/blogLogo.png'
            alt='blogLogo'
            width={40}
            height={40}
          ></Image>
        </Link>
        {status === 'unauthenticated' ? (
          <>
            <Link href='/auth/login' className='ml-4'>
              로그인
            </Link>
            <p className='ml-4'>내 블로그</p>
          </>
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
          <input
            className='py-1 bg-[#e0e0e0]'
            type='text'
            name='q'
            placeholder='Search...'
            required
          />
          <input type='hidden' name='page' value='1' />
          <input type='hidden' name='limit' value='10' />
          <button
            className='text-lg text-white font-semibold bg-blue-500 hover:bg-[#0044ff] py-1 px-3 rounded-lg shadow-md shadow-gray-500'
            type='submit'
          >
            통합검색
          </button>
        </form>
      </div>
    </div>
  );
}

export { Navbar };
