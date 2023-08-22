function CommentsSection({
  comments,
  commentText,
  onCommentChange,
  onCommentSubmit,
}) {
  return (
    <div>
      <h2 className='text-xl font-semibold mt-6 mb-4'>댓글</h2>
      {comments && comments.length ? (
        comments.map((comment) => (
          <div key={comment.id} className='border-t pt-4'>
            <p className='mb-2'>{comment.text}</p>
            <span className='text-gray-500'>작성자: {comment.author.name}</span>
          </div>
        ))
      ) : (
        <p className='text-gray-500 mb-6'>아직 작성된 댓글이 없습니다.</p>
      )}

      <div className='mt-6 flex'>
        <textarea
          value={commentText}
          onChange={onCommentChange}
          placeholder='댓글을 작성하세요.'
          className='flex-grow p-3 border rounded-md mr-2'
        />
        <button
          onClick={onCommentSubmit}
          className='bg-logo text-white py-2 px-4 rounded'
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
}

export default CommentsSection;
