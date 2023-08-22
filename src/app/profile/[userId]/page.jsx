'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';

export default function ProfilePage({ params }) {
  const userId = params.userId;
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(userProfile?.nickname || '');
  const { data: session } = useSession();
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/profile/${userId}`);
        if (response.data.status !== 'success') {
          throw new Error(response.data.message);
        }

        setUserProfile(response.data.data);
        setNickname(response.data.data.nickname);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, session]);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const updateNickname = async () => {
    try {
      const response = await axios.put(`/api/v1/profile/${userId}`, {
        nickname,
      });
      if (response.data.status !== 'success') {
        throw new Error(response.data.message);
      }
      setMessage('닉네임이 성공적으로 업데이트되었습니다');
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        nickname,
      }));
      setEditing(false);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/v1/image/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.file) {
        const imageUrl = response.data.file.url;

        const updateResponse = await axios.put(
          `/api/v1/profile/updateImage/${userId}`,
          {
            imageUrl: imageUrl,
          },
        );

        if (updateResponse.data && updateResponse.data.status === 'success') {
          const updatedProfile = {
            ...userProfile,
            profileImage: imageUrl,
          };
          setUserProfile(updatedProfile);
        }
      }
    } catch (error) {
      error;
    }
  };

  if (loading) {
    return <div>프로필을 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex p-20'>
      <div className='flex-1 pr-10'>
        <div className='mb-10 flex flex-col items-center'>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={handleImageUpload}
          />
          <Image
            src={userProfile?.profileImage || '/image/profileDefault.png'}
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

        <div className='mb-5'>
          <label className='font-bold mb-2 block'>내 닉네임:</label>
          {editing ? (
            <>
              <input
                type='text'
                value={nickname}
                onChange={handleNicknameChange}
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
              <div className='mt-2 text-sm text-red-600'>{message}</div>
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
              <div
                className={`mt-2 text-sm ${
                  message.includes('성공적으로')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {message}
              </div>
            </>
          )}
        </div>
        <div className='mb-3'>
          <label className='font-bold'>내 블로그 링크:</label>
          <div>https://vanillog/posts/{session?.mongoId}</div>
        </div>

        <div className='mb-3'>
          <label className='font-bold'>연동된 소셜:</label>
          <div>{userProfile?.socialLoginType}</div>
        </div>
      </div>

      <div className='flex-1 pl-10 border-l border-gray-300'>
        <h2 className='text-lg font-bold mb-5'>블로그 통계</h2>

        <div className='mb-3'>
          <label className='font-bold'>일일 방문자 수:</label>
          <div>일일 방문자 수</div>
        </div>

        <div className='mb-3'>
          <label className='font-bold'>총 방문자 수:</label>
          <div>총 방문자 수</div>
        </div>

        <div className='mb-3'>
          <label className='font-bold'>반복 방문자 수:</label>
          <div>반복 방문자 수</div>
        </div>
      </div>
    </div>
  );
}
