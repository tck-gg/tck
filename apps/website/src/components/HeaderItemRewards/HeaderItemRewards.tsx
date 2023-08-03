import { useRewardsContextMenu } from '@/hooks/rewards-context-menu';

import HeaderItemRewardsContextMenu from '../HeaderItemRewardsContextMenu/HeaderItemRewardsContextMenu';

import Dropdown from '../svg/Dropdown';
import Gift from '../svg/Gift';

import classes from './HeaderItemRewards.module.scss';
import { AnimatePresence } from 'framer-motion';

function HeaderItemRewards() {
  const rewardsContextMenu = useRewardsContextMenu();

  function handleClick() {
    rewardsContextMenu.toggle();
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <Gift />
      <span>REWARDS</span>
      <Dropdown />
      <AnimatePresence>
        {rewardsContextMenu.isOpen && <HeaderItemRewardsContextMenu />}
      </AnimatePresence>
    </div>
  );
}

export default HeaderItemRewards;
