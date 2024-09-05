import { IAffiliate } from '@/types/affiliate';

import gamdomLogo from '../images/affiliate/gamdom.png';
import stakeLogo from '../images/affiliate/stake.png';
import hypeDropLogo from '../images/affiliate/hypedrop.png';
import csgorollLogo from '../images/affiliate/csgoroll.png';
import packDrawLogo from '../images/affiliate/packdraw.png';
// import datDropLogo from '../images/affiliate/datdrop.png';
// import rollbitLogo from '../images/affiliate/rollbit.png';
import roobetLogo from '../images/affiliate/roobet.png';
// import csgo500Logo from '../images/affiliate/csgo500.png';
import shuffleLogo from '../images/affiliate/shuffle.png';
import howlLogo from '../images/affiliate/howl.png';
import clashLogo from '../images/affiliate/clash.png';

/**
 * The affiliates to display on the affiliates page.
 */
export const AFFILIATES: IAffiliate[] = [
  {
    image: roobetLogo,
    reward: '$15 Reloads + $6,000 Leaderboard + Great ROOWARD System + VIP TRANSFERS',
    name: 'Roobet',
    codes: [
      {
        code: 'TCK',
        link: 'https://roobet.com/?ref=TCK'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: true
  },
  {
    image: packDrawLogo,
    reward: 'FREE 3 PACKS 5% DEPOSIT BONUS',
    name: 'PackDraw',
    codes: [
      {
        code: 'TCK',
        link: 'https://packdraw.com/?ref=TCK'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: true
  },
  {
    image: gamdomLogo,
    reward: '15% Instant Rakeback',
    name: 'Gamdom',
    codes: [
      {
        code: 'TCK',
        link: 'https://gamdom.com/landing?tag1=TCK'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: stakeLogo,
    reward: '$15 Reload',
    name: 'Stake',
    codes: [
      {
        code: 'TCK',
        link: 'https://stake.com/?c=TCK'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: hypeDropLogo,
    reward: 'FREE CASES and 5% DEPOSIT BONUS',
    name: 'Hypedrop',
    codes: [
      {
        code: 'TCK',
        link: 'https://www.hypedrop.com/'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: csgorollLogo,
    reward: '3 FREE CASES AND 5% DEPOSIT BONUS',
    name: 'CSGORoll',
    codes: [
      {
        code: 'TCK',
        link: 'https://csgoroll.com/r/TCK'
      }
    ],
    tags: ['CS:GO', 'Crypto', 'Battles', 'Originals'],
    featured: false
  },
  // {
  //   image: rollbitLogo,
  //   reward: '5% Rakeback & Daily/Weekly Cash Challenges',
  //   name: 'Rollbit',
  //   codes: [
  //     {
  //       code: 'TCK',
  //       link: 'https://rollbit.com/referral/TCK'
  //     }
  //   ],
  //   tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
  //   featured: false
  // }
  // {
  //   image: csgo500Logo,
  //   reward: '10% Rakeback & VIP Rewards',
  //   name: '500 Casino',
  //   codes: [
  //     {
  //       code: 'TCK',
  //       link: 'https://csgo500.com/r/TCK'
  //     }
  //   ],
  //   tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
  //   featured: false
  // },
  {
    image: shuffleLogo,
    reward: 'INSTANT DEPOSIT BONUS - GREAT REWARD SYSTEM - SPECIALIZED REWARDS',
    name: 'Shuffle',
    codes: [
      {
        code: 'TCK',
        link: 'https://shuffle.com/'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: howlLogo,
    reward: 'GREAT REWARD SYSTEM - SLOT BATTLES',
    name: 'Howl.GG',
    codes: [
      {
        code: 'TCK',
        link: 'https://howl.gg/'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: clashLogo,
    reward: '5% DEPOSIT BONUS and FREE CASE',
    name: 'Clash.gg',
    codes: [
      {
        code: 'TCK',
        link: 'https://clash.gg/'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  }
];
