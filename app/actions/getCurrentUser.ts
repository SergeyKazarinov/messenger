import prisma from '@/app/libs/prismadb';
import getSession from './gesSession';

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (e) {
    return null;
  }
};

export default getCurrentUser;
