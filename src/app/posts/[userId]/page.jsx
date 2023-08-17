'use client';

import { PostList } from '@src/components/postlist/PostList';

export default function Posts({ params }) {
  return (
    <>
      <PostList userId={params.userId} />
    </>
  );
}
