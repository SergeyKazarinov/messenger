import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const {
      message,
      image,
      conversationId,
    } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: { id: currentUser.id },
        },
      },
    });

    const updateConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        user: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage = updateConversation.messages[updateConversation.messages.length - 1];

    updateConversation.user.forEach((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        message: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (e: any) {
    console.log(e, 'ERROR_MESSAGES');
    return new NextResponse('InternalError', { status: 500 });
  }
};
