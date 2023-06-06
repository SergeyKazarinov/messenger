'use client';

import useConversation from '@/app/hooks/useConversation';
import { TFullConversation } from '@/app/types';
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import { find, update } from 'lodash';
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal';

interface ConversationListProps {
  initialItems: TFullConversation[];
  users: User[]
}

const ConversationList: FC<ConversationListProps> = ({ initialItems, users }) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const pusherKey = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const newHandler = (conversation: TFullConversation) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: TFullConversation) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages,
          };
        }

        return currentConversation;
      }));
    };

    const removeHandler = (conversation: TFullConversation) => {
      setItems((current) => [...current.filter((item) => item.id !== conversation.id)]);
      if (conversation.id === conversationId) {
        router.push('/conversations');
      }
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    /* eslint-disable consistent-return */
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <aside className={clsx(
        `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        `,
        isOpen ? 'hidden' : 'block w-full left-0',
      )}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">
            Messages
            </div>
            <div onClick={handleOpenModal} className='rouded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover: opacity-75 transition'>
              <MdOutlineGroupAdd size={20}/>
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected = {conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
