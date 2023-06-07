import { Conversation, Message, User } from '@prisma/client';

export type TFullMessage = Message & {
  sender: User,
  seen: User[],
};

export type TFullConversation = Conversation & {
  user: User[],
  messages: TFullMessage[],
};

export enum AvatarTypeEnum {
  BODY = 'body',
  HEADER = 'header',
  SIDEBAR = 'sidebar',
  PROFILE_DRAWER = 'profile_drawer',
  CONVERSATION_BOX = 'conversation_box',
  USER_BOX = 'user_box',
}
