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
      } catch (error) {}
    };

    if (router.isReady) {
      fetchPost();
    }
  }, [postId, router.isReady]);

  const handleDelete = async () => {
    if (window.confirm('이 포스트를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/v1/posts/${postId}`);
        router.push(`/posts/${loggedInUserId}`);
      } catch (error) {}
    }
  };

  if (!post) return <div>로딩 중...</div>;

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
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <button>수정하기</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
            삭제하기
          </button>
        </div>
      )}

      <h2>댓글</h2>
      {post.comments && post.comments.length ? (
        post.comments.map((comment) => (
          <div key={comment._id.$oid}>
            <p>{comment.text}</p>
            <span>작성자: {comment.author.name}</span>
          </div>
        ))
      ) : (
        <p>아직 작성된 댓글이 없습니다.</p>
      )}
    </div>
  );
}
