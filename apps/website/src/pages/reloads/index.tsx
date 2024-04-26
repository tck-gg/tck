/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import Image from 'next/image';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Layout from '@/components/Layout/Layout';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';
import Button from '@/components/ui/Button/Button';
import AffiliateBoxCodeBox from '@/components/AffiliateBoxCodeBox/AffiliateBoxCodeBox';
import RoobetFormBox from '@/components/RoobetFormBox/RoobetFormBox';

import roobetDemo from '@/images/affiliate/roobet/demo.png';

import { useTheme } from '@/hooks/theme';

import classes from './reloads.module.scss';

function OfferRoobet() {
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    theme.setTheme('roobet');
  }, []);

  return (
    <Layout title='$15 Roobet Reload'>
      <div className={classes.header}>
        <JaggedBackgroundItem fill='#52431d'>
          <p className={classes.jaggedText}>Roobet Exclusive</p>
        </JaggedBackgroundItem>
        <div className={classes.heroContent}>
          <p className={classes.title}>$15 Reload</p>
          <p className={classes.subtitle}>
            This reward is available for seven days upon redemption.
          </p>
        </div>
      </div>

      <div className={classes.sectionWrapper}>
        <div className={classes.stakeSection}>
          <div className={classes.stakeSectionLeft}>
            <div>
              <p className={classes.title}>Visit Roobet.com</p>
            </div>
            <div className={classes.stakeSectionLeftBottom}>
              <div
                style={{
                  width: '163px',
                  height: '45px'
                }}
              >
                <AffiliateBoxCodeBox fill='#161623'>TCK</AffiliateBoxCodeBox>
              </div>
              <Button
                background='linear-gradient(90deg, #DDB43F 0%, #9B7C25 100%)'
                rightIcon={faAngleRight}
                width={265}
                onClick={() => {
                  window.open('https://roobet.com/?ref=TCK', '_blank');
                }}
              >
                Register Instantly
              </Button>
            </div>
          </div>
          <div className={classes.stakeSectionRight}>
            <Image
              src={roobetDemo}
              alt='Roobet Demo'
              width={640}
              className={classes.stakeDemoImage}
            />
          </div>
        </div>

        <RoobetFormBox />

        <div className={classes.enjoySection}>
          <svg
            className={classes.sectionHeaderSvg}
            width='329'
            height='127'
            viewBox='0 0 329 127'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.74369 9.28527C1.51705 7.34478 2.83558 4.8018 5.12834 4.68611L91.6924 0.318269C94.2175 0.190858 95.7581 3.05253 94.2615 5.09028L46.2553 70.455C45.0042 72.1585 42.4309 72.0687 41.3015 70.2821L2.74369 9.28527Z'
              fill='#171729'
              fillOpacity='0.55'
            />
            <path
              d='M326.797 78.4488C327.781 80.0012 326.727 82.0382 324.891 82.1306L253.054 85.7457C251.032 85.8474 249.8 83.5553 251 81.9256L290.84 27.8258C291.841 26.4663 293.895 26.5381 294.799 27.9641L326.797 78.4488Z'
              fill='#171729'
              fillOpacity='0.55'
            />
            <path
              d='M60.6622 95.0919C59.1652 94.7593 58.5841 92.9351 59.6128 91.7978L98.2042 49.1342C99.3367 47.8822 101.415 48.5099 101.665 50.1795L109.605 103.181C109.813 104.569 108.564 105.734 107.193 105.43L60.6622 95.0919Z'
              fill='#171729'
              fillOpacity='0.55'
            />
          </svg>
          <div className={classes.enjoySectionTop}>
            <p className={clsx(classes.title, classes.center)}>Enjoy your Bonus</p>
            <p className={clsx(classes.subtitle15, classes.center)}>
              Give Roobet 24-48 hours (might take longer on weekends) to check your account and if
              eligible.
            </p>
          </div>
          <Button
            rightIcon={faAngleRight}
            onClick={() => {
              router.push('/');
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default OfferRoobet;
