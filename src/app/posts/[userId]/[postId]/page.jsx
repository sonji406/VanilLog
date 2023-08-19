'use client';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);

  const loggedInUserId = '60d021446bbf4b001c8917e9';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${postId}`);
        setPost(response.data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (router.isReady) {
      fetchPost();
    }
  }, [postId, router.isReady]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      {post.content.map((item) => {
        if (item.type === 'image') {
          return (
            <img
              key={item._id.$oid}
              src={item.value.file.url}
              alt={item.value.file.name}
            />
          );
        }
        if (item.type === 'paragraph') {
          return <p key={item._id.$oid}>{item.value.text}</p>;
        }
        return null;
      })}
      {post.author.$oid === loggedInUserId && (
        <button style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          수정하기
        </button>
      )}
    </div>
  );
}
