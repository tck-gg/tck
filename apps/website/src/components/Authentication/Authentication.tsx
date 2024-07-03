import { useAgeVerification } from '@/hooks/age-verification';
import { faLock, faMessage, faUser, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button/Button';
import classes from './Authentication.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import register from '../../images/auth/register.png';
import logo from '../../images/logo.png';
import ClickAwayListener from 'react-click-away-listener';

function Authentication() {
  return (
    <div className={classes.root}>
      <div className={classes.modalWrapper}>
        <ClickAwayListener onClickAway={close}>
          <div className={classes.box}>
            <div className={classes.wrapper}>
              <div className={classes.imageWrapper}>
                <Image alt='TCK Logo' width={100} src={logo} className={classes.logo} />
                <Image alt='Register TCK' width={300} src={register} />
              </div>

              <div className={classes.rightWrapper}>
                <div className={classes.tabWrapper}>
                  <button className={`${classes.activePill} ${classes.pill}`}>Sign Up</button>
                  <button className={`${classes.pill} ${classes.inactivePill}`}>Login</button>
                </div>

                <form action='/' className={classes.formWrapper}>
                  <div className={classes.inputWrapper}>
                    <div className={classes.inputLabelWrapper}>
                      <FontAwesomeIcon icon={faUser} width={10} height={10} color={`fill`} />
                      <label>Username</label>
                    </div>
                    <input type='text' className={classes.inputBox} placeholder='Username' />
                  </div>
                  <div className={classes.inputWrapper}>
                    <div className={classes.inputLabelWrapper}>
                      <FontAwesomeIcon icon={faMessage} width={10} height={10} color={`fill`} />
                      <label>Email Address</label>
                    </div>
                    <input type='text' className={classes.inputBox} placeholder='madness@tck.gg' />
                  </div>
                  <div className={classes.inputWrapper}>
                    <div className={classes.inputLabelWrapper}>
                      <FontAwesomeIcon icon={faLock} width={10} height={10} color={`fill`} />
                      <label>Password</label>
                    </div>
                    <input type='password' className={classes.inputBox} placeholder='**********' />
                  </div>

                  <p className={classes.message}>
                    This site is protected by reCAPTCHA and the Google Privacy Policy & Terms of
                    Service apply.
                  </p>

                  <Button
                    color='#FFFFFF'
                    rightIcon={faChevronRight}
                    variant='gradient'
                    fullWidth={true}
                  >
                    Start Earning
                  </Button>
                </form>
              </div>
            </div>

            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={classes.close}
              onClick={close}
            >
              <path
                d='M10.3952 0.916837C10.9788 0.893246 11.4583 1.37278 11.4347 1.95641L11.0693 10.9982C11.0341 11.869 9.97925 12.2812 9.36296 11.6649L0.686694 2.9886C0.0704103 2.37232 0.482566 1.31751 1.35341 1.28231L10.3952 0.916837Z'
                fill='#989EAE'
                fillOpacity='0.25'
              />
            </svg>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
}

export default Authentication;
