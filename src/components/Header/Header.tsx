import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import RewardsHeaderItem from '../RewardsHeaderItem/RewardsHeaderItem';

import { useAuth } from '@/hooks/auth';

import classes from './Header.module.scss';

import tckLogo from '../../../public/img/logo.png';
import Button from '../Button/Button';
import clsx from 'clsx';

interface HeaderItem {
  href: string;
  label: string;
  component?: React.ReactNode;
}

const headerItems: HeaderItem[] = [
  { href: '/', label: 'HOME' },
  { href: '/affiliates', label: 'REWARDS', component: <RewardsHeaderItem /> },
  { href: '/leaderboards', label: 'LEADERBOARDS' },
  { href: '/videos', label: 'VIDEOS' },
  { href: '/store', label: 'STORE' }
];

function Header() {
  const auth = useAuth();
  const router = useRouter();

  const { pathname } = useRouter();

  return (
    <div className={classes.root}>
      <div className={classes.headerGroup}>
        <Link href='/'>
          <Image width={77} height={35} src={tckLogo} alt='logo' style={{ objectFit: 'contain' }} />
        </Link>
      </div>
      <div className={classes.headerGroup}>
        {headerItems.map(({ href, label, component }) => {
          const isActive = pathname === href;

          return (
            <Link
              href={href}
              key={label}
              className={clsx(classes.link, isActive ? classes.active : '')}
            >
              {component || label}
            </Link>
          );
        })}
      </div>
      <div className={classes.headerGroup}>
        {auth.user ? (
          <div className={classes.profileGroup}>
            <p>Coins</p>
            <p>Profile</p>
          </div>
        ) : (
          <div className={classes.buttonGroup}>
            <Button
              variant='secondary'
              borderRadius={5}
              onClick={() => {
                router.push('/register');
              }}
            >
              Register
            </Button>
            <Button
              variant='primary'
              borderRadius={5}
              onClick={() => {
                router.push('/login');
              }}
            >
              Log in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
