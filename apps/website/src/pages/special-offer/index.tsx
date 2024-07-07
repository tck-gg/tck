import React, { useEffect } from 'react';
import styles from './specialoffer.module.scss';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import AffiliateBoxCodeBox from '@/components/AffiliateBoxCodeBox/AffiliateBoxCodeBox';
import Button from '@/components/ui/Button/Button';
import { faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import roobetImage from '../../images/affiliate/acc/roobet.png';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import exampleImage from '../../images/videos/temp-video.png';
import { useTheme } from '@/hooks/theme';
import miniRoobet from '../../images/affiliate/roobet-mini.png';
import Jagged from '@/components/svg/Jagged';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';

const Index = () => {
  const primaryColor = '#DDB43F';
  const buttonGradient = 'linear-gradient(#DDB43F, #9B7C25)';
  const theme = useTheme();

  useEffect(() => {
    theme.setTheme('roobet');
  }, []);

  function handleClick(link: string) {
    window.open(link, '_blank');
  }

  return (
    <Layout title='Exclusive Offer'>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.item1}>
            <Image
              src={miniRoobet}
              width={40}
              height={40}
              alt='miniRoobet'
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.item2}>
            <Image
              src={miniRoobet}
              width={70}
              height={70}
              alt='miniRoobet'
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={styles.item3}>
            <Image
              src={miniRoobet}
              width={43}
              height={43}
              alt='miniRoobet'
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={styles.item4}>
            <Image
              src={miniRoobet}
              width={55}
              height={55}
              alt='miniRoobet'
              style={{ objectFit: 'contain' }}
            />
          </div>

          <JaggedBackgroundItem fill={'#9B7C2530'}>
            <span style={{ color: primaryColor }}>Roobet Exclusive</span>
          </JaggedBackgroundItem>
          <div className={styles.header}>Free Spin</div>
          <p className={`${styles.description} ${styles.textCenter}`}>
            This reward is available for 7 Days upon redemption.
          </p>
        </div>

        <div className={styles.mainWrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.header}>Visit Roobet.com</div>
            <p className={styles.description}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus minus,
              praesentium vel molestias commodi blanditiis doloribus architecto maiores harum eos,
              officia officiis magni quidem cupiditate! Perspiciatis vero officia dolores ipsum.
            </p>
            <div className={styles.redeem}>
              <div className={styles.affiliateBox}>
                <AffiliateBoxCodeBox fill='#161727'>TCK</AffiliateBoxCodeBox>
              </div>
              <div>
                <button className={styles.button} style={{ background: buttonGradient }}>
                  <div className={styles.buttonTextWrapper}>
                    <div>Register Instantly</div>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <Image src={exampleImage} alt='Roobet' className={styles.siteImage}></Image>
          </div>
        </div>

        <div className={styles.formsWrapper}>
          <div className={styles.formSection}>
            <Image src={roobetImage} alt='Roobet' className={styles.formBackground}></Image>

            <div
              className={styles.featuredOvgradientCircleerlay}
              style={{
                background: `radial-gradient(circle, ${primaryColor} 0%, ${primaryColor}00 50%)`
              }}
            ></div>

            <div className={styles.formTitle}>Submit your Info</div>
            <div className={styles.formDescription}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat totam doloremque
              optio rem, assumenda nihil necessitatibus eligendi.
            </div>
            <div
              className={styles.gradientOverlay}
              style={{
                background: `radial-gradient(circle, ${primaryColor} 0%, ${primaryColor}00 50%)`
              }}
            ></div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <div className={styles.formLabel}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <div className={styles.labelText}>Roobet Username</div>
              </div>

              <input type='text' className={styles.inputField} placeholder='Roobet username...' />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formLabel}>
                <FontAwesomeIcon icon={faDiscord} className={styles.icon} />
                <div className={styles.labelText}>Discord Username</div>
              </div>

              <input type='text' className={styles.inputField} placeholder='Discord Username...' />
            </div>

            <button className={styles.button} style={{ background: buttonGradient }}>
              <div className={`${styles.buttonTextWrapper} ${styles.wFull}`}>
                <div className={styles.buttonText}>Submit information</div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </button>
          </div>
        </div>

        <div className={styles.hero}>
          <div className={styles.header}>Enjoy your Bonus</div>
          <p className={`${styles.description} ${styles.textCenter} ${styles.marginBottom}`}>
            Give stake 24-48 hours (might take longer on weekends) to check your account and if
            eligible.
          </p>
          <Button variant='secondary' rightIcon={faChevronRight}>
            Back to Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
