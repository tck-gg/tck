/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Layout from '@/components/Layout/Layout';
import Button from '@/components/ui/Button/Button';
import AffiliateBox from '@/components/AffiliateBox/AffiliateBox';
import SocialBox from '@/components/SocialBox/SocialBox';
import HomeSectionRaffles from '@/components/HomeSectionRaffles/HomeSectionRaffles';

import { useAgeVerification } from '@/hooks/age-verification';
import { useAuth } from '@/hooks/auth';

import { AFFILIATES } from '@/data/affiliates';
import { SOCIALS_DATA } from '@/data/socials';

import classes from './index.module.scss';

import ak from '@/images/ak.png';
import knife from '@/images/knife.png';

function Home() {
  const router = useRouter();
  const ageVerification = useAgeVerification();
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));

      const accessToken = urlParams.get('access_token');
      const userId = urlParams.get('state');
      if (!accessToken || !userId) {
        return;
      }

      const response = await axios.post(
        '/api/v1/user/verify-discord',
        { accessToken, userId },
        {
          validateStatus: () => {
            return true;
          }
        }
      );

      window.location.hash = '';

      if (response.status === 200) {
        auth.refresh();
      }
    })();
  }, []);

  return (
    <Layout>
      <div className={classes.sectionWrapper}>
        <div className={clsx(classes.section, classes.hero)}>
          <div className={classes.ak}>
            <Image src={ak} width={280} height={80} alt='ak' style={{ objectFit: 'contain' }} />
          </div>
          <div className={classes.knife}>
            <Image
              src={knife}
              width={250}
              height={133}
              alt='knife'
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={classes.heroTop}>
            <p className={classes.sectionDescription}>Claim Free Rewards</p>
            <p className={classes.big}>The Most Rewarding Website</p>
            <p className={classes.description}>
              Elevate Your Game: The Ultimate Destination for Rewarding Players and Viewers for
              being a part of the TCK Community.
            </p>
          </div>
          <div className={classes.buttonGroup}>
            <Button
              variant='gradient'
              rightIcon={faAngleRight}
              onClick={() => {
                ageVerification.verify(() => {
                  router.push('/affiliates');
                });
              }}
            >
              Explore Rewards
            </Button>
            <Button
              variant='primary'
              rightIcon={faAngleRight}
              onClick={() => {
                router.push('/videos');
              }}
            >
              Watch
            </Button>
          </div>
        </div>
        <div className={classes.section}>
          <HomeSectionRaffles />
        </div>
        <div className={classes.section}>
          <svg
            className={classes.sectionHeaderSvg}
            width='272'
            height='80'
            viewBox='0 0 272 80'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.86328 62.6567C15.5503 62.3118 23.1371 61.9227 27.6236 61.4892C28.6766 61.3875 29.4721 61.0127 30.0103 60.3647C30.5898 59.667 30.8291 58.7958 30.7281 57.7512L30.07 50.9386L17.091 52.1925C12.284 52.6569 8.67864 51.9279 6.27492 50.0056C3.91259 48.0334 2.50107 44.663 2.04035 39.8941L1.90871 38.5316C1.44799 33.7628 2.19037 30.2071 4.13585 27.8646C6.12272 25.4723 9.51967 24.0439 14.3267 23.5795L15.7001 23.4468L14.421 17.3818L24.7218 16.3866L24.6274 22.5843L35.6149 21.5228L36.5363 31.0605L17.995 32.8518C15.2481 33.1171 14.0063 34.6124 14.2696 37.3374L14.4012 38.6999C14.6645 41.425 16.1696 42.6548 18.9164 42.3894L28.4618 41.4672C32.9483 41.0338 36.3455 41.7599 38.6533 43.6457C40.961 45.5314 42.3299 48.6998 42.7599 53.1507L43.089 56.557C43.519 61.0079 42.782 64.3797 40.8779 66.6723C39.0196 68.9606 35.8472 70.3214 31.3606 70.7549L29.4378 70.9406L30.5795 77.0189L20.2788 78.0141L20.3403 71.4757C15.0033 71.7163 10.1405 71.8423 5.75182 71.8537L4.86328 62.6567Z'
              fill='#0E0E1B'
            />
            <path
              d='M237.379 32.7628C245.203 34.4909 250.783 35.6129 254.121 36.1288C254.905 36.2498 255.552 36.1249 256.062 35.7541C256.612 35.3547 256.947 34.7665 257.068 33.9893L257.851 28.9208L248.195 27.4285C244.618 26.8757 242.136 25.679 240.746 23.8382C239.396 21.9689 238.995 19.2602 239.543 15.7123L239.7 14.6986C240.248 11.1507 241.446 8.70633 243.292 7.36562C245.177 5.99638 247.908 5.58813 251.485 6.14085L252.507 6.29878L252.701 1.65819L260.364 2.8426L259.148 7.32527L267.323 8.58865L266.226 15.6845L252.432 13.5526C250.388 13.2367 249.21 14.0925 248.896 16.1199L248.74 17.1336C248.426 19.161 249.291 20.3326 251.335 20.6484L258.437 21.746C261.775 22.2619 264.107 23.4181 265.433 25.2145C266.76 27.011 267.167 29.565 266.656 32.8764L266.264 35.4106C265.752 38.722 264.593 41.0338 262.786 42.346C261.013 43.6635 258.457 44.0642 255.119 43.5484L253.689 43.3273L253.393 47.9521L245.729 46.7677L246.984 42.0316C243.064 41.2182 239.51 40.4094 236.321 39.6052L237.379 32.7628Z'
              fill='#0E0E1B'
            />
            <path
              d='M223.586 64.8051C228.298 63.817 231.631 63.0515 233.587 62.5086C234.046 62.3812 234.369 62.1529 234.557 61.8235C234.76 61.4688 234.798 61.0638 234.671 60.6085L233.847 57.6392L228.19 59.2095C226.095 59.7911 224.439 59.7497 223.223 59.0852C222.022 58.3953 221.132 57.0111 220.555 54.9326L220.39 54.3387C219.813 52.2602 219.865 50.6255 220.544 49.4348C221.238 48.2187 222.633 47.3199 224.728 46.7383L225.327 46.5721L224.286 43.9828L228.775 42.7365L229.218 45.492L234.007 44.1626L235.161 48.3197L227.079 50.563C225.882 50.8954 225.448 51.6554 225.778 52.8432L225.943 53.437C226.273 54.6248 227.036 55.0525 228.233 54.7201L232.394 53.5652C234.349 53.0224 235.912 53.0789 237.083 53.7347C238.254 54.3905 239.108 55.6883 239.647 57.6283L240.059 59.113C240.597 61.053 240.534 62.6056 239.869 63.771C239.224 64.9309 237.923 65.7822 235.968 66.3251L235.13 66.5577L236.111 69.1637L231.621 70.4099L231.138 67.506C228.79 68.0297 226.644 68.4657 224.699 68.8137L223.586 64.8051Z'
              fill='#0E0E1B'
            />
          </svg>

          <div className={classes.sectionHeader}>
            <p className={classes.sectionDescription}>Affiliate Codes</p>
            <p className={classes.sectionTitle}>Free Rewards</p>
          </div>
          <div className={classes.affiliateWrapper}>
            {AFFILIATES.filter((affiliate) => {
              return affiliate.featured;
            })
              .map((affiliate) => {
                return (
                  <AffiliateBox
                    key={affiliate.name}
                    image={affiliate.image}
                    reward={affiliate.reward}
                    name={affiliate.name}
                    codes={affiliate.codes}
                    tags={affiliate.tags}
                    featured={affiliate.featured}
                    isOffPage
                  />
                );
              })
              .splice(0, 4)}
          </div>
          <div className={clsx(classes.affiliateWrapper, classes.fadedAffiliateWrapper)}>
            {AFFILIATES.filter((affiliate) => {
              return affiliate.featured;
            })
              .map((affiliate) => {
                return (
                  <AffiliateBox
                    key={affiliate.name}
                    image={affiliate.image}
                    reward={affiliate.reward}
                    name={affiliate.name}
                    codes={affiliate.codes}
                    tags={affiliate.tags}
                    featured={affiliate.featured}
                    isOffPage
                  />
                );
              })
              .splice(0, 4)}
          </div>
          <Button
            rightIcon={faAngleRight}
            onClick={() => {
              ageVerification.verify(() => {
                router.push('/affiliates');
              });
            }}
          >
            Discover More
          </Button>
        </div>
        <div className={classes.section}>
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

          <div className={classes.sectionHeader}>
            <p className={classes.sectionDescription}>Stay Up to Date</p>
            <p className={classes.sectionTitle}>More TCK Content</p>
          </div>
          <div className={classes.boxWrapper}>
            {SOCIALS_DATA.map((social) => {
              return <SocialBox key={social.name} social={social} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
