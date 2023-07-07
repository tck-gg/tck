import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import { getAllGiveaways } from 'database';
import { IGiveaway } from 'types';

export async function getServerSideProps() {
  return {
    props: {
      giveaways: await getAllGiveaways()
    }
  };
}

function Giveaways({
  giveaways
}: {
  giveaways: {
    currentGiveaways: IGiveaway[];
    pastGiveaways: IGiveaway[];
  };
}) {
  return (
    <Layout title='Giveaways'>
      <PageHeader title='Giveaways' />
      <p>{JSON.stringify(giveaways)}</p>
    </Layout>
  );
}

export default Giveaways;
