'use client';

import { useState } from 'react';
import Link from 'next/link';

function BlogLink({ sessionId }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const url = `https://vanillog/posts/${sessionId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div
      className='shadow rounded-lg p-5 bg-white space-y-4 mb-5'
      style={{ margin: '20px' }}
    >
      <h2 className='flex justify-center font-semibold text-lg text-gray-700 border-b border-gray-400 pb-3'>
        내 블로그 링크
      </h2>
      <div
        className='flex justify-center text-[#16354D] text-lg'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={`/posts/${sessionId}`}>
          <span className={`${hovered ? 'text-[#16354D]' : ''}`}>
            {hovered ? '내 블로그로 이동하기' : url}
          </span>
        </Link>
      </div>
      <div className='flex justify-end'>
        <button
          onClick={handleCopy}
          className='bg-[#16354D] hover:bg-black text-white px-3 py-1 text-sm rounded'
        >
          복사하기
        </button>
      </div>
      {copied && (
        <div className='flex justify-center text-green-500 text-sm mt-2'>
          내 블로그 링크 복사 완료!
        </div>
      )}
    </div>
  );
}

export default BlogLink;
