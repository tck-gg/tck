import { Prisma } from 'database';
import { Avatar } from '@mantine/core';
import { LeaderboardRewardType } from 'types';
import Image from 'next/image';

import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';

import classes from './LeaderboardPodiumBox.module.scss';

import coinImage from '@/images/coin.png';
import roobetIcon from '@/images/affiliate/roobet-icon.png';

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
              {rewardType === 'roobet' && (
                <Image width={16} height={16} src={roobetIcon} alt='Roobet Icon' />
              )}
              <p className={classes.rewardText}>
                {['cash', 'csgobig'].includes(rewardType) && '$'}
                {rewardType === 'roobet' && [3750, 2250, 1500][position - 1]}
                {rewardType === 'csgobig' && [1875, 1125, 750][position - 1]}
              </p>
            </div>
          </JaggedBackgroundItem>
        )}
        <JaggedBackgroundItem fill='#242438' fullWidth>
          <p className={classes.wagered}>
            ${leaderboardSpot.amount.toLocaleString('en-US')}{' '}
            {rewardType === 'csgobig' ? 'deposited' : 'wagered'}
          </p>
        </JaggedBackgroundItem>
      </div>
    </div>
  );
}

export default LeaderboardPodiumBox;
