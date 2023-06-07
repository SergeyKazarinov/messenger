'use client';

import Avatar from '@/app/components/Avatar';
import LoadingModal from '@/app/components/LoadingModal';
import { AvatarTypeEnum } from '@/app/types';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';

interface UserBoxProps {
  data: User
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios.post('/api/conversations', {
      userId: data.id,
    })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
      >
        <Avatar user={data} type={AvatarTypeEnum.USER_BOX} />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex justify-between items-center mb-1'>
              <p className='text-sm font-mediuv text-gray-900'>
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
