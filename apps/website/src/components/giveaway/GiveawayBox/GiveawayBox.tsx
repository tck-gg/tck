/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { faAngleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { IGiveaway } from 'types';
import { Image } from '@mantine/core';
import { default as NextImage } from 'next/image';

import Button from '@/components/ui/Button/Button';
import IconBubble from '../../ui/IconBubble/IconBubble';
import EntryCounter from '../EntryCounter/EntryCounter';

import Jagged from '../../svg/Jagged';

import { useAuth } from '@/hooks/auth';

import classes from './GiveawayBox.module.scss';

import giveawayCoinImage from '@/images/giveaway-coin.png';
import BoxBadge from '../../BoxBadge/BoxBadge';

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
      {isEntered && !giveaway.winnerId && <BoxBadge>ENTERED</BoxBadge>}
      <div className={classes.top}>
        <Image
          width={268}
          height={136}
          src={`https://cdn.tck.gg/giveaways/${giveaway.image}`}
          alt={giveaway.name}
          fit='contain'
        />

        <div className={classes.info}>
          <p className={classes.name}>{giveaway.name}</p>
          <p className={classes.brand}>{giveaway.brand}</p>
        </div>

        <div className={classes.buttonGroup}>
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
          <p className={classes.end}>
            end{giveaway.winnerId ? 'ed' : 's'} {!giveaway.winnerId && 'in'}{' '}
            {giveaway.winnerId
              ? Math.abs(Math.floor((giveaway.timestampEnd - Date.now()) / 1000 / 60 / 60 / 24))
              : Math.floor((giveaway.timestampEnd - Date.now()) / 1000 / 60 / 60 / 24)}{' '}
            day
            {Math.abs(Math.floor((giveaway.timestampEnd - Date.now()) / 1000 / 60 / 60 / 24)) !==
              1 && 's'}
            {giveaway.winnerId && ' ago'}
          </p>
        </div>
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
          <NextImage src={giveawayCoinImage} alt='value' width={18} height={18} />
          <p>{giveaway.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <Jagged className={classes.valueBackground} />
      </div>
    </div>
  );
}

export default GiveawayBox;
