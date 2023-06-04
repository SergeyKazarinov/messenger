'use client';

import useConversation from '@/app/hooks/useConversation';
import { TFullMessage } from '@/app/types';
import { FC, useRef, useState } from 'react';
import MessageBox from './MessageBox';

interface BodyProps {
  initialMessages: TFullMessage[]
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className='pt-24'/>
    </div>
  );
};

export default Body;
