/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { faAngleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { IGiveaway } from 'types';

import Button from '../Button/Button';
import IconBubble from '../IconBubble/IconBubble';
import EntryCounter from '../EntryCounter/EntryCounter';

import Jagged from '../svg/Jagged';

import { useAuth } from '@/hooks/auth';

import classes from './GiveawayBox.module.scss';

import giveawayCoinImage from '@/images/giveaway-coin.png';
import BoxBadge from '../BoxBadge/BoxBadge';

function GiveawayBox({ giveaway }: { giveaway: IGiveaway }) {
  const router = useRouter();
  const auth = useAuth();
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    setIsEntered(
      giveaway.entries
        .map((entry) => {
          return entry.userId;
        })
        .includes(auth.user?.id || '')
    );
  }, [auth]);

  return (
    <div className={classes.root}>
      {isEntered && <BoxBadge>ENTERED</BoxBadge>}
      <div className={classes.top}>
        <Image
          width={268}
          height={136}
          src={`https://cdn.tck.gg/giveaways/${giveaway.image}`}
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
        >
          View Giveaway
        </Button>
      </div>
      <div className={classes.bottom}>
        <div className={classes.spotsDescription}>
          <IconBubble icon={faUser} size={16} />
          <p className={clsx(classes.spots, classes.grey)}>Spots</p>
        </div>
        <EntryCounter count={giveaway.entries.length} max={giveaway.maxEntries} />
      </div>
      <div className={classes.valueWrapper}>
        <div className={classes.valueContent}>
          <Image src={giveawayCoinImage} alt='value' width={18} height={18} />
          <p>{giveaway.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <Jagged className={classes.valueBackground} />
      </div>
    </div>
  );
}

export default GiveawayBox;
