import PostDetail from '@src/components/PostDetail/PostDetail';
import axios from 'axios';
import Error from 'next/error';

// export async function generateMetadata({ params }) {
//   const postId = params.postId;
//   try {
//     const response = await axios.get(`/api/v1/posts/${postId}`);
//     if (response.data.status !== 'success') {
//       throw new Error('포스트 데이터 가져오는데 실패하였습니다.');
//     }
//     const post = response.data.data;

//     return {
//       title: post.title,
//       // TODO 콘텐트가 하나로 뭉쳐져 있어서 여기서 글을 어떻게 가져와야할지 상의 필요
//     };
//   } catch (error) {
//     return {
//       title: '포스트 상세화면입니다',
//       description: '컨텐츠 정보 못 가져왔을시 나오는 메시지',
//     };
//   }
// }

export default function PostDetailPage({}) {
  // const userId = params.userId;
  // const postId = params.postId;
  console.log('postdetailpage');

  return (
    <div className='bg-gray-100 min-h-screen p-10'>
      {/* <PostDetail userId={userId} postId={postId} /> */}
      <p></p>
    </div>
  );
}
