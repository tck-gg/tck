import { Prisma, getAllLeaderboards } from 'database';

import Layout from '@/components/Layout/Layout';

import PageHeader from '@/components/PageHeader/PageHeader';
import { useState } from 'react';
import { LeaderboardType } from 'types';

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

export async function getServerSideProps() {
  return {
    props: {
      leaderboards: await getAllLeaderboards()
    }
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
      <br />
      {JSON.stringify(leaderboards[selectedLeaderboard])}
    </Layout>
  );
}

export default Leaderboards;
