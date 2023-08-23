'use client';

function NicknameEditor({
  editing,
  toggleEditing,
  nickname,
  setNickname,
  updateNickname,
  message,
}) {
  return (
    <div className='mb-5'>
      <label className='font-bold mb-2 block'>내 닉네임:</label>
      {editing ? (
        <>
          <input
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className='border px-2 py-1 rounded block w-full mb-3'
          />
          <div className='flex justify-between items-center'>
            <button
              onClick={updateNickname}
              className='bg-logo text-white px-4 py-2 rounded'
            >
              저장
            </button>
          </div>
          <div className='mt-2 text-sm text-blue-600'>{message}</div>
        </>
      ) : (
        <>
          <div className='mb-2'>{nickname}</div>
          <button
            onClick={toggleEditing}
            className='bg-logo text-white px-4 py-2 rounded'
          >
            닉네임 수정하기
          </button>
          <div className='mt-2 text-sm text-blue-600'>{message}</div>
        </>
      )}
    </div>
  );
}

export default NicknameEditor;
