import { Prisma } from 'database';
import classes from './LeaderboardPodiumBox.module.scss';
import Jagged from '../svg/Jagged';

function LeaderboardPodiumBox({
  leaderboardSpot
}: {
  leaderboardSpot: Prisma.LeaderboardSpotCreateInput;
}) {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
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
