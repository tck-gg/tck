import { prisma } from '../../client';

export async function updateRoobetUsername(username: string, userId: string): Promise<boolean> {
  const existingAccount = await prisma.userAccounts.findFirst({
    where: {
      roobet: username
    }
  });
  if (existingAccount) {
    return false;
  }

  await prisma.userAccounts.update({
    where: {
      userId
    },
    data: {
      roobet: username
    }
  });
  return true;
}

export async function updateGamdomUsername(username: string, userId: string): Promise<boolean> {
  const existingAccount = await prisma.userAccounts.findFirst({
    where: {
      gamdom: username
    }
  });
  if (existingAccount) {
    return false;
  }

  await prisma.userAccounts.update({
    where: {
      userId
    },
    data: {
      gamdom: username
    }
  });
  return true;
}

export async function updateCsgobigUsername(username: string, userId: string): Promise<boolean> {
  const existingAccount = await prisma.userAccounts.findFirst({
    where: {
      csgobig: username
    }
  });
  if (existingAccount) {
    return false;
  }

  await prisma.userAccounts.update({
    where: {
      userId
    },
    data: {
      csgobig: username
    }
  });
  return true;
}
