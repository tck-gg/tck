import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import HeaderBoxMobile from '../HeaderBoxMobile/HeaderBoxMobile';
import Button from '../Button/Button';
import HeaderProfileGroup from '../HeaderProfileGroup/HeaderProfileGroup';

import { HEADER_ITEMS } from '@/data/header';

import { useAuth } from '@/hooks/auth';

import classes from './Header.module.scss';

import tckLogo from '@/images/logo.png';

function Header() {
  const auth = useAuth();
  const router = useRouter();

  const boxRef = useRef<HTMLDivElement>(null);
  const [mobileBoxOpen, setMobileBoxOpen] = useState(false);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setMobileBoxOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
  });

  return (
    <div className={classes.root}>
      <div className={classes.headerGroup}>
        <Link href='/'>
          <Image width={77} height={35} src={tckLogo} alt='logo' style={{ objectFit: 'contain' }} />
        </Link>
      </div>
      <div className={classes.headerGroup}>
        {HEADER_ITEMS.map(({ href, label, component }) => {
          const isActive = router.pathname === href;

          return href ? (
            <Link
              href={href}
              key={label}
              className={clsx(
                classes.link,
                isActive ? classes.active : '',
                !href && classes.component
              )}
            >
              {component || label}
            </Link>
          ) : (
            <span
              key={label}
              className={clsx(classes.link, isActive ? classes.active : '', classes.component)}
            >
              {component || label}
            </span>
          );
        })}
      </div>
      <div className={classes.headerGroup}>
        {auth.user ? (
          <HeaderProfileGroup />
        ) : (
          <div className={classes.buttonGroup}>
            {/* <Button
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
            </Button> */}
          </div>
        )}
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className={classes.hamburger}
        onClick={() => {
          setMobileBoxOpen(!mobileBoxOpen);
        }}
      />
      <div ref={boxRef}>
        <AnimatePresence>{mobileBoxOpen && <HeaderBoxMobile />}</AnimatePresence>
      </div>
    </div>
  );
}

export default Header;
