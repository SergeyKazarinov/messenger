import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { useMemo } from 'react';
import { TFullConversation } from '../types';

const useOtherUser = (conversation: TFullConversation | { user: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const otherUserMore = conversation.user.filter((user) => user.email !== currentUserEmail);

    return otherUserMore[0];
  }, [session?.data?.user?.email, conversation.user]);

  return otherUser;
};

export default useOtherUser;
