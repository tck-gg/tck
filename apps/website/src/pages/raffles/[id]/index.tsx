import Image from 'next/image';
import React, { useState } from 'react';
import coin from '../../../images/coin.png';
import individualCoinBackground from '../../../images/raffle/individual-coin-background.png';
import ticketBackground from '../../../images/raffle/ticket-background.png';
import styles from './raffle.module.scss';
import PageHeader from '@/components/PageHeader/PageHeader';
import Layout from '@/components/Layout/Layout';
import Button from '@/components/ui/Button/Button';
import {
  faAngleLeft,
  faBalanceScale,
  faChevronLeft,
  faChevronRight,
  faTicket,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GiveawayEntry from '@/components/giveaway/GiveawayEntry/GiveawayEntry';
import PredictioModal from '@/components/Modal/Prediction/PredictioModal';

const IndividualRafflePage = () => {
  const [showBackdrop, setShowBackdrop] = useState(true);

  return (
    <Layout title='Raffles'>
      <PageHeader title='Raffles' />
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <div className={styles.sidebarWrapper}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <Button leftIcon={faAngleLeft}>Back</Button>
                <Button>
                  <FontAwesomeIcon icon={faBalanceScale} />
                </Button>
              </div>
              <div className={styles.itemContainer}>
                {/* Item image */}
                <div className={styles.itemImageWrapper}>
                  <Image src={coin} alt='Item' className={styles.itemImage} />
                </div>
                {/* Item details */}
                <div className={styles.itemDetails}>
                  <div className={styles.itemTitle}>TCK Points</div>
                  <div className={styles.itemSubtitle}>Currency</div>
                </div>
                <div className={styles.coinBackgroundWrapper}>
                  <Image
                    src={individualCoinBackground}
                    alt='coin background'
                    className={styles.coinBackgroundImage}
                  />
                  <div className={styles.coinValueWrapper}>
                    <Image className={styles.coinImage} src={coin} alt='Coin' />
                    <div className={styles.coinValue}>250000</div>
                  </div>
                </div>
                <div className={styles.ticketInfoWrapper}>
                  <div className={styles.ticketPriceContainer}>
                    <div className={styles.ticketPriceWrapper}>
                      <Image className={styles.coinImageSmall} src={coin} alt='Coin' />
                      <div className={styles.totalValueText}>250000</div>
                    </div>
                    <div className={styles.ticketPriceLabel}>Ticket Price</div>
                  </div>
                  <div className={styles.spotsContainer}>
                    <div className={styles.spotsWrapper}>
                      <FontAwesomeIcon icon={faUserCircle} className={styles.spotIcon} />
                      <div>
                        <span className={styles.spotsValue}>39</span>
                        <span className={styles.spotsLimit}>/2000</span>
                      </div>
                    </div>
                    <div className={styles.spotsLabel}>Spots</div>
                  </div>
                </div>
              </div>
              <div className={styles.purchaseSection}>
                <div className={styles.amountWrapper}>
                  <div className={styles.amountLabel}>Amount</div>
                  <div className={styles.amountValue}>
                    <FontAwesomeIcon
                      icon={faTicket}
                      className={`${styles.ticketIcon} ${styles.blueColor}`}
                    />
                    <span>3</span>
                  </div>
                </div>
                <div className={styles.ticketsWrapper}>
                  <div className={styles.ticketsLabel}>Tickets</div>
                  <div className={styles.ticketsValue}>
                    <span className={styles.ticketNumber}>#32</span>
                    <span className={styles.ticketNumber}>#800</span>
                    <span className={styles.ticketNumber}>#31</span>
                  </div>
                </div>
                <div className={styles.totalWrapper}>
                  <div className={styles.totalLabel}>Total</div>
                  <div className={styles.totalValue}>
                    <div className={styles.totalValueWrapper}>
                      <Image className={styles.coinImageSmall} src={coin} alt='Coin' />
                      <div className={styles.totalValueText}>250000</div>
                    </div>
                  </div>
                </div>
                <Button
                  variant='gradient'
                  color='#ffffff'
                  fullWidth={true}
                  rightIcon={faChevronRight}
                >
                  Buy Tickets
                </Button>
              </div>
            </div>

            <div className={styles.ticketsSection}>
              <div className={styles.myTicketsHeader}>
                <div className={styles.myTicketsIcon}>
                  <FontAwesomeIcon icon={faTicket} className={styles.ticketIcon} />
                </div>
                <div className={styles.myTicketsTitle}>My Tickets</div>
              </div>
              <div className={styles.myTicketsWrapper}>
                <div className={styles.myTicket}>#800</div>
                <div className={styles.myTicket}>#55</div>
              </div>
            </div>
          </div>

          <div className={styles.mainRaffle}>
            <div className={styles.raffleGrid}>
              <GiveawayEntry position={1} display={'1'} key={1} />
              <GiveawayEntry position={2} display={'2'} key={2} />
              <GiveawayEntry position={3} display={'3'} key={3} />
              <GiveawayEntry position={4} display={'4'} key={4} />
              <GiveawayEntry position={5} display={'5'} key={5} />
              <GiveawayEntry position={6} display={'6'} key={6} />
              <GiveawayEntry position={7} display={'7'} key={7} />
              <GiveawayEntry position={8} display={'8'} key={8} />
              <GiveawayEntry position={9} display={'9'} key={9} />
              <GiveawayEntry position={10} display={'10'} key={10} />
              <GiveawayEntry position={11} display={'11'} key={11} />
              <GiveawayEntry position={12} display={'12'} key={12} />
              <GiveawayEntry position={13} display={'13'} key={13} />
              <GiveawayEntry position={14} display={'14'} key={14} />
              <GiveawayEntry position={15} display={'15'} key={15} />
              <GiveawayEntry position={16} display={'16'} key={16} />
            </div>

            {/* Raffle Ended Backdrop  */}
            {showBackdrop && (
              <div className={styles.raffleDetails}>
                <div className={styles.raffleDetailsContainer}>
                  <div className={styles.raffleImage}>Image</div>
                  <div className={styles.raffleTitle}>Madness</div>
                  <div className={styles.raffleTicketWrapper}>
                    <Image
                      className={styles.ticketBackground}
                      alt='Ticket background'
                      src={ticketBackground}
                    />
                    <div className={styles.ticketText}>Ticket #1,938</div>
                  </div>
                  <button
                    onClick={() => {
                      setShowBackdrop(false);
                    }}
                    className={styles.viewAllEntriesButton}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{`View all entries`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndividualRafflePage;
