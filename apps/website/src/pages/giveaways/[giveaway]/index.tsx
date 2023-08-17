/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { getGiveaway } from 'database';
import { IGiveaway } from 'types';

import Layout from '@/components/Layout/Layout';
import GiveawayInfobox from '@/components/GiveawayInfobox/GiveawayInfobox';
import GiveawayEntry from '@/components/GiveawayEntry/GiveawayEntry';

import { useAuth } from '@/hooks/auth';

import classes from './giveaway.module.scss';
import IconBubble from '@/components/IconBubble/IconBubble';
import { faTicket } from '@fortawesome/free-solid-svg-icons';

export async function getServerSideProps(ctx: any) {
  const { giveaway } = ctx.params;

  return {
    props: {
      giveaway: await getGiveaway(giveaway)
    }
  };
}

function GiveawayPage({ giveaway }: { giveaway: IGiveaway }) {
  const auth = useAuth();
  const [myEntry, setMyEntry] = useState(-1);

  useEffect(() => {
    setMyEntry(
      giveaway.entries.filter((entry) => {
        return entry.userId === auth.user?.id;
      })[0]?.slot + 1 || -1
    );
  }, [auth]);

  return (
    <Layout className={classes.root}>
      <div className={classes.left}>
        <GiveawayInfobox giveaway={giveaway} />
        {myEntry > -1 && (
          <div className={classes.mySlot}>
            <div className={classes.mySlotLeft}>
              <IconBubble icon={faTicket} size={22} />
              <p>My Entry</p>
            </div>
            <div className={classes.mySlotRight}>
              <p>#{myEntry}</p>
            </div>
          </div>
        )}
      </div>
      <div className={classes.right}>
        {JSON.stringify(giveaway.entries)}
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
