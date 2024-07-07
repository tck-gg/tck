'use client';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import React, { useState } from 'react';
import styles from './videoclip.module.scss';
import Image from 'next/image';
import tempVideo from '../../../../images/videos/temp-video.png';
import placeholderAvatar from '../../../../images/videos/placeholder-avatar.jpg';
import Button from '@/components/ui/Button/Button';
import { faArrowDown, faArrowUp, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoCard from '@/components/VideoCard/VideoCard';
import SectionHeader from '@/components/SectionHeader/SectionHeader';

const VideoClipPage = () => {
  const [vote, setVote] = useState<'up' | 'down' | undefined>();

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
  return (
    <Layout title='Video Clips'>
      <PageHeader title='Video Clips' />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div>
            <Button variant='secondary' leftIcon={faChevronLeft}>
              Back
            </Button>
          </div>

          <div className={styles.videoSection}>
            <div className={styles.videoContainer}>
              <Image
                src={tempVideo}
                alt='replace me with actual video'
                className={styles.videoImage}
              />
            </div>
            <div className={styles.videoInfoContainer}>
              <div className={styles.header}>
                <div className={styles.avatarSection}>
                  <Image src={placeholderAvatar} className={styles.avatarImage} alt='avatar' />
                  <div className={styles.channelName}>Madness Channel</div>
                </div>

                <div
                  className={styles.badge}
                  style={{
                    backgroundColor: `${getBadgeColor(1)}50`,
                    color: getBadgeColor(1)
                  }}
                >
                  <div>1</div>
                </div>
              </div>

              <div className={styles.descriptionSection}>
                <div className={styles.title}>{'Video title here'}</div>

                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <div className={styles.statsSection}>
                  <div className={styles.views}>{'31K'} views</div>

                  <div className={styles.date}>2 Jan, 2023</div>
                </div>
              </div>

              <div className={styles.voteSection}>
                <div className={styles.voteButtons}>
                  <button
                    onClick={() => {
                      handleVoteVideo('up');
                    }}
                    className={`${styles.voteButton} ${styles.upVote} ${
                      vote === 'up' ? styles.activeVote : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />
                    <div>123</div>
                  </button>
                  <button
                    onClick={() => {
                      handleVoteVideo('down');
                    }}
                    className={`${styles.voteButton} ${styles.downVote} ${
                      vote === 'down' ? styles.activeVote : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
                    <div>23</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.moreVideoSection}>
          <SectionHeader type='youtube' showHeaderAcc={true}>
            More Video
          </SectionHeader>
          <div className={styles.moreVideoGrid}>
            <VideoCard
              data={{
                id: '1234',
                title: 'This is video titile',
                views: '31K',
                rank: 1,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
            <VideoCard
              data={{
                id: '123',
                title: 'This is video titile',
                views: '31K',
                rank: 1,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
            <VideoCard
              data={{
                id: '1235',
                title: 'This is video titile',
                views: '31K',
                rank: 2,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
            <VideoCard
              data={{
                id: '1236',
                title: 'This is video titile',
                views: '31K',
                rank: 3,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoClipPage;
