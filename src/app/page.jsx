import { PostList } from '@src/components/Postlist/PostList';

export const metadata = {
  title: 'VanilLog Home',
  description: '바닐로그 설명추가...',
};

export default function Home() {
  return (
    <>
      <PostList />
    </>
  );
}
