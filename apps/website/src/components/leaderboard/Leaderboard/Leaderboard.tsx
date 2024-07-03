import clsx from 'clsx';
import { Prisma } from 'database';
import { Avatar } from '@mantine/core';
import Image from 'next/image';

import classes from './Leaderboard.module.scss';

import coinImage from '@/images/coin.png';
import roobetIcon from '@/images/affiliate/roobet-icon.png';

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

function Leaderboard({ leaderboard }: { leaderboard: ILeaderboard }) {
  const hasPrize = leaderboard.type === 'roobet' || leaderboard.type === 'csgobig';

  return (
    <div className={classes.root}>
      <table>
        <thead className={classes.header}>
          <tr>
            <th>User</th>
            <th>Wagered</th>
            {hasPrize && <th>Prize</th>}
          </tr>
        </thead>
        <tbody>
          {leaderboard.spots.map((spot, index) => {
            return (
              <tr className={clsx(classes.item, index < 3 && classes.podium)} key={spot.id}>
                <td className={clsx(classes.grow, classes.user)}>
                  <span className={classes.spot}>#{index + 1}</span>
                  <Avatar
                    radius='xl'
                    style={{
                      border: '2px solid #131320',
                      backgroundColor: 'rgba(38, 38, 58, 0.75)',
                      display: 'inline-flex',
                      marginRight: '10px'
                    }}
                  >
                    {/[a-zA-Z0-9]/.test(spot.username.split('')[0])
                      ? spot.username.split('')[0]
                      : '?'}
                  </Avatar>
                  <span className={classes.name}>{spot.username}</span>
                </td>
                <td className={clsx(classes.shrink, classes.amount, hasPrize && classes.rightCol)}>
                  ${spot.amount.toLocaleString('en-US')}
                </td>
                {hasPrize && (
                  <td className={clsx(classes.shrink, classes.amount)}>
                    <div className={classes.gemsAmount}>
                      {leaderboard.type === 'csgobig' && (
                        <>
                          <Image
                            width={12}
                            height={12}
                            src={coinImage}
                            alt='TCK Coin'
                            className={classes.clashGem}
                          />
                          <span>{[500, 250, 100, 50, 25, 10, 10, 10, 10, 10][index]}</span>
                        </>
                      )}
                      {leaderboard.type === 'roobet' && (
                        <>
                          <Image
                            width={12}
                            height={12}
                            src={roobetIcon}
                            alt='Roobet Icon'
                            className={classes.clashGem}
                          />
                          <span>{[2500, 1500, 1000, 500, 250, 50, 50, 50, 50, 50][index]}</span>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
