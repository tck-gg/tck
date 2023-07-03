import clsx from 'clsx';
import { Prisma } from 'database';

import classes from './Leaderboard.module.scss';

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

function Leaderboard({ leaderboard }: { leaderboard: ILeaderboard }) {
  return (
    <div className={classes.root}>
      <table>
        <tr className={classes.header}>
          <th>User</th>
          <th>Wagered</th>
        </tr>
        {leaderboard.spots
          .map((spot, index) => {
            return (
              <tr className={classes.item} key={spot.id}>
                <td className={clsx(classes.grow, classes.user)}>
                  <span className={classes.spot}>#{index + 1}</span>
                  <span>{spot.username}</span>
                </td>
                <td className={clsx(classes.shrink, classes.amount)}>
                  ${spot.amount.toLocaleString('en-US')}
                </td>
              </tr>
            );
          })
          .splice(3, 10)}
      </table>
    </div>
  );
}

export default Leaderboard;
