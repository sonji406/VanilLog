'use client';

import { PostList } from '@src/components/postList/PostList';

export default function Posts({ params }) {
  const blogUserId = params.userId;
  return (
    <>
      <PostList blogUserId={blogUserId} />
    </>
  );
}
