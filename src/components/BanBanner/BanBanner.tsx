import classes from './BanBanner.module.scss';

import { useAuth } from '@/hooks/auth';

function BanBanner() {
  const auth = useAuth();

  return auth.user?.isBanned ? (
    <div className={classes.root}>
      <p className={classes.big}>
        Your account has been <strong className={classes.glow}>restricted</strong>!
      </p>
      <p className={classes.small}>
        <strong>
          You will be unable to earn coins, use the shop, or participate in any giveaways or
          raffles.
        </strong>
        You may appeal this decision at any time by sending us an email at{' '}
        <strong>bans@tck.gg</strong>.
      </p>
    </div>
  ) : null;
}

export default BanBanner;
