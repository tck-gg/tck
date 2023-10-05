import { Prisma } from 'database';
import { Avatar } from '@mantine/core';
import { LeaderboardRewardType } from 'types';

import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';

import classes from './LeaderboardPodiumBox.module.scss';

import clashGemImage from '@/images/clash-gem.png';
import Image from 'next/image';

function LeaderboardPodiumBox({
  leaderboardSpot,
  position,
  rewardType
}: {
  leaderboardSpot: Prisma.LeaderboardSpotCreateInput;
  position: 1 | 2 | 3;
  rewardType: LeaderboardRewardType;
}) {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.avatarGroup}>
          <Avatar
            style={{
              border: '4px solid #131320',
              backgroundColor: 'rgba(38, 38, 58, 0.75)',
              borderRadius: '50%'
            }}
            h={100}
            w={100}
            src={leaderboardSpot?.avatar}
          />
          <p>#{position}</p>
        </div>
        <p className={classes.name}>{leaderboardSpot.username}</p>
      </div>
      <div className={classes.bottom}>
        {rewardType !== 'none' && (
          <JaggedBackgroundItem fill='#0b0c17' fullWidth>
            <div className={classes.reward}>
              {rewardType === 'clash' && (
                <Image width={16} height={16} src={clashGemImage} alt='Clash Gem' />
              )}
              <p className={classes.rewardText}>
                {rewardType === 'cash' && '$'}
                {rewardType === 'clash' && [500, 250, 100][position - 1]}
              </p>
            </div>
          </JaggedBackgroundItem>
        )}
        <JaggedBackgroundItem fill='#242438' fullWidth>
          <p className={classes.wagered}>
            ${leaderboardSpot.amount.toLocaleString('en-US')} wagered
          </p>
        </JaggedBackgroundItem>
      </div>
    </div>
  );
}

export default LeaderboardPodiumBox;
