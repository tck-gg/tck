import { prisma } from '../client';

import { LeaderboardSpot, LeaderboardType } from 'types';

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

export async function updateLeaderboard(type: LeaderboardType, data: LeaderboardSpot[]) {
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

export async function getAllLeaderboards() {
  return {
    stake: await getLeaderboard('stake'),
    gamdom: await getLeaderboard('gamdom'),
    csgoroll: await getLeaderboard('csgoroll'),
    hypedrop: await getLeaderboard('hypedrop')
  };
}
