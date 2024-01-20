import { prisma } from '../../client';

export async function updateRoobetUsername(username: string, userId: string) {
  await prisma.userAccounts.update({
    where: {
      userId
    },
    data: {
      roobet: username
    }
  });
}

export async function updateGamdomUsername(username: string, userId: string) {
  await prisma.userAccounts.update({
    where: {
      userId
    },
    data: {
      gamdom: username
    }
  });
}

export async function updateCsgobigUsername(username: string, userId: string) {
  await prisma.userAccounts.update({
    where: {
      userId
    },
    data: {
      csgobig: username
    }
  });
}
