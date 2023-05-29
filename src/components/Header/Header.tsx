import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import RewardsHeaderItem from '../RewardsHeaderItem/RewardsHeaderItem';

import classes from './Header.module.scss';

interface HeaderItem {
  href: string;
  label: string;
  component?: React.ReactNode;
}

const headerItems: HeaderItem[] = [
  { href: '/', label: 'HOME' },
  { href: '/videos', label: 'VIDEOS' },
  { href: '/stream', label: 'STREAM' },
  { href: '/rewards', label: 'REWARDS', component: <RewardsHeaderItem /> },
  { href: '/leaderboards', label: 'LEADERBOARDS' }
];

function Header() {
  const { pathname } = useRouter();

  return (
    <div className={classes.root}>
      <div className={classes.headerGroup}>
        <Link href='/'>
          <Image
            width={77}
            height={35}
            src='/img/logo.png'
            alt='logo'
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>
      <div className={classes.headerGroup}>
        {headerItems.map(({ href, label, component }) => {
          const isActive = pathname === href;

          return component ? (
            <Link href={href} key={label}>
              {component}
            </Link>
          ) : (
            <Link href={href} className={isActive ? classes.active : ''} key={label}>
              {label}
            </Link>
          );
        })}
      </div>
      <div className={classes.headerGroup}>
        {/* TODO: Need backend. */}
        <p>COINS</p>
        <p>PROFILE</p>
      </div>
    </div>
  );
}

export default Header;
