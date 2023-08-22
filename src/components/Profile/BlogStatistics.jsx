'use client';

function BlogStatistics() {
  return (
    <div className='flex-1 pl-10 border-l border-gray-300'>
      <h2 className='text-lg font-bold mb-5'>블로그 통계</h2>

      <div className='mb-3'>
        <label className='font-bold'>일일 방문자 수:</label>
        <div>n 명</div>
      </div>

      <div className='mb-3'>
        <label className='font-bold'>총 방문자 수:</label>
        <div>n 명</div>
      </div>

      <div className='mb-3'>
        <label className='font-bold'>반복 방문자 수:</label>
        <div>n 명</div>
      </div>
    </div>
  );
}

export default BlogStatistics;
