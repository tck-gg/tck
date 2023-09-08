/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { getGiveaway } from 'database';
import { IGiveaway, IGiveawayEntry } from 'types';
import { faChevronLeft, faTicket } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Layout from '@/components/Layout/Layout';
import GiveawayInfobox from '@/components/GiveawayInfobox/GiveawayInfobox';
import GiveawayEntry from '@/components/GiveawayEntry/GiveawayEntry';
import IconBubble from '@/components/IconBubble/IconBubble';

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

function GiveawayPage({ giveaway }: { giveaway: IGiveaway }) {
  const auth = useAuth();
  const [myEntry, setMyEntry] = useState(-1);
  const [winnerOverlayOpen, setWinnerOverlayOpen] = useState(!!giveaway.winnerId || false);

  useEffect(() => {
    setMyEntry(
      giveaway.entries.filter((entry: IGiveawayEntry) => {
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
      <div
        className={clsx(classes.right, winnerOverlayOpen && giveaway.winner && classes.withOverlay)}
      >
        {winnerOverlayOpen && giveaway.winner && (
          <div className={classes.winnerOverlay}>
            <div className={classes.giveawayWinner}>
              <p className={classes.winnerName}>{giveaway.winner.displayName}</p>
              <p>
                {giveaway.entries.filter((giveawayEntry) => {
                  return giveawayEntry.userId === giveaway.winnerId;
                })[0].slot + 1}
              </p>
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
        {Array(giveaway.maxEntries)
          .fill(0)
          .map((entry, index) => {
            return (
              <GiveawayEntry
                position={index + 1}
                display={
                  giveaway.entries
                    .filter((giveawayEntry: IGiveawayEntry) => {
                      return giveawayEntry.slot === index;
                    })[0]
                    ?.user.username.toUpperCase()
                    .split('')
                    .splice(0, 1)[0]
                }
                key={index}
              />
            );
          })}
      </div>
    </Layout>
  );
}

export default GiveawayPage;
