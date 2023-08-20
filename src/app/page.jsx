'use client';

import { Navbar } from '@src/components/Navbar';
import { PostList } from '@src/components/postList/PostList';

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      {/* <PostList loggedInUserId={loggedInUserId} /> */}
    </>
  );
}
