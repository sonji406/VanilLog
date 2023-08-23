'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import PostContent from './PostContent';
import PostActions from './PostActions';
import ErrorMessageWindow from './ErrorMessageWindow';
import { usePost } from '@utils/usePost';
import { useComments } from '@utils/useComment';

export default function PostDetail({ userId, postId }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  const { post, errorMessage: postError, handleDelete } = usePost(postId);
  const { errorMessage: commentError } = useComments(postId);

  const errorMessage = postError || commentError;

  if (!post) return <div>포스트를 불러오는 중...</div>;

  return (
    <>
      <ErrorMessageWindow message={errorMessage} />

      {showModal && (
        <DeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDelete(router, userId)}
        />
      )}

      <div className='bg-white rounded-lg shadow-xl p-8 mx-auto max-w-3xl'>
        <PostContent title={post.title} content={post.content} />

        {userId === session?.mongoId && (
          <PostActions
            userId={userId}
            session={session}
            postId={postId}
            onShowDeleteModal={() => setShowModal(true)}
          />
        )}
      </div>
    </>
  );
}
