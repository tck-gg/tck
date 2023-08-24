/* eslint-disable react-hooks/exhaustive-deps */

import { IGiveaway } from 'types';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import {
  faAngleLeft,
  faAngleRight,
  faBalanceScale,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

import Button from '../Button/Button';
import JaggedBackgroundItem from '../JaggedBackgroundItem/JaggedBackgroundItem';
import IconBubble from '../IconBubble/IconBubble';
import EntryCounter from '../EntryCounter/EntryCounter';

import { useAuth } from '@/hooks/auth';

import classes from './GiveawayInfobox.module.scss';

import giveawayCoinImage from '@/images/giveaway-coin.png';

function getUrl() {
  if (process.env.NODE_ENV === 'production') {
    if (!window.location.hostname.includes('localhost')) {
      return 'https://tck.gg';
    }
    return 'http://localhost:8007';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return '';
}

function GiveawayInfobox({ giveaway }: { giveaway: IGiveaway }) {
  const router = useRouter();
  const auth = useAuth();
  const [isEntered, setIsEntered] = useState(false);
  const [hasMaxEntries, setHasMaxEntries] = useState(
    giveaway.entries.length === giveaway.maxEntries
  );

  useEffect(() => {
    setIsEntered(
      giveaway.entries
        .map((entry) => {
          return entry.userId;
        })
        .includes(auth.user?.id || '')
    );
  }, [auth]);

  async function handleEnterGiveaway() {
    if (isEntered || hasMaxEntries || auth.user?.isBanned) {
      return;
    }
    const response = await axios.post(
      `${getUrl()}/api/v1/giveaway/${giveaway.id}/enter`,
      {},
      {
        headers: {
          Authorization: auth.user?.apiKey
        },
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status !== 200) {
      router.reload();
      return;
    }
    notifications.show({
      title: 'Error entering giveaway',
      message: 'There was an error entering the giveaway, please try again later.',
      color: 'red',
      withBorder: true,
      icon: <IconX />
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Button
          leftIcon={faAngleLeft}
          onClick={() => {
            router.push('/giveaways');
          }}
        >
          Back
        </Button>
        <Button>
          <FontAwesomeIcon icon={faBalanceScale} />
        </Button>
      </div>
      <div className={classes.middle}>
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

        <div className={classes.infoSection}>
          <JaggedBackgroundItem fill='#26263A' withShadow>
            <div className={classes.valueItems}>
              <Image src={giveawayCoinImage} alt='value' width={18} height={18} />
              <p>{giveaway.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          </JaggedBackgroundItem>
          <div className={classes.entriesSection}>
            <div className={classes.entriesCounter}>
              <IconBubble icon={faUser} size={16} />
              <EntryCounter count={giveaway.entries.length} max={giveaway.maxEntries} />
            </div>
            <p className={classes.giveawayEntriesDescription}>Giveaway Entries</p>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        <Button
          variant={isEntered ? 'secondary' : 'gradient'}
          rightIcon={faAngleRight}
          onClick={handleEnterGiveaway}
          fullWidth
          disabled={isEntered || hasMaxEntries}
        >
          {isEntered ? 'Already Entered' : hasMaxEntries ? 'Max Entries' : 'Enter Giveaway'}
        </Button>
        <p className={classes.end}>Ends {new Date(giveaway.timestampEnd).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default GiveawayInfobox;
