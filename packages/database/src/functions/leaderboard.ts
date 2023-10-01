import axios from 'axios';
import {
  ClashLeaderboardEntry,
  GamdomLeaderboardApiResponse,
  LeaderboardSpot,
  LeaderboardType
} from 'types';
import { format, previousSaturday, previousSunday } from 'date-fns';

import { prisma } from '../client';

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

  let spots: LeaderboardSpot[] = [];

  if (type === 'gamdom') {
    const response = await axios.get(
      `https://gamdom.com/api/affiliates/leaderboard?apikey=${process.env.GAMDOM_API_KEY}&after=${
        new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
      }`,
      {
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 200) {
      const data: GamdomLeaderboardApiResponse = response.data;
      spots = data.data
        .sort((a, b) => {
          return b.wager_data[0].total_wager_usd - a.wager_data[0].total_wager_usd;
        })
        .splice(0, 10)
        .map((spot) => {
          return {
            username: spot.username,
            amount: Math.round(spot.wager_data[0].total_wager_usd),
            avatar: ''
          };
        });
    }
  }

  if (type === 'clash') {
    const response = await axios.get(
      `https://api.clash.gg/affiliates/detailed-summary/v2/${format(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        'yyyy-MM-dd'
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_API_KEY}`,
          'Content-Type': 'application/json'
        },
        validateStatus: () => {
          return true;
        }
      }
    );
    const data: ClashLeaderboardEntry[] = response.data;

    spots = data
      .filter((spot) => {
        return spot.name !== 'TCK';
      })
      .sort((a, b) => {
        return b.wagered - a.wagered;
      })
      .splice(0, 10)
      .map((spot) => {
        return {
          username: spot.name,
          amount: Math.round(spot.wagered / 100),
          avatar: spot.avatar
        };
      });
  }

  if (type !== 'stake' && spots.length > 0) {
    await updateLeaderboard(type, spots);
  }

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
    clash: await getLeaderboard('clash'),
    csgobig: await getLeaderboard('csgobig')
  };
}
