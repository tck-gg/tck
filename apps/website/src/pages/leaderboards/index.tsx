/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Prisma, getAllLeaderboards } from 'database';
import { LeaderboardType, ThemedLeaderboard } from 'types';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import clsx from 'clsx';
import { nextSaturday, nextSunday } from 'date-fns';

import Layout from '@/components/Layout/Layout';

import PageHeader from '@/components/PageHeader/PageHeader';
import Leaderboard from '@/components/leaderboard/Leaderboard/Leaderboard';
import LeaderboardPodiumBox from '@/components/leaderboard/LeaderboardPodiumBox/LeaderboardPodiumBox';
import CountdownTimer from '@/components/ui/CountdownTimer/CountdownTimer';
import TabPillSwitch from '@/components/TabPillSwitch/TabPillSwitch';

import { useTheme } from '@/hooks/theme';
import { useCountdown } from '@/hooks/countdown';

import classes from './leaderboards.module.scss';

import roobetLogo from '../../images/affiliate/roobet.png';
import csgobigLogo from '../../images/affiliate/csgobig.png';

import bigcoinIcon from '@/images/affiliate/big-coin.png';
import { CSGOBIG_PRIZES_TOTAL, ROOBET_PRIZES_TOTAL } from '@/data/leaderboard';
import { commaNumber } from 'custom-util';

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

export async function getStaticProps() {
  return {
    props: {
      leaderboards: await getAllLeaderboards()
    },
    revalidate: 3600
  };
}

function Leaderboards({
  leaderboards
}: {
  leaderboards: { [key in LeaderboardType]: ILeaderboard };
}) {
  const now = new Date();
  const sunday = nextSunday(now);
  const saturday = nextSaturday(now);
  const sunday2 = nextSunday(sunday);

  const theme = useTheme();

  const [monthlyDays, monthlyHours, monthlyMinutes] = useCountdown(
    new Date(now.getFullYear(), now.getMonth() + 1, 1)
  );
  const [weeklyDays, weeklyHours, weeklyMinutes] = useCountdown(
    new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate())
  );
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<ThemedLeaderboard>('roobet');

  useEffect(() => {
    theme.setTheme('roobet');
  }, []);
  useEffect(() => {
    theme.setTheme(selectedLeaderboard);
  }, [selectedLeaderboard]);

  return (
    <Layout title='Leaderboards'>
      <div className={classes.root}>
        <PageHeader title='Leaderboards' />

        <div className={classes.top}>
          <TabPillSwitch
            tabs={[
              {
                image: roobetLogo,
                name: 'roobet'
              },
              {
                image: csgobigLogo,
                name: 'csgobig'
              }
            ]}
            activeTab={selectedLeaderboard}
            setActiveTab={(name: string) => {
              setSelectedLeaderboard(name as ThemedLeaderboard);
            }}
          />

          {selectedLeaderboard === 'roobet' && (
            <p className={classes.leaderboardsPromo}>
              ${commaNumber(ROOBET_PRIZES_TOTAL)} LEADERBOARD
            </p>
          )}
          {selectedLeaderboard === 'csgobig' && (
            <p className={classes.leaderboardsPromo}>
              <>
                <Image
                  src={bigcoinIcon}
                  alt='Big Coin'
                  width={48}
                  height={48}
                  style={{ verticalAlign: 'middle', marginRight: '4px' }}
                />
                {commaNumber(CSGOBIG_PRIZES_TOTAL)} LEADERBOARD
              </>
            </p>
          )}

          <p className={classes.codePromo}>
            {selectedLeaderboard === 'csgobig' ? 'Deposit' : 'Wager'} Under Code{' '}
            <span
              className={clsx(
                classes.code,
                selectedLeaderboard === 'roobet' && classes.roobetText,
                selectedLeaderboard === 'csgobig' && classes.csgobigText
              )}
            >
              TCK
            </span>
          </p>
        </div>

        {leaderboards[selectedLeaderboard].spots.length === 0 && (
          <p>There are no published leaderboards for this site.</p>
        )}

        {leaderboards[selectedLeaderboard].spots.length > 0 && (
          <>
            <div className={clsx(classes.tiltGroup, classes.hideOnMobile)}>
              {leaderboards[selectedLeaderboard].spots[1] && (
                <Tilt
                  tiltAngleXInitial={5}
                  tiltAngleYInitial={-7}
                  glareEnable
                  glareMaxOpacity={0.08}
                  glarePosition='bottom'
                  className={classes.tiltItem}
                  style={{
                    top: 50
                  }}
                >
                  <LeaderboardPodiumBox
                    leaderboardSpot={leaderboards[selectedLeaderboard].spots[1]}
                    position={2}
                    rewardType={selectedLeaderboard}
                  />
                </Tilt>
              )}
              {leaderboards[selectedLeaderboard].spots[0] && (
                <Tilt
                  tiltAngleXInitial={5}
                  tiltAngleYInitial={9}
                  glareEnable
                  glareMaxOpacity={0.08}
                  glarePosition='bottom'
                  className={classes.tiltItem}
                  style={{
                    top: 0
                  }}
                >
                  <LeaderboardPodiumBox
                    leaderboardSpot={leaderboards[selectedLeaderboard].spots[0]}
                    position={1}
                    rewardType={selectedLeaderboard}
                  />
                </Tilt>
              )}
              {leaderboards[selectedLeaderboard].spots[2] && (
                <Tilt
                  tiltAngleXInitial={9}
                  tiltAngleYInitial={9}
                  glareEnable
                  glareMaxOpacity={0.08}
                  glarePosition='bottom'
                  className={classes.tiltItem}
                  style={{
                    top: 75
                  }}
                >
                  <LeaderboardPodiumBox
                    leaderboardSpot={leaderboards[selectedLeaderboard].spots[2]}
                    position={3}
                    rewardType={selectedLeaderboard}
                  />
                </Tilt>
              )}
            </div>

            <div className={clsx(classes.timerWrapper, classes.hideOnMobile)}>
              {selectedLeaderboard === 'csgobig' && (
                <CountdownTimer days={monthlyDays} hours={monthlyHours} minutes={monthlyMinutes} />
              )}
              {selectedLeaderboard === 'roobet' && (
                <CountdownTimer days={monthlyDays} hours={monthlyHours} minutes={monthlyMinutes} />
              )}
            </div>

            {leaderboards[selectedLeaderboard].spots.length && (
              <Leaderboard leaderboard={leaderboards[selectedLeaderboard]} />
            )}

            {selectedLeaderboard === 'roobet' && (
              <p className={classes.disclaimer}>
                Any table game wager abuse that Roobet detects is subject to disqualification. For
                example: $5-$100 wager per Blackjack hand and throughout the leaderboard the user
                performed 100,000+ bets, opposite betting on roulette/baccarat, etc.
              </p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Leaderboards;
