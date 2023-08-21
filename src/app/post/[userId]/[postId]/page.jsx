'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePost } from '@utils/usePost';
import { useComments } from '@utils/useComment';
import ErrorMessage from '@src/components/PostDetail/ErrorMessage';
import DeleteModal from '@src/components/PostDetail/DeleteModal';
import PostContent from '@src/components/PostDetail/PostContent';
import PostActions from '@src/components/PostDetail/PostActions';
import CommentsSection from '@src/components/PostDetail/CommentsSection';

export default function PostDetailPage({ params }) {
  const userId = params.userId;
  const postId = params.postId;
  const { data: session } = useSession();

  const { post, errorMessage: postError, handleDelete } = usePost(postId);
  const { errorMessage: commentError } = useComments(postId);

  const [showModal, setShowModal] = useState(false);

  const errorMessage = postError || commentError;

  if (!post) return <div>포스트를 불러오는 중...</div>;

  return (
    <div className='bg-gray-100 min-h-screen p-10'>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {showModal && (
        <DeleteModal
          onClose={() => setShowModal(false)}
          onDelete={handleDelete}
        />
      )}

      <div className='bg-white rounded-lg shadow-xl p-8 mx-auto max-w-3xl'>
        <PostContent title={post.title} content={post.content} />

        {userId === session?.mongoId && (
          <PostActions userId={userId} session={session} postId={postId} />
        )}

        <CommentsSection comments={post.comments} />
      </div>
    </div>
  );
}
