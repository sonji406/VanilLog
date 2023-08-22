'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';

export default function ProfilePage({ params }) {
  const userId = params.userId;
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/profile/${userId}`);

        if (response.data.status !== 'success') {
          throw new Error(response.data.message);
        }

        setUserProfile(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, session]);

  if (loading) {
    return <div>프로필을 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex p-10'>
      <div className='flex-1 pr-5'>
        <div className='mb-5'>
          <Image
            src='/path/to/your/profile/image.png'
            alt='.......ex'
            width={128}
            height={128}
            className='rounded-full mb-3'
          />
          <button className='bg-logo text-white px-4 py-2 rounded'>
            사진 업로드/변경
          </button>
        </div>

        <div className='mb-3'>
          <label className='font-bold'>내 닉네임:</label>
          <div>{userProfile?.name}</div>
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

      <div className='flex-1 pl-5 border-l border-gray-300'>
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
