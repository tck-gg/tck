import axios from 'axios';
import {
  CsgoBigLeaderboardApiResponse,
  GamdomLeaderboardApiResponse,
  LeaderboardSpot,
  LeaderboardType,
  PackdrawLeaderboardApiData,
  RoobetLeaderboardSpot
} from 'types';
import { format, previousSunday } from 'date-fns';

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

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split('T')[0];

  let spots: LeaderboardSpot[] = [];

  if (type === 'gamdom') {
    const response = await axios.get(
      `https://gamdom.com/api/affiliates/leaderboard?apikey=${process.env.GAMDOM_API_KEY}&after=${monthStart}`,
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

  if (type === 'csgobig') {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

    const response = await axios.get(
      `https://csgobig.com/api/partners/wagerStats/tckn3e9HBsu8HjjMAqBv33y?time=${start}`
    );

    const data: CsgoBigLeaderboardApiResponse = response.data;

    spots = data.results.splice(0, 10).map((spot) => {
      return {
        username: spot.name,
        amount: Math.round(spot.total),
        avatar: spot.img || ''
      };
    });
  }

  if (type === 'roobet') {
    const response = await axios.get(
      `https://api.roobet.com/affiliate/stats?userId=0401366b-7c9a-4edf-99e5-90db191b54ed&startDate=${new Date(
        monthStart
      ).toISOString()}`,
      {
        headers: {
          authorization: `Bearer ${process.env.ROOBET_API_KEY}`
        }
      }
    );
    const data: RoobetLeaderboardSpot[] = response.data;

    spots = data
      .sort((a, b) => {
        return b.wagered - a.wagered;
      })
      .splice(0, 10)
      .map((spot) => {
        return {
          username: spot.username,
          amount: Math.round(spot.wagered),
          avatar: ''
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
    csgobig: await getLeaderboard('csgobig'),
    roobet: await getLeaderboard('roobet')
  };
}
