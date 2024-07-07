'use client';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import React, { useState } from 'react';
import styles from './communitywins.module.scss';
import VideoCard from '@/components/VideoCard/VideoCard';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import { Grid } from '@mantine/core';

import colourfulBackground from '../../images/community-wins/colourful-background.png';
import stepsBackground from '../../images/community-wins/steps-background.png';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import { faChevronRight, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Index = () => {
  const placeholder = [1, 2, 3, 4, 5];
  const placeholder2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      id: 1,
      title: 'Use Our Codes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      title: 'Win a Bonus',
      description:
        'Test your luck on the featured sites, win and submit your clips to win even more!'
    },
    {
      id: 3,
      title: 'Submit Clips',
      description:
        'Submit your clips and get rewarded! The clip from each platform with the biggest upvotes wins.'
    }
  ];
  return (
    <Layout>
      <PageHeader title='Community Wins' />

      <div className={styles.container}>
        <div className={styles.stepsWrapper}>
          <div className={styles.stepSection}>
            <Image
              src={stepsBackground}
              alt='Step background'
              className={styles.stepBackground}
            ></Image>

            <div className={styles.gradientCircle}></div>

            <div className={styles.header}>
              <span className={styles.stepText}>
                <Image
                  src={colourfulBackground}
                  alt='Header background'
                  className={styles.headerBackground}
                ></Image>
                {`Step ${activeStep + 1}`}
              </span>
            </div>

            <div className={styles.stepTitle}>{steps[activeStep].title}</div>
            <div className={styles.stepDescription}>{steps[activeStep].description}</div>

            <div className={styles.stepIndicatorContainer}>
              <div className={styles.stepIndicators}>
                {steps.map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        setActiveStep(index);
                      }}
                      className={`${styles.stepIndicator} ${
                        activeStep === index ? styles.activeStepIndicator : ''
                      }`}
                    ></span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <div className={styles.formLabel}>
                <FontAwesomeIcon icon={faVideo} className={styles.icon} />
                <div className={styles.labelText}>Clip Link</div>
              </div>

              <input type='text' className={styles.inputField} placeholder='Clip Link...' />

              <Button
                variant='gradient'
                color='#ffffff'
                rightIcon={faChevronRight}
                fullWidth={true}
              >
                Submit Clip
              </Button>
              <p className={styles.formDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.videoSection}>
          <SectionHeader
            type='trophy'
            viewUrl='/videos'
            showViewAllButton={true}
            showHeaderAcc={true}
          >
            Best Clips
          </SectionHeader>
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
          <SectionHeader
            type='default'
            viewUrl='/videos'
            showViewAllButton={true}
            showHeaderAcc={true}
          >
            Recents
          </SectionHeader>
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

export default Index;
