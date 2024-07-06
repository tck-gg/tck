import React from 'react';
import styles from './videoscategory.module.scss';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import VideoCard from '@/components/VideoCard/VideoCard';
import VideoHeader from '@/components/VideoHeader/VideoHeader';

const VideosCategoryPage = () => {
  const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <Layout title='Video Clips'>
      <PageHeader title='Video Clips' />
      <div className={styles.container}>
        <div className={styles.videoSection}>
          <VideoHeader type='youtube' viewUrl='/videos' showBackButton={true}>
            Youtube
          </VideoHeader>
          <div className={styles.videoGrid}>
            {counter.map((data, index) => {
              return (
                <VideoCard
                  key={index}
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
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideosCategoryPage;
