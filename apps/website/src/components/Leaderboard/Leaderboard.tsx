import clsx from 'clsx';
import { Prisma } from 'database';
import { Avatar } from '@mantine/core';
import Image from 'next/image';

import classes from './Leaderboard.module.scss';

import clashGemImage from '@/images/clash-gem.png';

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

function Leaderboard({ leaderboard }: { leaderboard: ILeaderboard }) {
  return (
    <div className={classes.root}>
      <table>
        <thead className={classes.header}>
          <tr>
            <th>User</th>
            <th>Wagered</th>
            {leaderboard.type === 'clash' && <th>Prize</th>}
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
                    {spot.username[0]}
                  </Avatar>
                  <span className={classes.name}>{spot.username}</span>
                </td>
                <td
                  className={clsx(
                    classes.shrink,
                    classes.amount,
                    leaderboard.type === 'clash' && classes.rightCol
                  )}
                >
                  ${spot.amount.toLocaleString('en-US')}
                </td>
                {leaderboard.type === 'clash' && (
                  <td className={clsx(classes.shrink, classes.amount)}>
                    <div className={classes.gemsAmount}>
                      <Image
                        width={12}
                        height={12}
                        src={clashGemImage}
                        alt='Clash Gem'
                        className={classes.clashGem}
                      />
                      <span>{index > 4 ? 5 : index === 3 ? 40 : index === 4 ? 10 : 0}</span>
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
