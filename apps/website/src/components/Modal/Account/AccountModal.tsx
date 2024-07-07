'use client';
import React, { useState } from 'react';
import ModalLayout from '../Layout/ModalLayout';
import styles from './accountmodal.module.scss';
import colourfulBackground from '../../../images/community-wins/colourful-background.png';
import coin from '../../../images/coin.png';
import coinBackground from '../../../images/coin-background.png';
import bitcoin from '../../../images/account/bitcoin.png';
import ethereum from '../../../images/account/ethereum.png';
import litecoin from '../../../images/account/litecoin.png';
import roobet from '../../../images/account/roobet.png';
import gamdom from '../../../images/account/gamdom.png';
import csgobig from '../../../images/account/csgobig.png';
import steam from '../../../images/account/steam.png';
import discord from '../../../images/account/discord.png';
import twitch from '../../../images/account/twitch.png';
import kick from '../../../images/account/kick.png';
import Image from 'next/image';
import { Switch } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTicket, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/ui/Button/Button';

type Tabs = 'profile' | 'history' | 'connections' | 'wallet';

const AccountModal = ({
  isOpen,
  open,
  close
}: {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<Tabs>('wallet');

  const tabs = [
    {
      icon: '',
      text: 'Profile'
    },
    {
      icon: '',
      text: 'History'
    },
    {
      icon: '',
      text: 'Connections'
    },
    {
      icon: '',
      text: 'Wallet'
    }
  ];

  const placeholder = [1, 2, 3, 4, 5];
  const walletInputs = [
    { name: 'Bitcoin', logo: bitcoin },
    { name: 'Ethereum', logo: ethereum },
    { name: 'Litecoin', logo: litecoin },
    { name: 'Steam', logo: steam }
  ];

  const connectionsSocials = [
    { name: 'Discord', logo: discord },
    { name: 'Twitch', logo: twitch },
    { name: 'Kick', logo: kick }
  ];

  const connectionsUsernames = [
    { name: 'Roobet Username', logo: roobet },
    { name: 'Gamdom Username', logo: gamdom },
    { name: 'Csgobig Username', logo: csgobig }
  ];

  return (
    <ModalLayout isOpen={isOpen} open={open} close={close} width='700px'>
      <div className={styles.contentContainer}>
        <div className={styles.tabContainer}>
          <div className={styles.tabWrapper}>
            {tabs.map((item, index) => {
              return (
                <button
                  key={item.text}
                  onClick={() => {
                    setActiveTab(item.text.toLowerCase() as Tabs);
                  }}
                  className={`${styles.tabButton} ${
                    activeTab === item.text.toLowerCase()
                      ? styles.tabButtonActive
                      : styles.tabButtonInactive
                  }`}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        </div>
        {activeTab === 'profile' && (
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <div className={styles.profileDetails}>
                <Image src={colourfulBackground} className={styles.profileImage} alt='Avatar' />
                <div className={styles.profileText}>
                  <div className={styles.profileName}>Madness</div>
                  <div className={styles.profileId}>#1234</div>
                </div>
              </div>
              <div className={styles.coinBalanceWrapper}>
                <Image
                  src={coinBackground}
                  alt='Coin background'
                  className={styles.coinBackgroundImage}
                />
                <div className={styles.coinBalance}>
                  <Image className={styles.coinIcon} src={coin} alt='Coin' />
                  <div className={styles.coinValue}>1000</div>
                </div>
              </div>
            </div>

            <div className={styles.settingsGrid}>
              <div className={styles.settingsFullWidth}>
                <div className={styles.profileText}>
                  <div className={styles.profileDetails}>
                    <FontAwesomeIcon icon={faUser} className={`${styles.icon}`} />
                    <div className={styles.settingsTitle}>Anonymous</div>
                  </div>
                  <div className={styles.settingsSubtitle}>Hides your username and avatar</div>
                </div>
                <div>
                  <Switch />
                </div>
              </div>

              <div className={styles.cardColumn}>
                <div className={styles.profileDetails}>
                  <FontAwesomeIcon
                    icon={faTicket}
                    className={`${styles.icon} ${styles.ticketRotate}`}
                  />
                  <div className={styles.settingsTitle}>14</div>
                </div>
                <div className={styles.settingsSubtitle}>Raffles Won</div>
              </div>

              <div className={styles.cardColumn}>
                <div className={styles.profileDetails}>
                  <Image src={coin} className={styles.coinIcon} alt='Coin' />
                  <div className={styles.settingsTitle}>1000000</div>
                </div>
                <div className={styles.settingsSubtitle}>Point Spent</div>
              </div>
            </div>
            <Button variant='secondary' fullWidth={true}>
              Log Out
            </Button>
          </div>
        )}

        {activeTab === 'history' && (
          <div className={styles.itemListContainer}>
            {placeholder.map((item, index) => {
              return (
                <div key={index} className={styles.itemCard}>
                  <div className={styles.itemHeader}>
                    <div className={styles.itemDetails}>
                      <Image className={styles.itemImage} src={coin} alt='Coin' />
                      <div className={styles.itemText}>
                        <div className={styles.itemTitle}>Playstation 5</div>
                        <div className={styles.itemSubtitle}>Sony</div>
                      </div>
                    </div>

                    <div className={styles.itemPriceWrapper}>
                      <Image
                        src={coinBackground}
                        alt='Coin background'
                        className={styles.itemPriceBackground}
                      />
                      <div className={styles.itemPrice}>
                        <Image className={styles.coinIcon} src={coin} alt='Coin' />
                        <div className={styles.itemPriceValue}>1000</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemFooter}>
                    <div className={styles.winningTicketWrapper}>
                      <div className={styles.winningTicketIcon}>
                        <FontAwesomeIcon
                          icon={faTicket}
                          className={`${styles.icon} ${styles.ticketRotate}`}
                        />
                      </div>
                      <div className={styles.winningTicketText}>Winning Ticket</div>
                    </div>

                    <div className={styles.ticketNumbers}>
                      <div className={styles.ticketNumber}>#55</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className={styles.walletContainer}>
            <div className={styles.walletItemList}>
              {walletInputs.map((item, index) => {
                return (
                  <div key={index} className={styles.walletItemCard}>
                    <div className={styles.walletItemHeader}>
                      <Image className={styles.walletItemLogo} src={item.logo} alt={item.name} />
                      <div className={styles.walletItemName}>{item.name}</div>
                    </div>
                    <input
                      type='text'
                      className={styles.walletItemInput}
                      placeholder='Address...'
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className={styles.connectionsContainer}>
            <div className={styles.connectionsSection}>
              {connectionsSocials.map((item, index) => {
                return (
                  <div key={index} className={styles.socialCard}>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <Image className={styles.logo} src={item.logo} alt={item.name} />
                        <div className={styles.name}>{item.name}</div>
                      </div>
                      <div className={styles.description}>Connect your account</div>
                    </div>
                    <Button variant='secondary' rightIcon={faChevronRight}>
                      Connect
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className={styles.usernameSection}>
              {connectionsUsernames.map((item, index) => {
                return (
                  <div key={index} className={styles.usernameCard}>
                    <div className={styles.cardHeader}>
                      <Image className={styles.logo} src={item.logo} alt={item.name} />
                      <div className={styles.name}>{item.name}</div>
                    </div>
                    <input type='text' className={styles.input} placeholder='Username...' />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ModalLayout>
  );
};

export default AccountModal;
