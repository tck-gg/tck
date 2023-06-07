import { Avatar } from '@mantine/core';

import CoinsDisplay from '../CoinsDisplay/CoinsDisplay';

import { useAuth } from '@/hooks/auth';

import classes from './HeaderProfileGroup.module.scss';

function HeaderProfileGroup({ styles }: { styles?: React.CSSProperties }) {
  const auth = useAuth();

  return auth.user ? (
    <div className={classes.root} style={styles}>
      <CoinsDisplay />
      <Avatar
        radius='xl'
        style={{
          border: '2px solid #131320',
          backgroundColor: 'rgba(38, 38, 58, 0.75)',
          cursor: 'pointer'
        }}
      >
        {(auth.user.displayName || auth.user.username)
          .split(' ')
          .splice(0, 2)
          .map((name) => {
            return name[0];
          })
          .join('')}
      </Avatar>
    </div>
  ) : null;
}

export default HeaderProfileGroup;
