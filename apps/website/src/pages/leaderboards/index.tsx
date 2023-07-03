import { useState } from 'react';
import { Prisma, getAllLeaderboards } from 'database';
import { LeaderboardType } from 'types';
import Tilt from 'react-parallax-tilt';

import Layout from '@/components/Layout/Layout';

import PageHeader from '@/components/PageHeader/PageHeader';
import Leaderboard from '@/components/Leaderboard/Leaderboard';
import LeaderboardPodiumBox from '@/components/LeaderboardPodiumBox/LeaderboardPodiumBox';

import classes from './leaderboards.module.scss';

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

export async function getStaticProps() {
  return {
    props: {
      leaderboards: await getAllLeaderboards()
    },
    revalidate: 86400
  };
}

function Leaderboards({
  leaderboards
}: {
  leaderboards: { [key in LeaderboardType]: ILeaderboard };
}) {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<LeaderboardType>('stake');

  return (
    <Layout title='Leaderboards'>
      <div className={classes.root}>
        <PageHeader title='Leaderboards' />
        <select
          onChange={(e) => {
            setSelectedLeaderboard(e.target.value as LeaderboardType);
          }}
        >
          <option value='stake'>Stake</option>
          <option value='gamdom'>Gamdom</option>
          <option value='csgoroll'>CSGORoll</option>
          <option value='hypedrop'>HypeDrop</option>
        </select>

        <div className={classes.tiltGroup}>
          <Tilt
            tiltAngleXInitial={5}
            tiltAngleYInitial={-7}
            className={classes.tiltItem}
            style={{
              top: 50
            }}
          >
            <LeaderboardPodiumBox leaderboardSpot={leaderboards[selectedLeaderboard].spots[1]} />
          </Tilt>
          <Tilt
            tiltAngleXInitial={5}
            tiltAngleYInitial={9}
            className={classes.tiltItem}
            style={{
              top: 0
            }}
          >
            <LeaderboardPodiumBox leaderboardSpot={leaderboards[selectedLeaderboard].spots[0]} />
          </Tilt>
          <Tilt
            tiltAngleXInitial={9}
            tiltAngleYInitial={9}
            className={classes.tiltItem}
            style={{
              top: 75
            }}
          >
            <LeaderboardPodiumBox leaderboardSpot={leaderboards[selectedLeaderboard].spots[2]} />
          </Tilt>
        </div>

        <Leaderboard leaderboard={leaderboards[selectedLeaderboard]} />
      </div>
    </Layout>
  );
}

export default Leaderboards;
