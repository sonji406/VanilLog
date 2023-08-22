'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [errorMessage, setErrorMessage] = useState(null);

  const { post, errorMessage: postError, handleDelete } = usePost(postId);
  const { errorMessage: commentError } = useComments(postId);

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  if (postError || commentError) {
    setErrorMessage(postError || commentError);
  }

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
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDelete(router, userId)}
        />
      )}

      <div className='bg-white rounded-lg shadow-xl p-8 mx-auto max-w-3xl'>
        <Link
          href={`/posts/${userId}`}
          className='text-blue-600 hover:underline mb-4 block'
        >
          작성자의 블로그
        </Link>

        <PostContent title={post.title} content={post.content} />

        {userId === session?.mongoId && (
          <PostActions
            userId={userId}
            session={session}
            postId={postId}
            onShowDeleteModal={() => setShowModal(true)}
          />
        )}

        <CommentsSection comments={post.comments} />
      </div>
    </div>
  );
}
