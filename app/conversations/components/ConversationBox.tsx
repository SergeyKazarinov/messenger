'use client';

import { FC, useCallback, useMemo } from 'react';
import { Conversation, Message, User } from '@prisma/client';
import { format } from 'date-fns';
import { TFullConversation } from '@/app/types';
import useOtherUser from '@/app/hooks/useOtherUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Avatar from '@/app/components/Avatar';

interface ConversationBoxProps {
  data: TFullConversation
  selected?: boolean
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Send and image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      className={clsx(
        `
    w-full,
    relative
    flex
    items-center
    space-x-3
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
    p-3
    `,
        selected ? 'bg-neutral-100' : 'bg-white',
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-nove'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-medium text-gray-900'>
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className='text-xs text-gray-400 font-light'>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p className={clsx(
            `
          truncate
          text-sm
          `,
            hasSeen ? 'text-gray-500' : 'text-black font-medium',
          )}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
