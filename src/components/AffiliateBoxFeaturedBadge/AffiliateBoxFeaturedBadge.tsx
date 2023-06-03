import Gift from '../svg/Gift';

import classes from './AffiliateBoxFeaturedBadge.module.scss';

function AffiliateBoxFeaturedBadge() {
  return (
    <div className={classes.root}>
      <Gift />
      <p>FEATURED</p>
    </div>
  );
}

export default AffiliateBoxFeaturedBadge;
