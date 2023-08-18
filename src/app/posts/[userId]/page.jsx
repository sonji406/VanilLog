'use client';

import { PostList } from '@src/components/postList/PostList';

export default function Posts({ params }) {
  const loggedInUserId = '로그인유저아이디';
  const blogUserId = params.userId;
  return (
    <>
      <PostList loggedInUserId={loggedInUserId} blogUserId={blogUserId} />
    </>
  );
}
