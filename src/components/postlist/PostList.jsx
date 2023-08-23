'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PostItem } from './PostItem';
import { postListHref } from '@utils/postListHref';

function PostList({ blogUserId }) {
  const params = useSearchParams();

  const searchValue = params.get('q');
  const page = params.get('page') || 1;
  const limit = params.get('limit') || 10;

  const { data } = useSession();
  const loggedInUserId = data?.mongoId;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState(null);

  const searchApi = blogUserId
    ? `/api/v1/posts/search/${blogUserId}`
    : '/api/v1/posts/search';
  const postListApi = '/api/v1/posts';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = searchValue
          ? await axios.get(searchApi, {
              params: { q: searchValue, page, limit },
            })
          : await axios.get(postListApi, {
              params: { userId: blogUserId, page, limit },
            });

        if (response.data.status !== 'success') {
          setError(response.data.message);
          return;
        }

        setPosts(response.data.data);
        setTotalPosts(response.data.totalPosts);
      } catch (e) {
        setError('포스트를 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchData();
  }, [blogUserId, page, limit, searchValue, searchApi]);

  const totalPage = Math.ceil(totalPosts / limit);
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='w-screen px-5'>
      {error && <div>{error}</div>}
      {searchValue && (
        <div>
          {blogUserId && '이 블로그에서'} {searchValue}(으)로 검색한 결과입니다
        </div>
      )}
      <div className='flex flex-wrap gap-x-8 gap-y-4 justify-center'>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <Link key={post._id} href={`/post/${post.author}/${post._id}`}>
                <PostItem post={post} />
              </Link>
            );
          })}
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex justify-center flex-grow'>
          {pageNumbers.map((number) => (
            <Link
              key={number}
              href={`/posts/${postListHref(
                blogUserId,
                searchValue,
                number,
                limit,
              )}`}
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
        <div>
          <Link href={`/post/editor/${loggedInUserId}`}>
            <button className='text-xl text-white font-bold bg-[#0044ff] rounded-lg hover:bg-[#0000ff] py-2 px-8'>
              포스트 작성하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { PostList };
