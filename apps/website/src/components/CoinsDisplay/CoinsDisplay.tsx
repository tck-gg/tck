import Image from 'next/image';
import { useHover } from '@uidotdev/usehooks';

import Jagged from '../svg/Jagged';

import { useAuth } from '@/hooks/auth';

import classes from './CoinsDisplay.module.scss';

import staticCoin from '../../images/coin.png';
import animatedCoin from '../../images/coin.gif';

function CoinsDisplay() {
  const [ref, hovering] = useHover();
  const auth = useAuth();

  return (
    <div className={classes.root} ref={ref}>
      <div className={classes.content}>
        <Image src={hovering ? animatedCoin : staticCoin} alt='coin' width={20} height={20} />
        <p className={classes.coins}>
          {auth.user?.points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
        </p>
      </div>
      <Jagged className={classes.background} />
    </div>
  );
}

export default CoinsDisplay;
