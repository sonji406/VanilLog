'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useComments } from '@utils/useComment';
import CommentsSection from '@src/components/Comment/CommentsSection';

function CommentsContainer({ postId }) {
  const {
    commentText,
    setCommentText,
    handleCommentSubmit,
    errorMessage: commentError,
  } = useComments(postId);

  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNewComment = async () => {
    const newComment = await handleCommentSubmit();

    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/v1/comment/${postId}`);
        if (response.data.status === 'success') {
          setComments(response.data.data);
        }
      } catch (error) {}
    };
    fetchComments();
  }, [postId]);

  useEffect(() => {
    if (commentError) {
      setErrorMessage(commentError);
    }
  }, [commentError]);

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      <CommentsSection
        comments={comments}
        commentText={commentText}
        onCommentChange={(e) => setCommentText(e.target.value)}
        onCommentSubmit={handleNewComment}
      />
    </>
  );
}

export default CommentsContainer;
