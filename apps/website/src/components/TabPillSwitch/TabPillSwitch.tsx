import React from 'react';
import Image from 'next/image';

import classes from './TabPillSwitch.module.scss';

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
    <div className={classes.tabContainer}>
      {tabs.map((item, index) => {
        return (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name);
            }}
            className={`${classes.tabButton} ${
              activeTab === item.name ? classes.activeTab : classes.inactiveTab
            }`}
          >
            <Image
              src={item.image}
              alt={`${item.name}`}
              className={`${classes.logo} ${activeTab === item.name ? '' : classes.inactiveLogo}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default TabPillSwitch;
