'use client';

import useRoutes from '@/app/hooks/useRoutes';
import { FC, useState } from 'react';
import { User } from '@prisma/client';
import { AvatarTypeEnum } from '@/app/types';
import DesktopItem from './DesktopItem';
import Avatar from '../Avatar';
import SettingsModal from './SettingsModal';

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between'>
        <nav className='mt-4 flex flex-col justify-between'>
          <ul role='list' className='flex flex-col items-center space-y-1'>
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className='mt-4 flex flex-col justify-between items-center'>
          <div onClick={handleOpen} className='cursor-pointer hover:opacity-75 transition'>
            <Avatar user={currentUser} type={AvatarTypeEnum.SIDEBAR} />

          </div>

        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
