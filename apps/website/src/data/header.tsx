import HeaderItemRewards from '@/components/HeaderItemRewards/HeaderItemRewards';

interface HeaderItem {
  href?: string;
  label: string;
  component?: React.ReactNode;
}

export const HEADER_ITEMS: HeaderItem[] = [
  { href: '/', label: 'HOME' },
  { label: 'REWARDS', component: <HeaderItemRewards /> },
  { href: '/leaderboards', label: 'LEADERBOARDS' },
  { href: '/videos', label: 'VIDEOS' },
  { href: '/store', label: 'STORE' }
];
