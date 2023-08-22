'use client';

function BlogLink({ sessionId }) {
  return (
    <div className='mb-3'>
      <label className='font-bold'>내 블로그 링크:</label>
      <div>https://vanillog/posts/{sessionId}</div>
    </div>
  );
}

export default BlogLink;
