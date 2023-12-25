/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { getGiveaway } from 'database';
import { IGiveaway, IGiveawayEntry, ISafeGiveaway } from 'types';
import { faChevronLeft, faTicket } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mantine/core';

import Layout from '@/components/Layout/Layout';
import GiveawayInfobox from '@/components/giveaway/GiveawayInfobox/GiveawayInfobox';
import GiveawayEntry from '@/components/giveaway/GiveawayEntry/GiveawayEntry';
import IconBubble from '@/components/ui/IconBubble/IconBubble';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';

import { useAuth } from '@/hooks/auth';

import classes from './giveaway.module.scss';

export async function getServerSideProps(ctx: any) {
  const { giveaway } = ctx.params;
  const fetchedGiveaway = await getGiveaway(giveaway);

  if (!fetchedGiveaway) {
    return {
      redirect: {
        destination: `/giveaways`
      }
    };
  }

  return {
    props: {
      giveaway: fetchedGiveaway
    }
  };
}

function GiveawayPage({ giveaway }: { giveaway: ISafeGiveaway }) {
  const auth = useAuth();
  const [myEntry, setMyEntry] = useState(-1);
  const [winnerOverlayOpen, setWinnerOverlayOpen] = useState(!!giveaway.winner || false);

  useEffect(() => {
    setMyEntry(
      giveaway.entries.filter((entry) => {
        return entry.username === auth.user?.username;
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
      <div
        className={clsx(classes.right, winnerOverlayOpen && giveaway.winner && classes.withOverlay)}
      >
        {winnerOverlayOpen && giveaway.winner && (
          <div className={classes.winnerOverlay}>
            <div className={classes.giveawayWinner}>
              <Avatar
                style={{
                  border: '4px solid #131320',
                  backgroundColor: 'rgba(38, 38, 58, 0.75)',
                  borderRadius: '50%'
                }}
                h={100}
                w={100}
                className={classes.winnerAvatar}
              >
                {giveaway.winner.toUpperCase().split('').splice(0, 1)[0]}
              </Avatar>
              <p className={classes.winnerName}>{giveaway.winner}</p>
              <JaggedBackgroundItem fill='#26263A'>
                <p className={classes.winnerTicket}>
                  Ticket #
                  {(
                    giveaway.entries.filter((giveawayEntry) => {
                      return giveawayEntry.username === giveaway.winner;
                    })[0]?.slot + 1
                  ).toLocaleString('en-US')}
                </p>
              </JaggedBackgroundItem>
            </div>
            <div
              className={classes.viewAll}
              onClick={() => {
                setWinnerOverlayOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <p className={classes.viewAllText}>View All Entries</p>
            </div>
          </div>
        )}
        <div className={classes.entryWrapper}>
          {Array(giveaway.maxEntries)
            .fill(0)
            .map((entry, index) => {
              const theEntry = giveaway.entries.filter((giveawayEntry) => {
                return giveawayEntry.slot === index;
              })[0];

              return (
                <GiveawayEntry
                  position={index + 1}
                  display={
                    // wtf???
                    theEntry ? theEntry.username?.toUpperCase().split('').splice(0, 1)[0] : ''
                  }
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default GiveawayPage;
