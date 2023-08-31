import { Prisma } from 'database';
import { Avatar } from '@mantine/core';

import Jagged from '../svg/Jagged';

import classes from './LeaderboardPodiumBox.module.scss';

function LeaderboardPodiumBox({
  leaderboardSpot,
  position
}: {
  leaderboardSpot: Prisma.LeaderboardSpotCreateInput;
  position: 1 | 2 | 3;
}) {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.avatarGroup}>
          <Avatar
            style={{
              border: '4px solid #131320',
              backgroundColor: 'rgba(38, 38, 58, 0.75)',
              borderRadius: '50%'
            }}
            h={100}
            w={100}
            src={leaderboardSpot?.avatar}
          />
          <p>#{position}</p>
        </div>
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
