import React, { useState } from 'react';
import ModalLayout from '../Layout/ModalLayout';
import Button from '@/components/ui/Button/Button';
import { faAward, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './predictionmodal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import coin from '../../../images/coin.png';
import coinBackground from '../../../images/coin-background.png';

const PredictioModal = ({
  isOpen,
  open,
  close
}: {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}) => {
  const [selection, setSelection] = useState<'Yes' | 'No'>();

  return (
    <ModalLayout isOpen={isOpen} open={open} close={close}>
      <div className={`${styles.wrapper} ${styles.p1rem}`}>
        <div className={styles.predictionHeader}>
          <FontAwesomeIcon icon={faAward} className={styles.awardIcon} />
          <div className={styles.predictionText}>Prediction</div>
        </div>
        <div className={styles.title}>Will we make any profit on this Bonus Hunt?</div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: '50%' }}></div>
          </div>
          <div className={styles.time}>2h 45m</div>
        </div>
        <div className={styles.voteContainer}>
          <div
            className={`${styles.voteOption} ${selection === 'Yes' ? styles.borderGradient : ''}`}
            onClick={() => {
              setSelection('Yes');
            }}
          >
            <div className={styles.voteBackground}></div>
            <div className={styles.voteText}>Yes</div>
            <div className={styles.voteCount}>104 Votes</div>
          </div>
          <div
            className={`${styles.voteOption} ${selection === 'No' ? styles.borderGradient : ''}`}
            onClick={() => {
              setSelection('No');
            }}
          >
            <div className={styles.voteBackground}></div>
            <div className={styles.voteText}>No</div>
            <div className={styles.voteCount}>486 Votes</div>
          </div>
        </div>

        {selection && (
          <div className={styles.confirmationText}>
            You are currently placing a bet on the answer “{selection}”.
          </div>
        )}

        <div className={styles.actionContainer}>
          <div className={styles.priceContainer}>
            <Image src={coinBackground} alt='Coin background' className={styles.coinBackground} />
            <div className={styles.priceContent}>
              <Image src={coin} alt='Coin' width={20} />
              <div className={styles.price}>250000</div>
            </div>
          </div>

          <div className={styles.predictButtonContainer}>
            <Button variant='gradient' rightIcon={faChevronRight} color='white' width={180}>
              Predict
            </Button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default PredictioModal;
