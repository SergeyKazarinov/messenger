'use client';

import { signOut } from 'next-auth/react';
import { FC } from 'react';

interface UsersProps {

}

const Users: FC<UsersProps> = () => {
  const handleClick = () => {
    signOut();
  };

  return (
    <button onClick={handleClick}>Logout</button>
  );
};

export default Users;
