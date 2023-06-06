import { Conversation, Message, User } from '@prisma/client';

export type TFullMessage = Message & {
  sender: User,
  seen: User[],
};

export type TFullConversation = Conversation & {
  user: User[],
  messages: TFullMessage[],
};
