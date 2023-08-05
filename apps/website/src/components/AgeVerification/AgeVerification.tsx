import { faBan, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ClickAwayListener from 'react-click-away-listener';

import { useAgeVerification } from '@/hooks/age-verification';

import IconBubble from '../IconBubble/IconBubble';

import classes from './AgeVerification.module.scss';
import Button from '../Button/Button';

function AgeVerification() {
  const ageVerification = useAgeVerification();

  function verify() {
    ageVerification.setVerified(true);
  }

  return ageVerification.isOpen ? (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={ageVerification.close}>
        <div className={classes.box}>
          <div className={classes.top}>
            <IconBubble icon={faBan} size={16} />
            <p className={classes.title}>Age Verification</p>
          </div>
          <div className={classes.bottom}>
            <div className={classes.info}>
              <svg
                width='71'
                height='70'
                viewBox='0 0 71 70'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M58.5205 57.6133C53.9749 62.0926 48.1813 65.1442 41.873 66.3822C35.5646 67.6202 29.0249 66.9888 23.0813 64.5679C17.1376 62.1471 12.0571 58.0456 8.48254 52.7824C4.90798 47.5191 3 41.3307 3 35C3 28.6693 4.90798 22.4809 8.48254 17.2176C12.0571 11.9544 17.1376 7.85289 23.0813 5.43206C29.0249 3.01123 35.5646 2.37985 41.873 3.6178C48.1813 4.85576 53.9749 7.90741 58.5205 12.3867M41.427 35C44.6936 35 47.3416 32.3939 47.3416 29.1791C47.3416 25.9642 44.6936 23.3581 41.427 23.3581H38.4852C35.2187 23.3581 32.5706 25.9642 32.5706 29.1791C32.5706 32.3939 35.2187 35 38.4852 35M41.427 35H38.4852M41.427 35C44.6936 35 47.3416 37.6061 47.3416 40.8209C47.3416 44.0358 44.6936 46.6419 41.427 46.6419H38.4852C35.2187 46.6419 32.5706 44.0358 32.5706 40.8209C32.5706 37.6061 35.2187 35 38.4852 35M20.7414 20.4629V46.6419M14.8268 46.6419H26.656M14.8268 26.2838H23.6832M53.2562 35H71M62.1126 26.2838V43.7162'
                  stroke='url(#paint0_linear_741_448)'
                  strokeWidth='6'
                  strokeMiterlimit='10'
                  strokeLinejoin='round'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_741_448'
                    x1='3'
                    y1='33.1176'
                    x2='71'
                    y2='33.1176'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#18A9FF' />
                    <stop offset='1' stopColor='#9229FF' />
                  </linearGradient>
                </defs>
              </svg>

              <p className={classes.main}>Age Restricted Content</p>
              <p className={classes.description}>
                By clicking continue, you agree you are of legal age in your country of residence.
                You also confirm you are residence in a country where the Curaçao casino license is
                legal for promotion (this list does not include Denmark).
              </p>
            </div>
            <div className={classes.buttonGroup}>
              <Button leftIcon={faChevronLeft} onClick={ageVerification.close}>
                Back
              </Button>
              <Button rightIcon={faChevronRight} onClick={verify} variant='gradient'>
                Continue
              </Button>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  ) : null;
}

export default AgeVerification;
