import { FC } from 'react';
import console from 'console';
import Sidebar from '../components/sidebar/Sidebar';
import ConversationList from './components/ConversationsList';
import getConversations from '../actions/getConversations';

interface ConversationsLayoutProps {
  children: React.ReactNode
}

const ConversationsLayout: FC<ConversationsLayoutProps> = async ({ children }) => {
  const conversations = await getConversations();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
