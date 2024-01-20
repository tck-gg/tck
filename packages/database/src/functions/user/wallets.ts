import { prisma } from '../../client';

export async function updateBitcoinWallet(wallet: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      bitcoin: wallet
    }
  });
  if (existing) {
    return false;
  }

  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
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

  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
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

  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
      ethereum: wallet
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

  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
      steamTradeUrl
    }
  });
  return true;
}
