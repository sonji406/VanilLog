'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

function Navbar() {
  const { data, status } = useSession();
  const userId = data?.mongoId;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex justify-between items-center'>
      <Link href='/'>
        <span className='text-5xl text-logo font-bold'>vanilLog</span>
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
      <form action='/search' method='get' className='flex ml-4'>
        <input className='py-1' type='text' name='q' placeholder='Search...' />
        <input type='hidden' name='page' value='1' />
        <input type='hidden' name='limit' value='10' />
        <button
          className='text-xl text-white font-bold bg-[#0044ff] hover:bg-[#0000ff] py-1 px-4 m-0'
          type='submit'
        >
          통합검색
        </button>
      </form>
    </div>
  );
}

export { Navbar };
