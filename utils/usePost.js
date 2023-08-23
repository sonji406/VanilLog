'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (error) => {
    if (error.response && error.response.data.status !== 'success') {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const response = await axios.get(`/api/v1/post/${postId}`);
        if (response.data.status === 'success') {
          setPost(response.data.data);
        } else {
          handleError(response);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async (router, userId) => {
    try {
      const response = await axios.delete(`/api/v1/post/${postId}`);
      if (response.data.status === 'success') {
        router.push(`/posts/${userId}`);
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return { post, errorMessage, handleDelete, handleError };
};
