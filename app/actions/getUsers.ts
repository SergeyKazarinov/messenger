import prisma from '@/app/libs/prismadb';
import getSession from './gesSession';

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAd: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (e: any) {
    return [];
  }
};

export default getUsers;
