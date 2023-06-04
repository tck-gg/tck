import { IAffiliate } from '@/types/affiliate';

import gamdomLogo from '../../public/img/affiliates/gamdom.png';
import stakeLogo from '../../public/img/affiliates/stake.png';
import hypeDropLogo from '../../public/img/affiliates/hypedrop.png';
import csgorollLogo from '../../public/img/affiliates/csgoroll.png';

import datDropLogo from '../../public/img/affiliates/datdrop.png';
import rollbitLogo from '../../public/img/affiliates/rollbit.png';
import roobetLogo from '../../public/img/affiliates/roobet.png';
import csgo500Logo from '../../public/img/affiliates/csgo500.png';

/**
 * The affiliates to display on the affiliates page.
 */
export const AFFILIATES: IAffiliate[] = [
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
    featured: true
  },
  {
    image: stakeLogo,
    reward: '10% Rakeback & VIP Rewards',
    name: 'Stake',
    codes: [
      {
        code: 'TCK',
        link: 'https://stake.com/?c=TCK'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: true
  },
  {
    image: hypeDropLogo,
    reward: '3 Free Boxes',
    name: 'Hypedrop',
    codes: [
      {
        code: 'TCK',
        link: 'https://www.hypedrop.com/'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: true
  },
  {
    image: csgorollLogo,
    reward: '3 Free Cases and 5% Deposit Bonus',
    name: 'CSGORoll',
    codes: [
      {
        code: 'TCK',
        link: 'https://csgoroll.com/r/TCK'
      }
    ],
    tags: ['CS:GO', 'Crypto', 'Battles', 'Originals'],
    featured: true
  },
  {
    image: datDropLogo,
    reward: '5% Deposit Bonus',
    name: 'DatDrop',
    codes: [
      {
        code: 'TCK',
        link: 'https://datdrop.com/'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: roobetLogo,
    reward: 'Exclusive rewards and instant rakeback!',
    name: 'Roobet',
    codes: [
      {
        code: 'TCK',
        link: 'https://roobet.com/?ref=TCK'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: rollbitLogo,
    reward: '5% Rakeback & Daily/Weekly Cash Challenges',
    name: 'Rollbit',
    codes: [
      {
        code: 'TCK',
        link: 'https://rollbit.com/referral/TCK'
      },
      {
        code: 'Bonushunt',
        link: 'https://rollbit.com/referral/Bonushunt'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: csgo500Logo,
    reward: '10% Rakeback & VIP Rewards',
    name: '500 Casino',
    codes: [
      {
        code: 'TCK',
        link: 'https://csgo500.com/r/TCK'
      }
    ],
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  }
];
