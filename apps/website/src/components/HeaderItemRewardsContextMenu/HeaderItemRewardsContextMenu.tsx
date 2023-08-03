import { motion } from 'framer-motion';
import { useRef } from 'react';

import { useRewardsContextMenu } from '@/hooks/rewards-context-menu';

import HeaderItemRewardsContextMenuButton from '../HeaderItemRewardsContextMenuButton/HeaderItemRewardsContextMenuButton';

import classes from './HeaderItemRewardsContextMenu.module.scss';

function HeaderItemRewardsContextMenu() {
  const rewardsContextMenu = useRewardsContextMenu();

  const contextMenuRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className={classes.root}
      key='rewards-context-menu'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      ref={contextMenuRef}
    >
      <div className={classes.content}>
        <HeaderItemRewardsContextMenuButton href='/affiliates'>
          Affiliates
        </HeaderItemRewardsContextMenuButton>
        <HeaderItemRewardsContextMenuButton href='/raffles'>
          Raffles
        </HeaderItemRewardsContextMenuButton>
        <HeaderItemRewardsContextMenuButton href='/giveaways'>
          Giveaways
        </HeaderItemRewardsContextMenuButton>
      </div>
      <svg
        width='18'
        height='14'
        viewBox='0 0 18 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={classes.arrow}
      >
        <path
          d='M8.18294 1.15788C8.58135 0.593287 9.41865 0.593287 9.81706 1.15788L17.4138 11.9234C17.8812 12.5859 17.4075 13.5 16.5967 13.5H1.40328C0.592528 13.5 0.118776 12.5859 0.586218 11.9234L8.18294 1.15788Z'
          fill='#15142B'
        />
      </svg>
    </motion.div>
  );
}

export default HeaderItemRewardsContextMenu;
