'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';
import { usePathname } from 'next/navigation';
import { getLastPartOfUrl } from '@utils/getLastPartOfUrl';
import { ERRORS } from 'constants/errors';
import axios from 'axios';

function Navbar() {
  const { data, status } = useSession();
  const userId = data?.mongoId;
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const pattern = /^\/posts\/[0-9a-fA-F]{24}$/;
  const blogUserId = pattern.test(pathname) ? getLastPartOfUrl(pathname) : '';

  useEffect(() => {
    if (userId) {
      const profileData = async () => {
        try {
          const response = await axios.get(`/api/v1/profile/${userId}`);

          if (response.data.status !== 200) {
            setError(response.data.message);
            return;
          }

          setProfile(response.data.data);
        } catch (e) {
          setError(ERRORS.PROFILE_LOADING_ERROR);
        }
      };

      profileData();
    }
  }, [userId]);

  return (
    <nav className='fixed top-0 left-0 w-full h-[55px] z-50 bg-[#16354D]'>
      <div className='flex justify-between h-full items-center shadow-md shadow-gray-400 p-2 px-6 max-w-[1920px] mx-auto'>
        <Link href='/'>
          <span className="font-['DiaGothicMedium'] text-[#E4E5EA] hover:text-[#0C151C] text-3xl">
            vanilLog
          </span>
        </Link>

        <div className='flex items-center'>
          {status === 'unauthenticated' ? (
            <Link
              href='/auth/login'
              className="font-['DiaGothicMedium'] ml-4 text-[#E4E5EA] text-xl"
            >
              Login
            </Link>
          ) : (
            <>
              <div className='rounded-full bg-white w-9 h-9 flex flex-col items-center justify-center relative overflow-hidden'>
                {error ? (
                  <p className='text-red'>{error}</p>
                ) : (
                  profile.profileImage && (
                    <Image
                      src={profile.profileImage}
                      alt='프로필 사진'
                      layout='fill'
                      priority
                    />
                  )
                )}
              </div>
              <div className="font-['DiaGothicMedium'] ml-1 text-[#E4E5EA] text-xl pl-2">
                {profile.nickname}
              </div>
              <Link
                href={`/posts/${userId}`}
                className="ml-4 font-['DiaGothicBold'] ml-4 text-[#c2daf0] text-xl mb-1 hover:text-[#0C151C]"
              >
                MyLog
              </Link>
              <LogoutButton />
            </>
          )}
          <form
            action={blogUserId ? `/posts/${blogUserId}` : '/posts'}
            method='get'
            className='flex ml-4'
          >
            <div>
              <input
                className='px-3 py-1 bg-[#f9f7ed] rounded-full placeholder-white focus:border-none focus:outline-none'
                type='text'
                name='q'
                required
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.form.submit();
                  }
                }}
              />
            </div>
            <input type='hidden' name='page' value='1' />
            <input type='hidden' name='limit' value='10' />
          </form>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
