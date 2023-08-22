'use client';

import { PostList } from '@src/components/Postlist/PostList';

export default function Posts({ params }) {
  const blogUserId = params.userId ? params.userId[0] : '';
  return (
    <>
      <PostList blogUserId={blogUserId} />
    </>
  );
}
