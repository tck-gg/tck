import { prisma } from '../../client';
import { getUserById } from './fetch';

export async function updateBitcoinWallet(wallet: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      bitcoin: wallet
    }
  });
  if (existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      bitcoin: wallet
    },
    create: {
      userId,
      bitcoin: wallet
    }
  });
  return true;
}

export async function updateEthereumWallet(wallet: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      ethereum: wallet
    }
  });
  if (existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      ethereum: wallet
    },
    create: {
      userId,
      ethereum: wallet
    }
  });
  return true;
}

export async function updateLitecoinWallet(wallet: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      litecoin: wallet
    }
  });
  if (existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      litecoin: wallet
    },
    create: {
      userId,
      litecoin: wallet
    }
  });
  return true;
}

export async function updateSteamTradeUrl(steamTradeUrl: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      steamTradeUrl
    }
  });
  if (existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      steamTradeUrl
    },
    create: {
      userId,
      steamTradeUrl
    }
  });
  return true;
}
