// RewardCard.tsx

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import dotPattern from '../../images/videos/dot-pattern.png';
import Image from 'next/image';
import styles from './rewardcard.module.scss';
import Button from '../ui/Button/Button';
import { faArrowCircleUp, faChevronRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type HeaderType = 'youtube' | 'x' | 'instagram' | 'tiktok';

const RewardCard = ({
  type,
  viewUrl,
  prize,
  description
}: {
  type: HeaderType;
  viewUrl: string;
  prize: string;
  description: string;
}) => {
  const router = useRouter();
  const handleViewButtonClick = () => {
    if (viewUrl) {
      router.push(viewUrl);
    }
  };

  const gradients = {
    youtube: '#FE4747, #F92323',
    x: '#FFFFFF, #FFFFFF50',
    tiktok: '#FF1F64, #FF447E',
    instagram: '#EB1972, #7C2EF6'
  };

  const shadow = {
    youtube: '#FE4747',
    x: '#FFFFFF',
    tiktok: '#FF1F64',
    instagram: '#7C2EF6'
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <Image className={styles.patternBackground} alt='Pattern background' src={dotPattern} />
        <div
          className={styles.gradientBackground}
          style={{
            background: `radial-gradient(circle, ${shadow[type]} 0%, ${shadow[type]}00 60%)`
          }}
        ></div>
        <div className={styles.prizeContent}>
          <div
            className={styles.prizeText}
            style={{
              color: shadow[type]
              //   background: `linear-gradient(${gradients[type]})`
            }}
          >
            {prize}
          </div>
          <p className={styles.prizeDescription}>{description}</p>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.footerContent}>
          <Button
            onClick={handleViewButtonClick}
            variant='secondary'
            fullWidth={true}
            color='#ffffff'
            rightIcon={faChevronRight}
          >
            View Clip
          </Button>

          <div className={styles.uploadContent}>
            <FontAwesomeIcon icon={faArrowCircleUp} className={styles.uploadIcon} />
            <div className={styles.uploadText}>Upload your clips</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
