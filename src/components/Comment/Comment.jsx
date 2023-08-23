'use client';

import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function Comment({ commentInfo }) {
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);

  const { data: session } = useSession();

  if (!commentInfo || isDeleted) {
    return <></>;
  }

  const handleEdit = () => {
    commentInfo.comment = '테스트';
    setIsEdited(true);
  };

  const handleDelete = async () => {
    try {
      setError(null);

      const postId = commentInfo.blogPost;
      const commentId = commentInfo._id;

      const response = await axios.delete(
        `/api/v1/comment/${postId}/${commentId}`,
      );

      if (response.data.status === 'success') {
        setIsDeleted(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const isAuthor = session?.mongoId === commentInfo.author;

  return (
    <div className='border-t pt-4'>
      <p className='mb-2'>{commentInfo.comment}</p>

      <span className='text-gray-500'>
        작성자: {commentInfo.author}
        {isAuthor && (
          <>
            <button
              onClick={handleEdit}
              className='ml-2 text-sm text-gray-700 bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded'
            >
              수정
            </button>

            <button
              onClick={handleDelete}
              className='ml-2 text-sm text-gray-700 bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded'
            >
              삭제
            </button>

            {error && (
              <span className='ml-2 text-red-500'>
                댓글을 수정/삭제할 수 없습니다.
              </span>
            )}
          </>
        )}
      </span>
    </div>
  );
}

export default Comment;
