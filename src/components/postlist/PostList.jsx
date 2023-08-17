'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import { PostItem } from './PostItem';
import { Pagination } from './Pagination';

function PostList({ userId }) {
  const parms = useSearchParams();

  const page = parms.get('page') ? parms.get('page') : 1;
  const limit = parms.get('limit') ? parms.get('limit') : 10;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/posts', {
          params: { userId, page, limit },
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
  }, [userId, page, limit]);

  console.log(posts);
  console.log('totalPosts', posts.length);

  const totalPage = Math.ceil(totalPosts / limit);
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div>
        <Link href='/post'>
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
                <PostItem post={post} />
              </Link>
            );
          })}
      </div>
      <div>
        {pageNumbers.map((number) => (
          <Link
            key={number}
            href={`/posts/${userId}/?page=${number}&limit=${limit}`}
            passHref
          >
            <Pagination pageNumber={number}></Pagination>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { PostList };
