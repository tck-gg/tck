import clsx from 'clsx';
import { Prisma } from 'database';
import { Avatar } from '@mantine/core';
import Image from 'next/image';

import classes from './Leaderboard.module.scss';

import roobetIcon from '@/images/affiliate/roobet-icon.png';
import bigcoinIcon from '@/images/affiliate/big-coin.png';

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

function Leaderboard({ leaderboard }: { leaderboard: ILeaderboard }) {
  const hasPrize = leaderboard.type === 'roobet' || leaderboard.type === 'csgobig';

  return (
    <div className={classes.root}>
      <table>
        <thead className={classes.header}>
          <tr>
            <th>User</th>
            <th>{leaderboard.type === 'csgobig' ? 'Deposited' : 'Wagered'}</th>
            {hasPrize && <th>Prize</th>}
          </tr>
        </thead>
        <tbody>
          {leaderboard.spots.map((spot, index) => {
            return (
              <tr className={clsx(classes.item, index < 3 && classes.podium)} key={spot.id}>
                <td className={clsx(classes.grow, classes.user)}>
                  <span className={classes.spot}>#{index + 1}</span>
                  <Avatar
                    radius='xl'
                    style={{
                      border: '2px solid #131320',
                      backgroundColor: 'rgba(38, 38, 58, 0.75)',
                      display: 'inline-flex',
                      marginRight: '10px'
                    }}
                  >
                    {/[a-zA-Z0-9]/.test(spot.username.split('')[0])
                      ? spot.username.split('')[0]
                      : '?'}
                  </Avatar>
                  <span className={classes.name}>{spot.username}</span>
                </td>
                <td className={clsx(classes.shrink, classes.amount, hasPrize && classes.rightCol)}>
                  ${spot.amount.toLocaleString('en-US')}
                </td>
                {hasPrize && (
                  <td className={clsx(classes.shrink, classes.amount)}>
                    <div className={classes.gemsAmount}>
                      {leaderboard.type === 'roobet' && (
                        <>
                          <Image
                            width={12}
                            height={12}
                            src={roobetIcon}
                            alt='Roobet Icon'
                            className={classes.clashGem}
                          />
                          <span>
                            {[5625, 3375, 2250, 1125, 825, 600, 450, 375, 225, 150][index]}
                          </span>
                        </>
                      )}
                      {leaderboard.type === 'csgobig' && (
                        <>
                          <Image
                            width={12}
                            height={12}
                            src={bigcoinIcon}
                            alt='Big Coin Icon'
                            className={classes.clashGem}
                          />
                          <span>{[1875, 1125, 750, 375, 275, 200, 150, 125, 75, 50][index]}</span>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
