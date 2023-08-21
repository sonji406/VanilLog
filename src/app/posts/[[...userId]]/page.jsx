'use client';

import { PostList } from '@src/components/postList/PostList';

export default function Posts({ params }) {
  const blogUserId = params.userId ? params.userId[0] : '';
  return (
    <>
      <PostList blogUserId={blogUserId} />
    </>
  );
}
