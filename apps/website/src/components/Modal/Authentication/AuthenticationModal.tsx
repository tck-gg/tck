'use client';
import {
  faLock,
  faMessage,
  faUser,
  faChevronRight,
  faMailBulk,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../ui/Button/Button';
import styles from './authenticationmodal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import loginImage from '../../../images/authentication/login.png';
import signUpImage from '../../../images/authentication/sign-up.png';

import logo from '../../../images/logo.png';

import ModalLayout from '../Layout/ModalLayout';
import { useState } from 'react';

function AuthenticationModal({
  isOpen,
  open,
  close
}: {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');

  return (
    <ModalLayout isOpen={isOpen} open={open} close={close} width='700px'>
      <div className={styles.modal}>
        <div className={styles.imageSection}>
          <Image
            src={logo}
            alt='TCK Logo'
            className={`${styles.logo} ${activeTab === 'signup' ? styles.logoSignup : ''}`}
          />
          {activeTab === 'signup' ? (
            <>
              <Image src={signUpImage} alt='Sign Up Image' className={styles.backgroundImage} />
              <div className={styles.welcomeText}>
                <div className={styles.gradientText}>
                  <div className={styles.welcomeTitle}>Welcome</div>
                  <div className={styles.welcomeSubtitle}>
                    The Most <br /> Rewarding Website
                  </div>
                  <p className={styles.welcomeDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Image src={loginImage} alt='Login Image' className={styles.backgroundImage} />
            </>
          )}
        </div>
        <div className={styles.formSection}>
          <div>
            <div className={styles.tabContainer}>
              <button
                onClick={() => {
                  setActiveTab('signup');
                }}
                className={`${styles.tabButton} ${
                  activeTab === 'signup' ? styles.activeTab : styles.inactiveTab
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setActiveTab('login');
                }}
                className={`${styles.tabButton} ${
                  activeTab === 'login' ? styles.activeTab : styles.inactiveTab
                }`}
              >
                Login
              </button>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>
                <FontAwesomeIcon className={styles.icon} icon={faUser} />
                <div className={styles.labelText}>Username</div>
              </div>
              <input type='text' placeholder='Username' className={styles.inputField} />
            </div>

            {activeTab === 'signup' && (
              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>
                  <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
                  <div className={styles.labelText}>Email Address</div>
                </div>
                <input type='text' placeholder='madness@tck.gg' className={styles.inputField} />
              </div>
            )}

            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>
                <FontAwesomeIcon className={styles.icon} icon={faLock} />
                <div className={styles.labelText}>Password</div>
              </div>
              <input type='password' placeholder='**************' className={styles.inputField} />
            </div>
          </div>

          <p className={styles.recaptchaText}>
            This site is protected by reCAPTCHA and the Google Privacy Policy & Terms of Service
            apply.
          </p>

          <Button rightIcon={faChevronRight} color='#fff' variant='gradient' fullWidth={true}>
            {activeTab === 'login' ? 'Login' : 'Start Earning'}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}

export default AuthenticationModal;
