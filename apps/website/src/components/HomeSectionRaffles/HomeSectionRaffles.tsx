import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import Button from '@/components/ui/Button/Button';

import classes from './HomeSectionRaffles.module.scss';

import raffleImage from '@/images/raffle.png';

interface IImage {
  src: StaticImageData;
  alt: string;
}

function HomeSectionRaffles() {
  const router = useRouter();

  return (
    <div className={classes.root}>
      <div className={classes.rafflesLeft}>
        <p className={classes.raffleTitle}>Join Raffles</p>
        <p className={classes.paragraph}>
          <strong>Unlock Your Luck</strong>: Dive into Raffles for a Chance to Win Big!{' '}
          <strong>BEING PRESENT IN THE STREAM</strong> makes you eligible for a{' '}
          <strong>FREE ENTRY</strong> into <strong>WEEKLY & MONTHLY</strong> raffles for huge
          rewards & prizes!
        </p>
        <Button
          rightIcon={faAngleRight}
          onClick={() => {
            router.push('/raffles');
          }}
          variant='gradient'
        >
          Join Raffles
        </Button>
      </div>
      <div className={classes.rafflesRight}>
        <Image src={raffleImage} alt='Raffles' className={classes.image} />
      </div>
    </div>
  );
}

export default HomeSectionRaffles;
