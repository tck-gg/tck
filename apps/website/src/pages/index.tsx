/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { faAngleRight, faExternalLink } from '@fortawesome/free-solid-svg-icons';
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

import gfuelProducts from '@/images/gfuel-products.png';
import gfuelWordmark from '@/images/gfuel-wordmark.png';
import gfuelBackground from '@/images/gfuel-background.png';
import ak from '@/images/ak.png';
import knife from '@/images/knife.png';
import logo from '@/images/logo-hq.png';
import trophy from '@/images/trophy.png';
import lollipop from '@/images/lollipop.png';
import vs from '@/images/vs.png';
import bags from '@/images/bags.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CHANNEL = 'tck';

export async function getServerSideProps() {
  const response = await axios.get(`https://kick.com/api/v2/channels/${CHANNEL}/livestream`, {
    headers: {
      'x-kick-auth': process.env.KICK_AUTH
    },
    validateStatus: () => {
      return true;
    }
  });
  const data = response.data;
  const isLive = !!data.data;

  return {
    props: {
      isLive
    }
  };
}

function Home({ isLive }: { isLive: boolean }) {
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
              width={350}
              height={350}
              alt='knife'
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={classes.trophy}>
            <Image
              src={trophy}
              width={150}
              height={150}
              alt='trophy'
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={classes.bags}>
            <Image
              src={bags}
              width={220}
              height={220}
              alt='bags'
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={classes.vs}>
            <Image src={vs} width={140} height={140} alt='vs' style={{ objectFit: 'contain' }} />
          </div>
          <div className={classes.lollipop}>
            <Image
              src={lollipop}
              width={100}
              height={100}
              alt='lollipop'
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={classes.heroTop}>
            <Image src={logo} alt='TCKGG Logo' className='tckggLogo' width={450} height={250} />
            <p className={classes.description}>
              Elevate Your Game: The Ultimate Destination for Rewarding Players and Viewers <br />{' '}
              for being a part of the TCK Community.
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
                router.push('/leaderboard');
              }}
            >
              Join Leaderboard
            </Button>
          </div>
        </div>

        <div className={classes.gfuelWrapper}>
          <Image src={gfuelBackground} alt='Background ' className={classes.gfuelBackground} />
          <div className={classes.gfuelDetails}>
            <Image
              src={gfuelProducts}
              alt='GFuel Drinks'
              className={classes.gfuelDrinksImage}
              width={100}
              height={100}
            />
            <span>Powered by</span>
            <Image
              src={gfuelWordmark}
              alt='GFuel '
              height={40}
              width={120}
              className={classes.objectContain}
            />
            <a href='/'>
              <FontAwesomeIcon icon={faExternalLink} className={classes.externalLinkIcon} />
            </a>
          </div>
        </div>

        {isLive && (
          <div className={classes.section}>
            <svg
              className={classes.sectionHeaderSvg}
              width='263'
              height='95'
              viewBox='0 0 263 95'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.1791 18.116L2.91692 20.5827C1.30595 20.9699 0.313908 22.5898 0.701133 24.2007L10.517 65.0376C10.9042 66.6486 12.5241 67.6406 14.135 67.2534L24.3972 64.7867C26.0082 64.3995 27.0002 62.7796 26.613 61.1686L25.4744 56.4317C25.1229 54.9696 26.0331 53.4971 27.4952 53.1457C28.9465 52.7968 30.4156 53.6882 30.7644 55.1395C31.1133 56.5909 32.5726 57.4846 34.0239 57.1357L34.1681 57.1011C35.5614 56.7662 36.9623 57.6242 37.2972 59.0174C37.6321 60.4107 39.0331 61.2687 40.4263 60.9338L51.0827 58.3724C52.6936 57.9851 53.6857 56.3653 53.2985 54.7543L50.9725 45.0778C50.607 43.5572 49.0679 42.6233 47.5473 42.9888C46.0379 43.3516 44.5101 42.4246 44.1473 40.9152C43.7845 39.4058 42.2668 38.4763 40.7574 38.8391L40.6117 38.8742C39.1604 39.223 37.7011 38.3293 37.3522 36.878C37.0034 35.4266 37.8971 33.9673 39.3484 33.6184L39.5992 33.5582C41.0506 33.2093 41.9443 31.75 41.5954 30.2987C41.2466 28.8473 42.1403 27.388 43.5916 27.0391L43.717 27.009C45.2376 26.6435 46.174 25.1145 45.8085 23.5939L43.4826 13.9175C43.0954 12.3065 41.4755 11.3144 39.8645 11.7017L29.1031 14.2884C27.7679 14.6093 26.9456 15.9519 27.2666 17.2871C27.5875 18.6223 26.7653 19.9649 25.4301 20.2859L25.2003 20.3411C23.7382 20.6925 22.8379 22.1627 23.1893 23.6248L23.2305 23.796C23.5819 25.2581 22.6815 26.7283 21.2194 27.0797C19.7573 27.4311 18.2872 26.5308 17.9357 25.0687L16.7971 20.3318C16.4099 18.7208 14.79 17.7288 13.1791 18.116Z'
                fill='#171729'
                fillOpacity='0.55'
              />
              <path
                d='M239.706 53.4379L233.142 51.7482C231.537 51.3351 229.902 52.301 229.489 53.9055L221.748 83.9747C221.335 85.5792 222.301 87.2148 223.905 87.6279L230.469 89.3176C232.074 89.7307 233.709 88.7648 234.122 87.1603L234.889 84.1814C235.179 83.0574 236.332 82.3827 237.456 82.672C238.572 82.9593 239.251 84.0985 238.964 85.2143C238.676 86.33 239.348 87.4674 240.464 87.7546L240.575 87.7832C241.646 88.0589 242.29 89.1508 242.015 90.2219C241.739 91.293 242.384 92.3849 243.455 92.6606L250.984 94.599C252.589 95.0121 254.225 94.0462 254.638 92.4416L256.382 85.6653C256.683 84.4963 255.972 83.3026 254.803 83.0017C253.642 82.703 252.936 81.5181 253.235 80.3578C253.533 79.1974 252.835 78.0145 251.674 77.7158L251.562 77.687C250.447 77.3997 249.775 76.2624 250.062 75.1466C250.349 74.0309 251.487 73.3592 252.603 73.6465L252.795 73.6961C253.911 73.9833 255.049 73.3117 255.336 72.1959C255.623 71.0802 256.76 70.4085 257.876 70.6958L257.972 70.7206C259.141 71.0215 260.333 70.3178 260.634 69.1488L262.379 62.3725C262.792 60.7679 261.826 59.1323 260.221 58.7193L252.611 56.7601C251.584 56.4958 250.538 57.1137 250.274 58.1402C250.009 59.1667 248.963 59.7847 247.936 59.5204L247.76 59.4749C246.636 59.1856 245.49 59.8622 245.201 60.9862L245.167 61.1179C244.877 62.2419 243.732 62.9185 242.608 62.6292C241.484 62.3398 240.807 61.194 241.096 60.07L241.863 57.0911C242.276 55.4866 241.31 53.851 239.706 53.4379Z'
                fill='#171729'
                fillOpacity='0.55'
              />
              <path
                d='M203.214 2.22276L199.978 2.62074C198.333 2.82299 197.164 4.32004 197.366 5.96451L199.892 26.5037C200.094 28.1481 201.592 29.3173 203.236 29.115L206.472 28.7171C208.087 28.5185 209.235 27.0484 209.036 25.4335L208.862 24.0125C208.759 23.1825 209.355 22.4262 210.185 22.3241C211.009 22.2228 211.765 22.8079 211.866 23.6318C211.967 24.4557 212.717 25.0414 213.541 24.9401L213.623 24.93C214.414 24.8327 215.134 25.3951 215.231 26.186C215.329 26.977 216.049 27.5393 216.84 27.442L221.567 26.8606C223.212 26.6583 224.381 25.1613 224.179 23.5168L223.666 19.3453C223.559 18.482 222.768 17.869 221.905 17.9752C221.048 18.0806 220.262 17.4721 220.157 16.6153C220.051 15.7584 219.271 15.1492 218.414 15.2546L218.332 15.2648C217.508 15.3661 216.758 14.7803 216.656 13.9564C216.555 13.1325 217.141 12.3825 217.965 12.2812L218.107 12.2637C218.931 12.1623 219.517 11.4123 219.415 10.5884C219.314 9.7645 219.9 9.01446 220.724 8.91313L220.795 8.90437C221.658 8.79821 222.272 8.01237 222.166 7.14916L221.653 2.97762C221.45 1.33316 219.953 0.164008 218.309 0.366253L213.521 0.955041C212.763 1.04826 212.225 1.7383 212.318 2.49629C212.411 3.25427 211.872 3.94431 211.114 4.03753L210.984 4.05357C210.154 4.15565 209.564 4.91126 209.666 5.74128L209.678 5.83847C209.78 6.66848 209.19 7.42409 208.36 7.52617C207.53 7.62825 206.774 7.03814 206.672 6.20813L206.497 4.78708C206.298 3.17225 204.828 2.02416 203.214 2.22276Z'
                fill='#171729'
                fillOpacity='0.25'
              />
            </svg>

            <div className={classes.sectionHeader}>
              <p className={classes.kickSectionDescription}>I AM LIVE ON KICK</p>
              <p className={classes.sectionTitle}>Livestream</p>
            </div>

            <div className={classes.livestreamBox}>
              <iframe
                src={`https://player.kick.com/${CHANNEL}`}
                allowFullScreen={true}
                style={{
                  overflow: 'hidden',
                  border: 0
                }}
                className={classes.livestream}
              ></iframe>
            </div>
          </div>
        )}

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
