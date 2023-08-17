'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

function PostList({ userId, page, limit }) {
  const queryParams = userId
    ? { userId: userId, page: page, limit: limit }
    : { page: page, limit: limit };

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/posts', {
          params: queryParams,
        });

        if (response.data.status === 'success') {
          setPosts(response.data.data);
          setTotalPosts(response.data.data.length);
        }

        if (response.data.status === '401') {
          setError(response.data.message);
        }
        if (response.data.status === '400') {
          setError(response.data.message);
        }
      } catch (e) {
        setError('포스트를 불러오는 중 문제가 발생했습니다.');
      }
    };

    if (page && limit) {
      fetchData();
    }
  }, [userId, page, limit]);

  const totalPosts = posts.length;
  const totalPage = Math.ceil(totalPosts / limit);
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div>
        <Link href='/post:userid'>
          <button>포스트 작성하기</button>
        </Link>
      </div>
      {error && <div>{error}</div>}
      <div className='flex flex-row gap-x-8 gap-y-4 place-items-left text-center'>
        {posts.length > 0 &&
          posts.map((post) => {
            const imageContent = post.content.find(
              (content) => content.type === 'image',
            );
            const textContent = post.content.find(
              (content) => content.type === 'text',
            );
            const textValue = textContent ? textContent.value : '';

            return (
              <Link key={post._id} href={`/posts/${post.author}/${post._id}`}>
                <div className='w-56 h-56 flex flex-col items-center justify-center bg-slate-300'>
                  {imageContent ? (
                    <div className='h-4/5'>
                      <Image
                        src={imageContent.value}
                        alt={textValue}
                        width={224}
                        height={224}
                      />
                    </div>
                  ) : (
                    <div className='h-4/5 flex items-center justify-center'>
                      <span className='text-lg font-bold'>No Image</span>
                    </div>
                  )}
                  <div className='flex items-center justify-center h-1/5 w-full bg-slate-400'>
                    <span className='inline-block truncate w-48'>
                      {textValue}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <div>
        {pageNumbers.map((number) => (
          <Link key={number} href={`/?page=${number}&limit=${limit}`}>
            <a>{number}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { PostList };
