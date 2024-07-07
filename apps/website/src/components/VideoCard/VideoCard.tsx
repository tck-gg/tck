// VideoCard.tsx

'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import thumbnail from '../../images/videos/thumbnail.png';
import placeholderAvatar from '../../images/videos/placeholder-avatar.jpg';
import placeholderVideo from '../../images/videos/placeholder-video.jpg';
import Link from 'next/link';
import styles from './videocard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCertificate,
  faIdBadge
} from '@fortawesome/free-solid-svg-icons';
import ViewsIcon from '../svg/ViewsIcon/ViewsIcon';

interface VideoData {
  id?: string;
  title?: string;
  views?: string;
  thumbnail?: string;
  rank?: number;
  name?: string;
  avatar?: string;
  upvote?: number;
  downvote?: number;
  userVote?: 'up' | 'down' | undefined;
}

const VideoCard = ({ data }: { data: VideoData }) => {
  const [vote, setVote] = useState<'up' | 'down' | undefined>();

  useEffect(() => {
    setVote(data.userVote);
  }, []);

  const handleVoteVideo = (type: 'up' | 'down') => {
    setVote(type);
  };

  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#E9D18C';
      case 2:
        return '#DEE1EF';
      case 3:
        return '#FDE6CA';
      default:
        return '#FFFFFF00';
    }
  };

  if (data) {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <Image
            src={data.thumbnail ?? placeholderVideo}
            alt={`${data.title ?? ''} video thumbnail`}
            className={styles.thumbnail}
          />
          <Link href={`/videos/${data.id}`} className={styles.videoLink}>
            <div className={styles.videoTitle}>{data.title ?? '-'}</div>
            <div className={styles.viewsWrapper}>
              <ViewsIcon />
              <div className={styles.videoViews}>{data.views ?? '-'} views</div>
            </div>
          </Link>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.voteContainer}>
            <button
              onClick={() => {
                handleVoteVideo('up');
              }}
              className={`${styles.voteButton} ${styles.upVote} ${
                vote === 'up' ? styles.activeUpVote : ''
              }`}
            >
              {/* up icon  */}
              <FontAwesomeIcon className={styles.icon} icon={faArrowUp} />
              <div>{data.upvote ?? '-'}</div>
            </button>
            <button
              onClick={() => {
                handleVoteVideo('down');
              }}
              className={`${styles.voteButton} ${styles.downVote} ${
                vote === 'down' ? styles.activeDownVote : ''
              }`}
            >
              {/* down icon  */}
              <FontAwesomeIcon className={styles.icon} icon={faArrowDown} />
              <div>{data.downvote ?? ''}</div>
            </button>
          </div>

          <div className={styles.userContainer}>
            <div className={styles.userInfo}>
              <Image
                src={data.avatar ?? placeholderAvatar}
                className={styles.avatar}
                alt='avatar'
              />
              <div className={styles.userName}>{data.name ?? '-'}</div>
            </div>
            {data.rank && (data.rank === 1 || data.rank === 2 || data.rank === 3) && (
              <div className={styles.badge}>
                <FontAwesomeIcon
                  icon={faCertificate}
                  className={styles.certificateIcon}
                  style={{
                    color: `${getBadgeColor(data.rank)}50`
                  }}
                />
                {/* badge icon  */}
                <div
                  className={styles.rankNumber}
                  style={{
                    color: getBadgeColor(data.rank)
                  }}
                >
                  {data.rank}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default VideoCard;
