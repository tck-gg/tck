import React, { useEffect, useState } from 'react';
import styles from './viprewards.module.scss';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import AffiliateBoxCodeBox from '@/components/AffiliateBoxCodeBox/AffiliateBoxCodeBox';

import Button from '@/components/ui/Button/Button';
import {
  faArrowDown,
  faArrowUp,
  faCheckCircle,
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import roobetImage from '../../images/affiliate/acc/roobet.png';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import roobetDashboardImage from '../../images/vip-rewards/roobet-dashboard.png';
import { useTheme } from '@/hooks/theme';
import miniRoobet from '../../images/vip-rewards/roobet.svg';
import roobetTextLogo from '../../images/affiliate/roobet.png';
import jaggedBackground from '../../images/coin-background.png';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';
import SectionHeader from '@/components/SectionHeader/SectionHeader';

import silver1 from '../../images/rank/silver-1.png';
import silver2 from '../../images/rank/silver-2.png';
import silver3 from '../../images/rank/silver-3.png';
import silver4 from '../../images/rank/silver-4.png';
import gold1 from '../../images/rank/gold-1.png';
import gold2 from '../../images/rank/gold-2.png';
import gold3 from '../../images/rank/gold-3.png';
import gold4 from '../../images/rank/gold-4.png';
import diamond1 from '../../images/rank/diamond-1.png';
import diamond2 from '../../images/rank/diamond-2.png';
import diamond3 from '../../images/rank/diamond-3.png';
import ruby1 from '../../images/rank/ruby-1.png';
import ruby2 from '../../images/rank/ruby-2.png';
import ruby3 from '../../images/rank/ruby-3.png';
import emerald1 from '../../images/rank/emerald-1.png';
import emerald2 from '../../images/rank/emerald-2.png';
import emerald3 from '../../images/rank/emerald-3.png';
import legend1 from '../../images/rank/legend-1.png';
import legend2 from '../../images/rank/legend-2.png';
import legend3 from '../../images/rank/legend-3.png';
import champion1 from '../../images/rank/champion-1.png';
import champion2 from '../../images/rank/champion-2.png';
import champion3 from '../../images/rank/champion-3.png';
import master1 from '../../images/rank/master-1.png';
import master2 from '../../images/rank/master-2.png';
import master3 from '../../images/rank/master-3.png';
import grandmaster1 from '../../images/rank/grandmaster-1.png';
import grandmaster2 from '../../images/rank/grandmaster-2.png';
import grandmaster3 from '../../images/rank/grandmaster-3.png';
import immortal from '../../images/rank/immortal.png';
import PageHeaderGlow from '@/components/PageHeaderGlow/PageHeaderGlow';
import Grid from '@/components/Grid/Grid';
import AccountModal from '@/components/Modal/Account/AccountModal';

const Index = () => {
  const primaryColor = '#DDB43F';
  const buttonGradient = 'linear-gradient(#DDB43F, #9B7C25)';
  const theme = useTheme();
  const [authenticated, setAuthenticated] = useState(false);

  const [activeLeagueIndex, setActiveLeagueIndex] = useState(0);
  const rewards = [
    {
      name: 'Silver',
      ranks: [
        {
          name: 'Silver 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: silver1,
          claimed: true,
          active: false
        },
        {
          name: 'Silver 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: silver2,
          claimed: true,
          active: false
        },
        {
          name: 'Silver 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: silver3,
          claimed: false,
          active: true
        },
        {
          name: 'Silver 4',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: silver4,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'Gold',
      ranks: [
        {
          name: 'Gold 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: gold1,
          claimed: false,
          active: false
        },
        {
          name: 'Gold 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: gold2,
          claimed: false,
          active: false
        },
        {
          name: 'Gold 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: gold3,
          claimed: false,
          active: false
        },
        {
          name: 'Gold 4',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: gold4,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'Diamond',
      ranks: [
        {
          name: 'Diamond 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: diamond1,
          claimed: false,
          active: false
        },
        {
          name: 'Diamond 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: diamond2,
          claimed: false,
          active: false
        },
        {
          name: 'Diamond 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: diamond3,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'Ruby',
      ranks: [
        {
          name: 'Ruby 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: ruby1,
          claimed: false,
          active: false
        },
        {
          name: 'Ruby 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: ruby2,
          claimed: false,
          active: false
        },
        {
          name: 'Ruby 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: ruby3,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'Emerald',
      ranks: [
        {
          name: 'Emerald 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: emerald1,
          claimed: false,
          active: false
        },
        {
          name: 'Emerald 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: emerald2,
          claimed: false,
          active: false
        },
        {
          name: 'Emerald 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: emerald3,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'legend',
      ranks: [
        {
          name: 'legend 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: legend1,
          claimed: false,
          active: false
        },
        {
          name: 'legend 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: legend2,
          claimed: false,
          active: false
        },
        {
          name: 'legend 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: legend3,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'champion',
      ranks: [
        {
          name: 'champion 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: champion1,
          claimed: false,
          active: false
        },
        {
          name: 'champion 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: champion2,
          claimed: false,
          active: false
        },
        {
          name: 'champion 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: champion3,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'master',
      ranks: [
        {
          name: 'master 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: master1,
          claimed: false,
          active: false
        },
        {
          name: 'master 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: master2,
          claimed: false,
          active: false
        },
        {
          name: 'master 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: master3,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'grandmaster',
      ranks: [
        {
          name: 'grandmaster 1',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: grandmaster1,
          claimed: false,
          active: false
        },
        {
          name: 'grandmaster 2',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: grandmaster2,
          claimed: false,
          active: false
        },
        {
          name: 'grandmaster 3',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: grandmaster3,
          claimed: false,
          active: false
        }
      ]
    },
    {
      name: 'immortal',
      ranks: [
        {
          name: 'immortal ',
          description: 'Wager $50.000',
          reward: '$5.00',
          logo: immortal,
          claimed: false,
          active: false
        }
      ]
    }
  ];

  useEffect(() => {
    theme.setTheme('roobet');
  }, []);

  function handleClick(link: string) {
    window.open(link, '_blank');
  }

  return (
    <Layout title='Vip Rewards'>
      <div className={styles.container}>
        <div className={styles.heroSection}>
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
            <Image
              src={roobetTextLogo}
              width={120}
              height={30}
              alt='Roobet Logo'
              style={{ objectFit: 'contain' }}
            />
          </JaggedBackgroundItem>
          <div className={styles.header}>Vip Rewards</div>
          <p className={`${styles.description} ${styles.textCenter}`}>
            This reward is available for 7 Days upon redemption.
          </p>
        </div>

        <div className={styles.ctaSection}>
          <SectionHeader
            type='viproobet'
            viewUrl={undefined}
            showBackButton={false}
            showHeaderAcc={true}
          >
            Sign Up Reward
          </SectionHeader>

          <div className={styles.ctaCard}>
            <div className={styles.ctaCardInfo}>
              <Image
                src={roobetTextLogo}
                width={120}
                height={30}
                alt='Roobet Logo'
                style={{ objectFit: 'contain' }}
              />
              <div>$15 Reload & Instant Rakeback</div>
              <div className={styles.paragraph}>
                Click on the button below to register instantly.
              </div>
              <div
                className={styles.gradientBackground}
                style={{
                  background: `radial-gradient(circle, #DDB440 0%, #DDB44000 60%)`
                }}
              ></div>
            </div>

            <div className={styles.ctaCardAction}>
              <div className={styles.affiliateBox2}>
                <Image
                  src={jaggedBackground}
                  alt='Coin background'
                  className={styles.jaggedBackground}
                />
                <AffiliateBoxCodeBox>TCK</AffiliateBoxCodeBox>
              </div>
              <div>
                <Button variant='roobet' rightIcon={faChevronRight} color='#fff'>
                  Claim Reward
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainSection}>
          <div className={styles.mainLeftWrapper}>
            <SectionHeader
              type='vipuser'
              viewUrl={undefined}
              showBackButton={false}
              showHeaderAcc={true}
            >
              Your Rank
            </SectionHeader>

            <div className={styles.card}>
              <Grid />
              {authenticated ? (
                <>
                  <Image
                    src={silver3}
                    width={200}
                    height={200}
                    alt='Silver III'
                    style={{ objectFit: 'contain', position: 'relative' }}
                  />
                  <div className={styles.currentRankWrapper}>
                    <div
                      className={`${styles.currentRankText} ${styles.italic} ${styles.uppercase}`}
                    >
                      Silver III
                    </div>
                    <div className={styles.paragraph}>$50,000 Wagered</div>
                  </div>
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressTextWrapper}>
                      <div className={`${styles.progressText} ${styles.uppercase}`}>
                        Your Progress
                      </div>
                      <div className={styles.progressText}>41.45%</div>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressBarInner}
                        style={{ background: buttonGradient, width: `41.45%` }}
                      ></div>
                    </div>
                    <div className={styles.paragraph}>$50,000 Left for Next Rank</div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.gradientBackground2}
                    style={{
                      background: `radial-gradient(circle, #DDB440 0%, #DDB44000 60%)`,
                      zIndex: 0
                    }}
                  ></div>
                  <Image
                    src={roobetTextLogo}
                    width={120}
                    height={30}
                    alt='Roobet Logo'
                    style={{ objectFit: 'contain', marginBottom: '16px' }}
                  />

                  <div className={styles.subHeader}>Connect your Account</div>
                  <p
                    className={`${styles.paragraph} ${styles.textCenter}`}
                    style={{ marginBottom: '10px' }}
                  >
                    {`Connect your Roobet account to get started. Make sure you`}
                    <br />
                    {`are registered under code "TCK".`}
                  </p>
                  <div style={{ position: 'relative' }}>
                    <Button
                      rightIcon={faChevronRight}
                      onClick={() => {
                        setAuthenticated(true);
                      }}
                      variant='roobet'
                      color='#fff'
                    >
                      Connect Roobet
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.mainRightWrapper}>
            <SectionHeader
              type='vipgift'
              viewUrl={undefined}
              showBackButton={false}
              showHeaderAcc={true}
            >
              Level Up Rewards
            </SectionHeader>

            <div className={styles.card}>
              <div className={styles.levelUpRewardsHeader}>
                <div className=''>
                  <div className={`${styles.subHeader} ${styles.italic}`}>
                    {rewards[activeLeagueIndex].name}
                  </div>
                  <div className={styles.rankRewardsText}>Rewards</div>
                </div>

                <div className={styles.buttonWrapper}>
                  <button
                    onClick={() => {
                      setActiveLeagueIndex((current) => {
                        const newIndex = current - 1;
                        if (newIndex < 0) {
                          return 0;
                        }
                        return newIndex;
                      });
                    }}
                    type='button'
                    className={`${styles.arrowButton} ${
                      activeLeagueIndex === 0 ? styles.disabled : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    onClick={() => {
                      setActiveLeagueIndex((current) => {
                        const newIndex = current + 1;
                        if (newIndex > rewards.length - 1) {
                          return current;
                        }
                        return newIndex;
                      });
                    }}
                    type='button'
                    className={`${styles.arrowButton} ${
                      activeLeagueIndex === rewards.length - 1 ? styles.disabled : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                </div>
              </div>

              <div className={styles.levelUpRewardsContent}>
                {rewards[activeLeagueIndex].ranks.map((reward) => {
                  return (
                    <div
                      key={reward.name}
                      className={styles.rewardBox}
                      style={{
                        backgroundColor: reward.active ? '#2f2e41' : '#202032'
                      }}
                    >
                      {reward.active && (
                        <div
                          className={styles.activeLeftBar}
                          style={{ background: buttonGradient }}
                        ></div>
                      )}
                      <div className={styles.rewardBoxInnerWrapper}>
                        <div className={styles.rankLogoContainer}>
                          <Image
                            src={reward.logo}
                            alt={reward.name}
                            width={30}
                            height={30}
                            className={styles.rankLogo}
                          />
                        </div>
                        <div className={styles.rewardInfo}>
                          <div className={`${styles.rewardText} ${styles.uppercase}`}>
                            {reward.name}
                          </div>
                          <div className={styles.rewardDescription}>{reward.description}</div>
                        </div>
                      </div>
                      <div className={`${styles.rewardBoxInnerWrapper}`}>
                        <div className={styles.rewardAmount}>
                          <Image
                            src={jaggedBackground}
                            alt='Coin background'
                            className={styles.jaggedBackground}
                          />
                          <div className={styles.rewardAmountText}>{reward.reward}</div>
                        </div>
                        {authenticated ? (
                          <>
                            <Button
                              variant='roobet'
                              disabled={reward.active ? false : true}
                              color='#fff'
                              width={64}
                            >
                              {reward.claimed ? (
                                <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                              ) : (
                                <div>Claim</div>
                              )}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant='roobet' disabled={true} color='#fff'>
                              Claim
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomCtaWrapper}>
          <div className={styles.bottomCtaLeftWrapper}>
            <div className={styles.subHeader}>
              Visit Roobet<span className={styles.com}>.com</span>
            </div>
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
                <Button variant='roobet' rightIcon={faChevronRight} color='#fff'>
                  Register Instantly
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.bottomCtaRightWrapper}>
            <Image
              src={roobetDashboardImage}
              alt='Roobet dashboard'
              className={styles.siteImage}
            ></Image>
          </div>
        </div>

        <div className={styles.heroSection}>
          <div className={styles.subHeader}>High Roller Rewards</div>
          <p className={`${styles.description} ${styles.textCenter} ${styles.marginBottom}`}>
            Are you a High Roller? Make a ticket in our Discord an learn about our <br />
            Exclusive VIP Rewards.
          </p>
          <Button variant='secondary' leftIcon={faDiscord}>
            Join Server
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
