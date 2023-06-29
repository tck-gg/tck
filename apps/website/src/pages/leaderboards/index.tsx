import Layout from '@/components/Layout/Layout';

import PageHeader from '@/components/PageHeader/PageHeader';

import { getAllLeaderboards } from 'database';

export async function getServerSideProps() {
  return {
    props: {
      leaderboards: await getAllLeaderboards()
    }
  };
}

function Leaderboards({ leaderboards }: { leaderboards: any }) {
  return (
    <Layout title='Leaderboards'>
      <PageHeader title='Leaderboards' />
      {JSON.stringify(leaderboards)}
    </Layout>
  );
}

export default Leaderboards;
