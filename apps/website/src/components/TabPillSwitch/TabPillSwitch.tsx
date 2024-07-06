'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './tabpillswitch.module.scss';

type Tabs = {
  name: string;
  image: any;
};

interface Props {
  tabs: Tabs[];
  activeTab: string;
  setActiveTab: (name: string) => void;
}

const TabPillSwitch = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((item, index) => {
        return (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name);
            }}
            className={`${styles.tabButton} ${
              activeTab === item.name ? styles.activeTab : styles.inactiveTab
            }`}
          >
            <Image
              src={item.image}
              alt={`${item.name} logo`}
              className={`${styles.logo} ${activeTab === item.name ? '' : styles.inactiveLogo}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default TabPillSwitch;
