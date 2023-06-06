import Dropdown from '../svg/Dropdown';
import Gift from '../svg/Gift';

import classes from './RewardsHeaderItem.module.scss';

function RewardsHeaderItem() {
  function handleClick() {
    // TODO: Implement.
  }

  return (
    <div className={classes.root}>
      <Gift />
      <span>REWARDS</span>
      <Dropdown />
    </div>
  );
}

export default RewardsHeaderItem;
