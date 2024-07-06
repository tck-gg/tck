// VideoHeader.tsx

'use client';

import React from 'react';
import youtubeLogo from '../../images/videos/youtube-logo.png';
import xLogo from '../../images/videos/x-logo.png';
import instagramLogo from '../../images/videos/instagram-logo.png';
import tiktokLogo from '../../images/videos/tiktok-logo.png';
import xHeaderAcc from '../../images/videos/x-header-acc.png';
import youtubeHeaderAcc from '../../images/videos/youtube-header-acc.png';
import instagramHeaderAcc from '../../images/videos/instagram-header-acc.png';
import tiktokHeaderAcc from '../../images/videos/tiktok-header-acc.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './videoheader.module.scss';
import Button from '../ui/Button/Button';
import { faChevronCircleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type HeaderType = 'youtube' | 'x' | 'instagram' | 'tiktok';

const VideoHeader = ({
  type,
  viewUrl,
  children
}: {
  type: HeaderType;
  viewUrl?: string;
  children: React.ReactNode;
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
      default:
        return youtubeHeaderAcc;
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
      default:
        return youtubeLogo;
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Image className={styles.headerAcc} alt='Header acc' src={getHeaderAcc(type)} />
        <div className={styles.headerContent}>
          <Image className={styles.logo} alt='Header acc' src={getLogo(type)} />
          <div className={styles.headerText}>{children}</div>
        </div>
      </div>

      {viewUrl && (
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

export default VideoHeader;
