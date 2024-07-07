import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import React from 'react';
import styles from './communitywins.module.scss';
import VideoCard from '@/components/VideoCard/VideoCard';
import VideoHeader from '@/components/VideoHeader/VideoHeader';
import { Grid } from '@mantine/core';
const index = () => {
  const placeholder = [1, 2, 3, 4, 5];
  const placeholder2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Layout>
      <PageHeader title='Community Wins' />

      <div className={styles.container}>
        <div className={styles.videoSection}>
          <VideoHeader type='trophy' viewUrl='/videos' showViewAllButton={true}>
            Best Clips
          </VideoHeader>
          <div className={styles.bestVideoGrid}>
            {placeholder.map((item, index) => {
              return (
                <VideoCard
                  key={index}
                  data={{
                    id: '123',
                    title: `This is video titile #${index}`,
                    views: '31K',
                    rank: index + 1,
                    name: 'string',
                    upvote: 1000,
                    downvote: 52
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.videoSection}>
          <VideoHeader type='default' viewUrl='/videos' showViewAllButton={true}>
            Recents
          </VideoHeader>
          <div className={styles.videoGrid}>
            {placeholder2.map((item, index) => {
              return (
                <VideoCard
                  key={index}
                  data={{
                    id: '123',
                    title: `This is video titile #${index}`,
                    views: '31K',
                    rank: index + 1,
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

export default index;
