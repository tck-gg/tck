/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Prisma, getAllLeaderboards } from 'database';
import { LeaderboardType } from 'types';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import clsx from 'clsx';
import { nextSaturday, nextSunday } from 'date-fns';

import Layout from '@/components/Layout/Layout';

import PageHeader from '@/components/PageHeader/PageHeader';
import Leaderboard from '@/components/leaderboard/Leaderboard/Leaderboard';
import LeaderboardPodiumBox from '@/components/leaderboard/LeaderboardPodiumBox/LeaderboardPodiumBox';
import CountdownTimer from '@/components/ui/CountdownTimer/CountdownTimer';

import { useTheme } from '@/hooks/theme';
import { useCountdown } from '@/hooks/countdown';

import classes from './leaderboards.module.scss';

import gamdomLogo from '../../images/affiliate/gamdom.png';
import stakeLogo from '../../images/affiliate/stake.png';
import csgobigLogo from '../../images/affiliate/csgobig.png';
import packDrawLogo from '../../images/affiliate/packdraw.png';
import roobetLogo from '../../images/affiliate/roobet.png';

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
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<LeaderboardType>('csgobig');

  useEffect(() => {
    theme.setTheme('csgobig');
  }, []);
  useEffect(() => {
    if (selectedLeaderboard === 'stake' || selectedLeaderboard === 'packdraw') {
      theme.setTheme('default');
      return;
    }
    theme.setTheme(selectedLeaderboard);
  }, [selectedLeaderboard]);

  return (
    <Layout title='Leaderboards'>
      <div className={classes.root}>
        <PageHeader title='Leaderboards' />

        <div className={classes.affiliates}>
          <Image
            src={csgobigLogo}
            alt='CSGOBIG'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('csgobig');
            }}
            className={clsx(
              classes.affiliate,
              selectedLeaderboard === 'csgobig' && classes.selected
            )}
          />
          {/* <Image
            src={stakeLogo}
            alt='Stake'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('stake');
            }}
            className={clsx(classes.affiliate, selectedLeaderboard === 'stake' && classes.selected)}
          /> */}
          <Image
            src={packDrawLogo}
            alt='PackDraw'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('packdraw');
            }}
            className={clsx(
              classes.affiliate,
              selectedLeaderboard === 'packdraw' && classes.selected
            )}
          />
          <Image
            src={gamdomLogo}
            alt='Gamdom'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('gamdom');
            }}
            className={clsx(
              classes.affiliate,
              selectedLeaderboard === 'gamdom' && classes.selected
            )}
          />
          <Image
            src={roobetLogo}
            alt='Roobet'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('roobet');
            }}
            className={clsx(
              classes.affiliate,
              selectedLeaderboard === 'roobet' && classes.selected
            )}
          />
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
                    rewardType={
                      selectedLeaderboard === 'clash'
                        ? 'clash'
                        : selectedLeaderboard === 'csgobig'
                        ? 'csgobig'
                        : 'none'
                    }
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
                    rewardType={
                      selectedLeaderboard === 'clash'
                        ? 'clash'
                        : selectedLeaderboard === 'csgobig'
                        ? 'csgobig'
                        : 'none'
                    }
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
                    rewardType={
                      selectedLeaderboard === 'clash'
                        ? 'clash'
                        : selectedLeaderboard === 'csgobig'
                        ? 'csgobig'
                        : 'none'
                    }
                  />
                </Tilt>
              )}
            </div>

            <div className={clsx(classes.timerWrapper, classes.hideOnMobile)}>
              {selectedLeaderboard === 'csgobig' && (
                <CountdownTimer days={monthlyDays} hours={monthlyHours} minutes={monthlyMinutes} />
              )}
              {(selectedLeaderboard === 'stake' || selectedLeaderboard === 'gamdom') && (
                <CountdownTimer days={monthlyDays} hours={monthlyHours} minutes={monthlyMinutes} />
              )}
              {selectedLeaderboard === 'packdraw' && (
                <CountdownTimer days={weeklyDays} hours={weeklyHours} minutes={weeklyMinutes} />
              )}
            </div>

            {leaderboards[selectedLeaderboard].spots.length > 3 && (
              <Leaderboard leaderboard={leaderboards[selectedLeaderboard]} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Leaderboards;
