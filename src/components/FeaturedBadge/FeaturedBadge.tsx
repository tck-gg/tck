import Gift from '../svg/Gift';

import classes from './FeaturedBadge.module.scss';

function FeaturedBadge() {
  return (
    <div className={classes.root}>
      <Gift />
      <p>FEATURED</p>
    </div>
  );
}

export default FeaturedBadge;
