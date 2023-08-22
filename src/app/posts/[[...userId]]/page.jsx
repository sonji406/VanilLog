import { PostList } from '@src/components/Postlist/PostList';

export const metadata = {
  title: '블로그 메인화면',
  description: '설명 추가 필요',
};

//TODO 설명 추가하기

export default function Posts({ params }) {
  const blogUserId = params.userId ? params.userId[0] : '';
  return (
    <>
      <PostList blogUserId={blogUserId} />
    </>
  );
}
