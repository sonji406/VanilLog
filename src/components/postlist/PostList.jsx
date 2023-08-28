'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PostItem } from './PostItem';
import { postListHref } from '@utils/postListHref';
import { ERRORS } from 'constants/errors';

function PostList({ blogUserId }) {
  const params = useSearchParams();

  const searchValue = params.get('q');
  const page = params.get('page') || 1;
  const limit = params.get('limit') || 8;

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

        if (response.data.status !== 200) {
          setError(response.data.message);
          return;
        }

        setPosts(response.data.data);
        setTotalPosts(response.data.totalPosts);
      } catch (e) {
        setError(ERRORS.POST_LOADING_ERROR);
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
    <div className='px-5 mt-[22px] mx-auto'>
      {error && <div>{error}</div>}
      {searchValue && (
        <div>
          {blogUserId && '이 블로그에서'} {searchValue}(으)로 검색한 결과입니다
        </div>
      )}
      <div className='flex justify-center flex-wrap gap-x-8 gap-y-4'>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <div
                key={post._id}
                className='border-solid border-white border-8 shadow-md'
              >
                <Link href={`/post/${post.author}/${post._id}`}>
                  <PostItem post={post} />
                </Link>
              </div>
            );
          })}
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex justify-start flex-grow'>
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
                className='text-xl text-white font-bold bg-[#6B99C3] rounded-full hover:bg-[#0C151C] hover:text-[#E4E5EA] w-8 h-8 m-0.5'
              >
                {number}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex justify-end'>
        <Link href={`/post/editor/${loggedInUserId}`}>
          <button className='text-xl text-white font-bold bg-[#6B99C3] rounded-full hover:bg-[#0C151C] hover:text-[#E4E5EA] py-2 px-8'>
            포스트 작성하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export { PostList };
