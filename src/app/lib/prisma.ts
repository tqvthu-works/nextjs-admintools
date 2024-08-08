import { PrismaClient } from '@prisma/client';

declare global {
  // Allow the global `var` property to be recognized
  // `var` is used here to ensure that the PrismaClient instance is not re-created on each import.
  var prismaClient: PrismaClient | undefined;
}

const prismaClient = global.prismaClient || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prismaClient = prismaClient;
}
export default prismaClient;