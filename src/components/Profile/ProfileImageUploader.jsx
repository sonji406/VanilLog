'use client';

import Image from 'next/image';

function ProfileImageUploader({
  uploadedImage,
  userProfile,
  handleImageUpload,
  inputRef,
}) {
  return (
    <div className='mb-10 flex flex-col items-center'>
      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleImageUpload}
      />
      <Image
        src={
          uploadedImage ||
          userProfile?.profileImage ||
          '/image/profileDefault.png'
        }
        alt='Profile Image'
        width={128}
        height={128}
        priority
      />
      <button
        className='bg-logo text-white px-4 py-2 rounded mt-5'
        onClick={() => inputRef.current.click()}
      >
        사진 업로드/변경
      </button>
    </div>
  );
}

export default ProfileImageUploader;
