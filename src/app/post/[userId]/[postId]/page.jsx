'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function PostDetailPage({ params }) {
  const router = useRouter();
  const userId = params.userId;
  const postId = params.postId;
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { data: session } = useSession();

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
        const response = await axios.get(`/api/v1/posts/${postId}`);
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

  const handleDelete = async () => {
    if (!window.confirm('이 포스트를 삭제하시겠습니까?')) return;
    try {
      const response = await axios.delete(`/api/v1/posts/${postId}`);
      if (response.data.status === 'success') {
        router.push(`/posts/${userId}`);
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
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

  if (!post) return <div>포스트를 불러오는 중...</div>;

  return (
    <div className='bg-gray-100 min-h-screen p-10'>
      {errorMessage && (
        <div className='bg-red-500 text-white px-4 py-2 rounded mb-6'>
          {errorMessage}
          <button onClick={() => setErrorMessage(null)} className='ml-4'>
            X
          </button>
        </div>
      )}
      <div className='bg-white rounded-lg shadow-xl p-8 mx-auto max-w-3xl'>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold'>제목</h2>
          <p className='text-lg mt-2'>{post.title}</p>
        </div>

        <div className='border-2 border-gray-300 p-8 rounded-lg mb-8'>
          {' '}
          {post.content.blocks.map((item) => {
            if (item.type === 'image') {
              return (
                <div key={item.id} className='my-4'>
                  <Image
                    src={item.data.file.url}
                    alt={item.data.file.name}
                    width={60}
                    height={40}
                  />
                </div>
              );
            }
            if (item.type === 'paragraph') {
              return (
                <p key={item.id} className='mb-4'>
                  {item.data.text}
                </p>
              );
            }
            return null;
          })}
        </div>

        {userId === session?.mongoId && (
          <div className='flex justify-end mb-8 space-x-4'>
            <button className='bg-logo text-white py-2 px-4 rounded'>
              수정하기
            </button>
            <button
              onClick={handleDelete}
              className='bg-red-500 text-white py-2 px-4 rounded'
            >
              삭제하기
            </button>
          </div>
        )}

        <h2 className='text-xl font-semibold mt-6 mb-4'>댓글</h2>
        {post.comments && post.comments.length ? (
          post.comments.map((comment) => (
            <div key={comment.id} className='border-t pt-4'>
              <p className='mb-2'>{comment.text}</p>
              <span className='text-gray-500'>
                작성자: {comment.author.name}
              </span>
            </div>
          ))
        ) : (
          <p className='text-gray-500 mb-6'>아직 작성된 댓글이 없습니다.</p>
        )}

        <div className='mt-6'>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='댓글을 작성하세요.'
            className='w-full p-3 border rounded-md mb-4'
          />
          <button
            onClick={handleCommentSubmit}
            className='mt-4 bg-logo text-white py-2 px-4 rounded'
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
}
