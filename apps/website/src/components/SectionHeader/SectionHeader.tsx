// SectionHeader.tsx

'use client';

import React from 'react';
import youtubeLogo from '../../images/videos/youtube-logo.png';
import xLogo from '../../images/videos/x-logo.png';
import instagramLogo from '../../images/videos/instagram-logo.png';
import defaultLogo from '../../images/videos/default-logo.png';
import trophyLogo from '../../images/videos/trophy-logo.png';
import tiktokLogo from '../../images/videos/tiktok-logo.png';
import starIcon from '../../images/affiliate/star.png';
import cryptoIcon from '../../images/affiliate/crypto.png';
import csgoLogo from '../../images/affiliate/csgo.png';
import xHeaderAcc from '../../images/videos/x-header-acc.png';
import youtubeHeaderAcc from '../../images/videos/youtube-header-acc.png';
import instagramHeaderAcc from '../../images/videos/instagram-header-acc.png';
import tiktokHeaderAcc from '../../images/videos/tiktok-header-acc.png';
import defaultHeaderAcc from '../../images/videos/default-header-acc.png';
import trophyHeaderAcc from '../../images/videos/trophy-header-acc.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './sectionheader.module.scss';
import Button from '../ui/Button/Button';
import {
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

type HeaderType =
  | 'youtube'
  | 'x'
  | 'instagram'
  | 'tiktok'
  | 'trophy'
  | 'default'
  | 'star'
  | 'crypto'
  | 'csgo';

const SectionHeader = ({
  type,
  viewUrl,
  children,
  showBackButton,
  showViewAllButton,
  showHeaderAcc
}: {
  type: HeaderType;
  viewUrl?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  showViewAllButton?: boolean;
  showHeaderAcc?: boolean;
}) => {
  const router = useRouter();

  const handleViewAllButtonClick = () => {
    if (viewUrl) {
      router.push(viewUrl);
    }
  };

  const getHeaderAcc = (type: HeaderType) => {
    switch (type) {
      case 'youtube':
        return youtubeHeaderAcc;
      case 'x':
        return xHeaderAcc;
      case 'instagram':
        return instagramHeaderAcc;
      case 'tiktok':
        return tiktokHeaderAcc;
      case 'trophy':
        return trophyHeaderAcc;
      default:
        return defaultHeaderAcc;
    }
  };

  const getLogo = (type: HeaderType) => {
    switch (type) {
      case 'youtube':
        return youtubeLogo;
      case 'x':
        return xLogo;
      case 'instagram':
        return instagramLogo;
      case 'tiktok':
        return tiktokLogo;
      case 'trophy':
        return trophyLogo;
      case 'star':
        return starIcon;
      case 'crypto':
        return cryptoIcon;
      case 'csgo':
        return csgoLogo;
      default:
        return defaultLogo;
    }
  };

  return (
    <div className={styles.headerContainer}>
      {showBackButton && (
        <Button variant='secondary' leftIcon={faChevronLeft}>
          Back
        </Button>
      )}

      <div className={styles.logoContainer}>
        {showHeaderAcc && (
          <Image className={styles.headerAcc} alt='Header acc' src={getHeaderAcc(type)} />
        )}

        <div className={`${styles.headerContent} ${showHeaderAcc ? styles.paddingLeft : ''}`}>
          <Image className={styles.logo} alt='Header acc' src={getLogo(type)} />
          <div className={styles.headerText}>{children}</div>
        </div>
      </div>

      {showViewAllButton && viewUrl && (
        <Button
          onClick={handleViewAllButtonClick}
          rightIcon={faChevronRight}
          color='#ffffff'
          variant='secondary'
        >
          View All
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
