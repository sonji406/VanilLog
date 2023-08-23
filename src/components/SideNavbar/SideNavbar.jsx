'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ProfileBox } from './Profilebox';
import { StatisticsBox } from './StatisticsBox';
import { BurgerMenu } from './BurgerMenu';
import axios from 'axios';

function SideNavbar() {
  const { data } = useSession();
  const userId = data?.mongoId;

  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios.get(`/api/v1/profile/${userId}`);

        if (response.data.status !== 'success') {
          setError(response.data.message);
          return;
        }

        setProfile(response.data.data);
      } catch (e) {
        setError('프로필을 불러오는 중 문제가 발생했습니다.');
      }
    };

    profileData();
  }, [userId]);

  return (
    <div className='relative'>
      <label
        className='fixed top-4 left-4 z-10 rounded-full bg-blue-500  hover:bg-[#0044ff] p-3 cursor-pointer mt-[45px] shadow-md shadow-gray-500'
        title='menu'
        onMouseEnter={() => setIsOpen(true)}
      >
        <BurgerMenu isOpen={isOpen} />
      </label>

      <div>
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-[#e0e0e0] transform shadow-2xl shadow-gray-800 flex flex-col items-center ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-500`}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ProfileBox profile={profile} error={error} />
          <div className='mt-8'>{data && <StatisticsBox />}</div>
        </nav>
      </div>
    </div>
  );
}

export { SideNavbar };
