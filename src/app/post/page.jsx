'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@src/components/Editor'), {
  ssr: false,
});

function PostEditPage() {
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className='w-[800px] text-center font-sans border-2 border-gray-300'>
      <div className='w-[800px] flex items-center justify-center  border-b-2 border-gray-300'>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          className='w-4/5 p-2 text-lg '
          value={title}
          onChange={handleChange}
        />
      </div>

      <Editor title={title} />
    </div>
  );
}

export default PostEditPage;
