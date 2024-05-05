import axios from 'axios';
import clsx from 'clsx';
import { faAngleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';

import { useAuth } from '@/hooks/auth';

import roobetPromo from '@/images/affiliate/roobet/promo.png';

import classes from './RoobetFormBox.module.scss';

function RoobetFormBox() {
  const auth = useAuth();

  const [roobetUsername, setRoobetUsername] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!auth.user) {
      setDisabled(true);
      return;
    }
    if (!auth.user?.accounts?.discord) {
      setStatus('You must link your Discord account to be eligible for this offer.');
      return;
    }
    setDiscordUsername(auth.user.accounts.discord.discordUsername);
  }, [auth.user]);

  async function onClick() {
    if (!roobetUsername.trim()) {
      setStatus('Please fill out all fields.');
      return;
    }
    if (!discordUsername.trim()) {
      setStatus('You must link your Discord account to be eligible for this offer.');
      return;
    }

    setDisabled(true);

    const response = await axios.post(
      '/api/v1/collection/roobet',
      {
        roobetUsername: roobetUsername.trim(),
        discordUsername: discordUsername.trim()
      },
      {
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 201) {
      setRoobetUsername('');
      setDiscordUsername('');

      setStatus('Submitted!');
    } else {
      setStatus('Error! Try again.');
    }

    setDisabled(false);
  }

  return (
    <div className={classes.root}>
      <div className={clsx(classes.side, classes.left)}>
        <div className={classes.leftInfo}>
          <p className={classes.title}>Submit your Info</p>
          <p className={classes.description}>
            Submit your info here for Roobet to give you your Reload exclusively with TCK.gg.
          </p>
        </div>
        <div className={classes.imageWrapper}>
          <div className={classes.imageSection}>
            <Image src={roobetPromo} alt='Roobet Promo' width={350} />
            <svg
              width='584'
              height='295'
              viewBox='0 0 584 295'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={classes.promo}
            >
              <g filter='url(#filter0_f_1977_955)'>
                <ellipse
                  cx='292'
                  cy='291.5'
                  rx='152'
                  ry='41.5'
                  fill='url(#paint0_linear_1977_955)'
                />
              </g>
              <defs>
                <filter
                  id='filter0_f_1977_955'
                  x='-110'
                  y='0'
                  width='804'
                  height='583'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='BackgroundImageFix'
                    result='shape'
                  />
                  <feGaussianBlur stdDeviation='125' result='effect1_foregroundBlur_1977_955' />
                </filter>
                <linearGradient
                  id='paint0_linear_1977_955'
                  x1='140'
                  y1='289.059'
                  x2='444'
                  y2='289.059'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#DDB43F' />
                  <stop offset='1' stopColor='#9B7C25' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className={clsx(classes.side, classes.right)}>
        <div className={classes.rightInfo}>
          <p className={classes.title}>Submit your Info</p>
          <p className={classes.description}>
            Submit your info here for Roobet to give you your Reload exclusively with TCK.gg.
          </p>
        </div>
        <div className={classes.formInputs}>
          {auth.user ? (
            <>
              <Input
                label='Roobet Username'
                placeholder='Type your Roobet username...'
                value={roobetUsername}
                icon={faUser}
                onChange={(event) => {
                  return setRoobetUsername(event.target.value);
                }}
              />
              <Input
                label='Discord Username'
                placeholder='Link your Discord account...'
                value={discordUsername}
                icon={faDiscord}
                disabled={true}
              />

              {status && <p>{status}</p>}
            </>
          ) : (
            <p>You must be logged in to be eligible for this offer.</p>
          )}
        </div>
        <Button
          rightIcon={faAngleRight}
          background='linear-gradient(90deg, #DDB43F 0%, #9B7C25 100%)'
          fullWidth
          onClick={onClick}
          disabled={disabled}
        >
          Submit Information
        </Button>
      </div>
    </div>
  );
}

export default RoobetFormBox;
