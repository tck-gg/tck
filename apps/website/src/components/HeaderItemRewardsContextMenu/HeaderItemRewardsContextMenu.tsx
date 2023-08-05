import { motion } from 'framer-motion';
import ClickAwayListener from 'react-click-away-listener';
import { useRouter } from 'next/router';

import { useRewardsContextMenu } from '@/hooks/rewards-context-menu';

import { useAgeVerification } from '@/hooks/age-verification';
import HeaderItemRewardsContextMenuButton from '../HeaderItemRewardsContextMenuButton/HeaderItemRewardsContextMenuButton';

import classes from './HeaderItemRewardsContextMenu.module.scss';

function HeaderItemRewardsContextMenu() {
  const router = useRouter();
  const rewardsContextMenu = useRewardsContextMenu();
  const ageVerification = useAgeVerification();

  return (
    <ClickAwayListener onClickAway={rewardsContextMenu.close}>
      <motion.div
        className={classes.root}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <div className={classes.content}>
          <HeaderItemRewardsContextMenuButton
            onClick={() => {
              ageVerification.verify(() => {
                router.push('/affiliates');
                rewardsContextMenu.close();
              });
            }}
            href='/affiliates'
          >
            Affiliates
          </HeaderItemRewardsContextMenuButton>
          <HeaderItemRewardsContextMenuButton
            onClick={() => {
              router.push('/raffles');
              rewardsContextMenu.close();
            }}
            href='/raffles'
          >
            Raffles
          </HeaderItemRewardsContextMenuButton>
          <HeaderItemRewardsContextMenuButton
            onClick={() => {
              router.push('/giveaways');
              rewardsContextMenu.close();
            }}
            href='/giveaways'
          >
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
    </ClickAwayListener>
  );
}

export default HeaderItemRewardsContextMenu;
