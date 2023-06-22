import { prisma } from '../client';

type LeaderboardType = 'stake' | 'gamdom' | 'csgoroll' | 'hypedrop';
interface leaderboardSpot {
  username: string;
  amount: number;
}

async function ensureLeaderboard(type: LeaderboardType) {
  // Create the leaderboard if it doesn't exist.
  const leaderboard = await prisma.leaderboard.findUnique({
    where: {
      type
    }
  });
  if (!leaderboard) {
    await prisma.leaderboard.create({
      data: {
        type,
        spots: {
          create: []
        }
      }
    });
  }
}

export async function updateLeaderboard(type: LeaderboardType, data: leaderboardSpot[]) {
  await ensureLeaderboard(type);

  // Delete old leaderboard.
  // TODO: Save old one.
  await prisma.leaderboardSpot.deleteMany({
    where: {
      leaderboard: {
        type
      }
    }
  });

  // Update.
  await prisma.leaderboard.update({
    where: {
      type
    },
    data: {
      spots: {
        create: data
      }
    }
  });
}

export async function getLeaderboard(type: LeaderboardType) {
  await ensureLeaderboard(type);

  return await prisma.leaderboard.findUnique({
    where: {
      type
    },
    include: {
      spots: {
        orderBy: {
          amount: 'desc'
        }
      }
    }
  });
}
