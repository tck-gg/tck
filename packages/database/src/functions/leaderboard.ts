import axios from 'axios';
import {
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
  const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    .toISOString()
    .split('T')[0];
  let spots: LeaderboardSpot[] = [];

  // if (type === 'gamdom') {
  //   if (!process.env.GAMDOM_API_KEY) {
  //     return {
  //       id: '0',
  //       type,
  //       spots: []
  //     };
  //   }

  //   const response = await axios.get(
  //     `https://gamdom.com/api/affiliates/leaderboard?apikey=${process.env.GAMDOM_API_KEY}&after=${monthStart}`,
  //     {
  //       validateStatus: () => {
  //         return true;
  //       }
  //     }
  //   );

  //   if (response.status === 200) {
  //     const data: GamdomLeaderboardApiResponse = response.data;
  //     const yearAndMonth = monthStart.split('-').slice(0, 2).join('-');

  //     let dataSpots = data.data;
  //     dataSpots = dataSpots
  //       .map((spot) => {
  //         return {
  //           ...spot,
  //           wager_data: spot.wager_data.filter((wager) => {
  //             return wager.month === yearAndMonth;
  //           })
  //         };
  //       })
  //       .filter((spot) => {
  //         return spot.wager_data.length > 0;
  //       });

  //     spots = dataSpots
  //       .sort((a, b) => {
  //         return b.wager_data[0].total_wager_usd - a.wager_data[0].total_wager_usd;
  //       })
  //       .splice(0, 10)
  //       .map((spot) => {
  //         return {
  //           username: spot.username,
  //           amount: Math.round(spot.wager_data[0].total_wager_usd),
  //           avatar: ''
  //         };
  //       });
  //   }
  // }

  // if (type === 'packdraw') {
  //   const prevSunday = previousSunday(new Date());
  //   const response = await axios.get(
  //     `https://packdraw.com/api/v1/affiliates/leaderboard?after=${format(
  //       prevSunday,
  //       'MM-dd-yyyy'
  //     )}&apiKey=${process.env.PACKDRAW_API_KEY}`,
  //     {
  //       validateStatus: () => {
  //         return true;
  //       }
  //     }
  //   );
  //   const data: PackdrawLeaderboardApiData = response.data;

  //   spots = data.leaderboard.splice(0, 10).map((spot) => {
  //     return {
  //       username: spot.username,
  //       amount: Math.round(spot.wagerAmount),
  //       avatar: spot.image
  //     };
  //   });
  // }

  // if (type === 'csgobig') {
  //   const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

  //   const response = await axios.get(
  //     `https://csgobig.com/api/partners/wagerStats/tckn3e9HBsu8HjjMAqBv33y?time=${start}`
  //   );

  //   const data: CsgoBigLeaderboardApiResponse = response.data;

  //   spots = data.results.splice(0, 10).map((spot) => {
  //     return {
  //       username: spot.name,
  //       amount: Math.round(spot.total),
  //       avatar: spot.img || ''
  //     };
  //   });
  // }

  if (type === 'roobet') {
    if (!process.env.ROOBET_API_KEY) {
      return {
        id: '0',
        type,
        spots: []
      };
    }

    const response = await axios.get(
      `https://roobetconnect.com/affiliate/v2/stats?userId=0401366b-7c9a-4edf-99e5-90db191b54ed&startDate=${new Date(
        monthStart
      ).toISOString()}`,
      {
        headers: {
          authorization: `Bearer ${process.env.NEW_ROOBET_API_KEY}`
        },
        validateStatus: () => {
          return true;
        }
      }
    );
    const data: RoobetLeaderboardSpot[] = response.data;
    if (typeof data === 'string') {
      return {
        id: '0',
        type,
        spots: []
      };
    }

    spots = data
      .sort((a, b) => {
        return b.wagered - a.wagered;
      })
      .filter((spot) => {
        return spot.username !== 'TCKgg';
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

  if (type === 'hypedrop') {
    if (!process.env.HYPEDROP_API_KEY) {
      return {
        id: '0',
        type,
        spots: []
      };
    }

    const graphqlQuery = {
      operationName: 'AffiliateEarningsByReferee',
      query: `query AffiliateEarningsByReferee {
        affiliateEarningsByReferee(
          affiliateUserId: 178,
          startDate: "${monthStart} 00:00:00",
          endDate: "${monthEnd} 00:00:00",
          orderBy: WAGERED_TOTAL_DESC,
          first: 10
        ){
          edges {
            node {
              commission,
              deposited,
              referee { displayName }
            }
          }
        }
      }`,
      variables: {}
    };

    const response = await axios.post(`https://api.hypedrop.com/graphql`, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${process.env.HYPEDROP_API_KEY}`
      },
      validateStatus: () => {
        return true;
      }
    });

    if (typeof response.data === 'string') {
      return {
        id: '0',
        type,
        spots: []
      };
    }

    const data = response.data.data.affiliateEarningsByReferee.edges.map((edge: any) => {
      return {
        username: edge.node.referee.displayName,
        amount: Math.round(edge.node.deposited),
        avatar: ''
      };
    });

    spots = data;
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
    roobet: await getLeaderboard('roobet'),
    hypedrop: await getLeaderboard('hypedrop')
  };
}
