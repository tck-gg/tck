import { Prisma } from 'database';
import { Avatar } from '@mantine/core';

import Jagged from '../svg/Jagged';

import classes from './LeaderboardPodiumBox.module.scss';

function LeaderboardPodiumBox({
  leaderboardSpot
}: {
  leaderboardSpot: Prisma.LeaderboardSpotCreateInput;
}) {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Avatar
          style={{
            border: '4px solid #131320',
            backgroundColor: 'rgba(38, 38, 58, 0.75)',
            borderRadius: '50%'
          }}
          h={100}
          w={100}
        />
        <p className={classes.name}>{leaderboardSpot.username}</p>
      </div>
      <div className={classes.bottom}>
        <p className={classes.wagered}>${leaderboardSpot.amount.toLocaleString('en-US')} wagered</p>
        <Jagged className={classes.background} />
      </div>
    </div>
  );
}

export default LeaderboardPodiumBox;
