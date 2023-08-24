import { useState } from 'react';
import { Prisma, getAllLeaderboards } from 'database';
import { LeaderboardType } from 'types';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import clsx from 'clsx';

import Layout from '@/components/Layout/Layout';

import PageHeader from '@/components/PageHeader/PageHeader';
import Leaderboard from '@/components/Leaderboard/Leaderboard';
import LeaderboardPodiumBox from '@/components/LeaderboardPodiumBox/LeaderboardPodiumBox';

import classes from './leaderboards.module.scss';

import gamdomLogo from '../../images/affiliate/gamdom.png';
import stakeLogo from '../../images/affiliate/stake.png';
import hypeDropLogo from '../../images/affiliate/hypedrop.png';
import csgorollLogo from '../../images/affiliate/csgoroll.png';
import clashLogo from '../../images/affiliate/clash.png';

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

        <div className={classes.affiliates}>
          <Image
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
            src={csgorollLogo}
            alt='CSGORoll'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('csgoroll');
            }}
            className={clsx(
              classes.affiliate,
              selectedLeaderboard === 'csgoroll' && classes.selected
            )}
          />
          <Image
            src={hypeDropLogo}
            alt='HypeDrop'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('hypedrop');
            }}
            className={clsx(
              classes.affiliate,
              selectedLeaderboard === 'hypedrop' && classes.selected
            )}
          />
          <Image
            src={clashLogo}
            alt='Clash'
            width={100}
            height={60}
            style={{
              objectFit: 'contain'
            }}
            onClick={() => {
              setSelectedLeaderboard('clash');
            }}
            className={clsx(classes.affiliate, selectedLeaderboard === 'clash' && classes.selected)}
          />
        </div>

        {leaderboards[selectedLeaderboard].spots.length > 0 && (
          <>
            <div className={classes.tiltGroup}>
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
                />
              </Tilt>
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
                />
              </Tilt>
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
                />
              </Tilt>
            </div>

            <Leaderboard leaderboard={leaderboards[selectedLeaderboard]} />
          </>
        )}
      </div>
    </Layout>
  );
}

export default Leaderboards;
