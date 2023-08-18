'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import { PostItem } from './PostItem';

function PostList({ loggedInUserId, blogUserId }) {
  const params = useSearchParams();

  const page = params.get('page') || 1;
  const limit = params.get('limit') || 10;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/posts', {
          params: { blogUserId, page, limit },
        });

        if (response.data.status === 'success') {
          setPosts(response.data.data);
          setTotalPosts(response.data.totalPosts);
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
  }, [blogUserId, page, limit]);

  const totalPage = Math.ceil(totalPosts / limit);
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='w-screen px-5'>
      <div className='my-4'>
        <Link href={`/post/${loggedInUserId}/editor`}>
          <button className='text-xl text-white font-bold bg-[#0044ff] rounded-lg hover:bg-[#0000ff] py-2 px-8'>
            포스트 작성하기
          </button>
        </Link>
      </div>
      {error && <div>{error}</div>}
      <div className='flex flex-wrap gap-x-8 gap-y-4 justify-center'>
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
                <PostItem post={post} />
              </Link>
            );
          })}
      </div>

      <div className='flex justify-center my-5'>
        {pageNumbers.map((number) => (
          <Link
            key={number}
            href={`/posts/${blogUserId}/?page=${number}&limit=${limit}`}
            passHref
          >
            <button
              type='button'
              className='text-xl text-white font-bold bg-[#0044ff] rounded-lg hover:bg-[#0000ff] py-2 px-3 mx-1'
            >
              {number}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { PostList };
