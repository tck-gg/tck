import clsx from 'clsx';
import { Prisma } from 'database';
import { Avatar } from '@mantine/core';

import classes from './Leaderboard.module.scss';

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
                <td className={clsx(classes.shrink, classes.amount)}>
                  ${spot.amount.toLocaleString('en-US')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
