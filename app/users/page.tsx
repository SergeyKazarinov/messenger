import { signOut } from 'next-auth/react';
import { FC } from 'react';
import EmptyState from '../components/EmptyState';

interface UsersProps {

}

const Users: FC<UsersProps> = () => {
  const handleClick = () => {
    signOut();
  };

  return (
    <div className='hidden lg:block lg:pl-80 h-full'>
      <EmptyState />
    </div>
  );
};

export default Users;
