//nextjs Head https://jasonkang14.github.io/nextjs/head-from-next-head-and-next-document
//head.js special file https://jha-memo.tistory.com/97

import Link from 'next/link';

function Navbar() {
  const userId = '';
  return (
    <>
      <Link href='/'>
        <span className='text-5xl text-logo font-bold'>vanilLog</span>
      </Link>
      <Link href='/auth/login'>로그인</Link>
      <Link href={`/posts/${userId}`}>내 블로그</Link>
    </>
  );
}

export { Navbar };
