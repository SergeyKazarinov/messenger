import { PrismaClient } from '@prisma/client';

declare global {
  /* eslint-disable vars-on-top, no-var */
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
