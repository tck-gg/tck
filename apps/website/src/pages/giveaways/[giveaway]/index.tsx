import { getGiveaway } from 'database';
import { IGiveaway } from 'types';

import Layout from '@/components/Layout/Layout';
import GiveawayInfobox from '@/components/GiveawayInfobox/GiveawayInfobox';

import classes from './giveaway.module.scss';
import GiveawayEntry from '@/components/GiveawayEntry/GiveawayEntry';

export async function getServerSideProps(ctx: any) {
  const { giveaway } = ctx.params;

  return {
    props: {
      giveaway: await getGiveaway(giveaway)
    }
  };
}

function GiveawayPage({ giveaway }: { giveaway: IGiveaway }) {
  return (
    <Layout className={classes.root}>
      <div className={classes.left}>
        <GiveawayInfobox giveaway={giveaway} />
      </div>
      <div className={classes.right}>
        <GiveawayEntry position={1} />
        <GiveawayEntry position={2} />
        <GiveawayEntry position={1} />
        <GiveawayEntry position={2} />
        <GiveawayEntry position={1} />
        <GiveawayEntry position={2} />
        <GiveawayEntry position={1} />
        <GiveawayEntry position={2} />
        <GiveawayEntry position={1} />
        <GiveawayEntry position={2} />
        <GiveawayEntry position={3} />
      </div>
    </Layout>
  );
}

export default GiveawayPage;
