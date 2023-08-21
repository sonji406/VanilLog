import { useState } from 'react';
import axios from 'axios';

export const useComments = (postId) => {
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (error) => {
    if (error.response && error.response.data.status !== 'success') {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText) return;
    try {
      const response = await axios.post(`/api/v1/posts/${postId}/comment`, {
        text: commentText,
      });
      if (response.data.status === 'success') {
        setCommentText('');
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return { commentText, setCommentText, handleCommentSubmit, errorMessage };
};
