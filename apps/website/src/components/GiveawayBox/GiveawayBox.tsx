import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { IGiveaway } from 'types';

import Button from '../Button/Button';

import classes from './GiveawayBox.module.scss';

function GiveawayBox({ giveaway }: { giveaway: IGiveaway }) {
  const router = useRouter();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Image
          width={268}
          height={136}
          src={`https://cdn.tck.gg/giveaways/${giveaway.image}.png`}
          alt={giveaway.name}
          style={{
            objectFit: 'contain'
          }}
        />

        <div className={classes.info}>
          <p className={classes.name}>{giveaway.name}</p>
          <p className={classes.brand}>{giveaway.brand}</p>
        </div>

        <Button
          rightIcon={faAngleRight}
          variant={giveaway.winnerId ? 'secondary' : 'gradient'}
          fullWidth
          onClick={() => {
            return router.push(`/giveaways/${giveaway.id}`);
          }}
        >{`${giveaway.winnerId ? 'View' : 'Enter'} Giveaway`}</Button>
      </div>
      <div className={classes.bottom}>
        <p className={clsx(classes.spots, classes.grey)}>Spots</p>
        <p>
          <span className={classes.entries}>{giveaway.entries.length}</span>
          <span className={clsx(classes.maxEntries, classes.grey)}>/{giveaway.maxEntries}</span>
        </p>
      </div>
    </div>
  );
}

export default GiveawayBox;
