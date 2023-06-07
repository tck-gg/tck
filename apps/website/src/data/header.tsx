import RewardsHeaderItem from '@/components/RewardsHeaderItem/RewardsHeaderItem';

interface HeaderItem {
  href: string;
  label: string;
  component?: React.ReactNode;
}

export const HEADER_ITEMS: HeaderItem[] = [
  { href: '/', label: 'HOME' },
  { href: '/affiliates', label: 'REWARDS', component: <RewardsHeaderItem /> },
  { href: '/leaderboards', label: 'LEADERBOARDS' },
  { href: '/videos', label: 'VIDEOS' },
  { href: '/store', label: 'STORE' }
];
