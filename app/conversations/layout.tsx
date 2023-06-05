import { FC } from 'react';
import console from 'console';
import Sidebar from '../components/sidebar/Sidebar';
import ConversationList from './components/ConversationsList';
import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';

interface ConversationsLayoutProps {
  children: React.ReactNode
}

const ConversationsLayout: FC<ConversationsLayoutProps> = async ({ children }) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
