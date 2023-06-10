import { prisma } from '../client';

export async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      actions: true,
      accounts: true
    }
  });
}
