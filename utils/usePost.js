'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (error) => {
    if (error.response && error.response.data.status !== 200) {
      return setErrorMessage(error.response.data.message);
    }

    return setErrorMessage('알 수 없는 오류가 발생했습니다.');
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const response = await axios.get(`/api/v1/post/${postId}`);

        if (response.data.status === 200) {
          return setPost(response.data.data);
        }

        return handleError(response);
      } catch (error) {
        return handleError(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async (router, userId) => {
    try {
      const response = await axios.delete(`/api/v1/post/${postId}`);

      if (response.data.status === 200) {
        return router.push(`/posts/${userId}`);
      }

      return handleError(response);
    } catch (error) {
      return handleError(error);
    }
  };

  return { post, errorMessage, handleDelete, handleError };
};
