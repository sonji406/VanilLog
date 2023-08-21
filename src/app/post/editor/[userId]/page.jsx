'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const Editor = dynamic(() => import('@src/components/Editor'), {
  ssr: false,
});

function PostEditPage({ params }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState({});
  const [error, setError] = useState(null);

  const userId = Array.isArray(params) ? params[0] : params.userId;
  const postId = params[1] || null;

  const isModify = Boolean(postId);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const setSaveError = (error) => {
    setError(error);
  };

  useEffect(() => {
    if (isModify) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/v1/posts/${postId}`);

          if (response.data.status === 'success') {
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
          }

          if (response.data.status !== 'success') {
            setError(response.data.message);
          }
        } catch (e) {
          setError('포스트를 불러오는 중 문제가 발생하였습니다.');
        }
      };

      fetchData();
    }
  }, [isModify, postId]);

  return (
    <>
      <div className='flex justify-center'>
        <div className='w-[800px] text-center mt-6'>
          <div className='flex items-center justify-center border-2 border-black'>
            <input
              type='text'
              placeholder='제목을 입력하세요'
              className='w-4/5 p-2 text-lg'
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <Editor
            author={userId}
            postId={postId}
            title={title}
            content={content}
            isModify={isModify}
            error={error}
            setError={setSaveError}
          />
        </div>
      </div>
    </>
  );
}

export default PostEditPage;
