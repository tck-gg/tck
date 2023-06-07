import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Button from '../Button/Button';
import HeaderProfileGroup from '../HeaderProfileGroup/HeaderProfileGroup';

import { HEADER_ITEMS } from '@/data/header';

import { useAuth } from '@/hooks/auth';

import classes from './HeaderBoxMobile.module.scss';

function HeaderBoxMobile({ ref }: { ref?: React.RefObject<HTMLDivElement> }) {
  const auth = useAuth();

  const router = useRouter();

  return (
    <motion.div
      className={classes.root}
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      transition={{ duration: 0.15, ease: 'easeOut', type: 'tween' }}
      ref={ref}
    >
      {auth.user && (
        <HeaderProfileGroup
          styles={{
            padding: '1em 1em 0.5em 1em'
          }}
        />
      )}
      {HEADER_ITEMS.map(({ href, label, component }) => {
        const isActive = router.pathname === href;

        return (
          <Link
            key={label}
            href={href}
            className={clsx(classes.link, isActive ? classes.active : '')}
          >
            {component || label}
          </Link>
        );
      })}
      {!auth.user && (
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
    </motion.div>
  );
}

export default HeaderBoxMobile;
