import { IAffiliate } from '@/types/affiliate';

import gamdomLogo from '../../public/img/affiliates/gamdom.png';
import stakeLogo from '../../public/img/affiliates/stake.png';
import hypeDropLogo from '../../public/img/affiliates/hypedrop.png';
import csgorollLogo from '../../public/img/affiliates/csgoroll.png';

import csgoempireLogo from '../../public/img/affiliates/csgoempire.png';
import datDropLogo from '../../public/img/affiliates/datdrop.png';
import rollbitLogo from '../../public/img/affiliates/rollbit.png';
import csgo500Logo from '../../public/img/affiliates/csgo500.png';

/**
 * The affiliates to display on the affiliates page.
 */
export const AFFILIATES: IAffiliate[] = [
  {
    image: gamdomLogo,
    reward: '15% Instant Rakeback',
    name: 'Gamdom',
    code: 'TCK',
    link: 'https://gamdom.com/',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: true
  },
  {
    image: stakeLogo,
    reward: '10% Rakeback & VIP Rewards',
    name: 'Stake',
    code: 'TCK',
    link: 'https://stake.com/',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: true
  },
  {
    image: hypeDropLogo,
    reward: '3 Free Boxes',
    name: 'Hypedrop',
    code: 'TCK',
    link: 'https://www.hypedrop.com/',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: true
  },
  {
    image: csgorollLogo,
    reward: '3 Free Cases and 5% Deposit Bonus',
    name: 'CSGORoll',
    code: 'TCK',
    link: 'https://www.csgoroll.com/',
    tags: ['CS:GO', 'Crypto', 'Battles', 'Originals'],
    featured: true
  },
  {
    image: csgoempireLogo,
    reward: '???',
    name: 'CSGOEmpire',
    code: 'TCK',
    link: 'https://csgoempire.com/',
    tags: ['CS:GO', 'Crypto', 'Battles', 'Originals'],
    featured: false
  },
  {
    image: datDropLogo,
    reward: '5% Deposit Bonus',
    name: 'DatDrop',
    code: 'TCK',
    link: 'https://datdrop.com/',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: rollbitLogo,
    reward: '10% Rakeback & VIP Rewards',
    name: 'Rollbit',
    code: 'TCK',
    link: 'https://rollbit.com/',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  },
  {
    image: csgo500Logo,
    reward: '10% Rakeback & VIP Rewards',
    name: '500 Casino',
    code: 'TCK',
    link: 'https://500.casino/',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto'],
    featured: false
  }
];
