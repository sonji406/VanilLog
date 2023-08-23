'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export const useComments = (postId) => {
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { data: session } = useSession();

  const handleError = (error) => {
    if (error.response && error.response.data.status !== 'success') {
      setErrorMessage(error.response.data.message);
    }

    return setErrorMessage('알 수 없는 오류가 발생했습니다.');
  };

  const handleCommentSubmit = async () => {
    if (!commentText) return;

    const commentAuthorId = session?.mongoId;

    if (!commentAuthorId) {
      setErrorMessage('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post(`/api/v1/comment/${postId}`, {
        comment: commentText,
        author: commentAuthorId,
      });

      if (response.data.status === 'success') {
        setCommentText('');

        return response.data.data;
      }

      return handleError(response);
    } catch (error) {
      handleError(error);
    }
  };

  return { commentText, setCommentText, handleCommentSubmit, errorMessage };
};
