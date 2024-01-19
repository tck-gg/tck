import { prisma } from '../../client';

export async function updateBitcoinWallet(wallet: string, userId: string) {
  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
      bitcoin: wallet
    }
  });
}

export async function updateEthereumWallet(wallet: string, userId: string) {
  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
      ethereum: wallet
    }
  });
}

export async function updateLitecoinWallet(wallet: string, userId: string) {
  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
      ethereum: wallet
    }
  });
}

export async function updateSteamTradeUrl(steamTradeUrl: string, userId: string) {
  await prisma.userWallets.update({
    where: {
      userId
    },
    data: {
      steamTradeUrl
    }
  });
}
