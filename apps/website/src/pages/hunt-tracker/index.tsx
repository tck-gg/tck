import React, { useState } from 'react';
import styles from './hunttracker.module.scss';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import profilePicture from '../../images/hunt-tracker/profile-picture.png';
import sugarRush from '../../images/hunt-tracker/sugar-rush.png';
import madameDestiny from '../../images/hunt-tracker/madame-destiny.png';
import releaseKraken from '../../images/hunt-tracker/release-kraken.png';
import multiBackground from '../../images/hunt-tracker/multi-background.png';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import { faAward, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@mantine/core';
import PredictioModal from '@/components/Modal/Prediction/PredictionModal';

import AccountModal from '@/components/Modal/Account/AccountModal';

const HuntTrackerPage = () => {
  const [showPredictionModal, setShowPredictionModal] = useState(false);

  const tableData = [
    {
      id: '2',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '3',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '4',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '5',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '6',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '7',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '8',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '9',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '10',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '11',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '12',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '13',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '14',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '15',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    },
    {
      id: '',
      name: 'Eye of Cleopatra',
      description: 'Pragmatic Play',
      price: '$10',
      multiplier: '51.00x',
      total: '$800.39'
    }
  ];

  const bottomData = [
    {
      name: 'Sugar Rush',
      description: 'Pragmatic Play',
      type: 'Highest Multi',
      data: '240x',
      img: sugarRush
    },
    {
      name: 'Madame Destiny Megaways',
      description: 'Pragmatic Play',
      type: 'Highest Win',
      data: '240x',
      img: madameDestiny
    },
    {
      name: 'Release the Kraken',
      description: 'Pragmatic Play',
      type: 'Lowest Win',
      data: '240x',
      img: releaseKraken
    }
  ];

  // const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Layout title='Hunt Tracker'>
      {/* <AccountModal
        isOpen={isOpen}
        open={() => {
          setIsOpen(true);
        }}
        close={() => {
          setIsOpen(false);
        }}
      ></AccountModal> */}
      <PageHeader title='Hunt Tracker' />
      <div className={styles.container}>
        <div className={styles.sideTableContainer}>
          <div className={styles.leftSideContainer}>
            <div className={`${styles.halfHeight} ${styles.p1rem}`}>
              <div className={styles.predictionHeader}>
                <FontAwesomeIcon icon={faAward} className={styles.awardIcon} />
                <div className={styles.predictionText}>Prediction</div>
              </div>
              <div className={styles.title}>Will we make any profit on this Bonus Hunt?</div>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '50%' }}></div>
                </div>
                <div className={styles.time}>2h 45m</div>
              </div>
              <div className={styles.voteContainer}>
                <div className={styles.voteOption}>
                  <div className={styles.voteBackground}></div>
                  <div className={styles.voteText}>Yes</div>
                  <div className={styles.voteCount}>104 Votes</div>
                </div>
                <div className={styles.voteOption}>
                  <div className={styles.voteBackground}></div>
                  <div className={styles.voteText}>No</div>
                  <div className={styles.voteCount}>486 Votes</div>
                </div>
              </div>
              <div className={styles.actionContainer}>
                <div className={styles.profilePictures}>
                  <div className={styles.profilePicture}>
                    <Image
                      src={profilePicture}
                      width={50}
                      height={50}
                      alt='Profile picture'
                      className=''
                    ></Image>
                  </div>
                  <div className={styles.profilePicture}>
                    <Image
                      src={profilePicture}
                      width={50}
                      height={50}
                      alt='Profile picture'
                    ></Image>
                  </div>
                  <div className={styles.profilePicture}>
                    <Image
                      src={profilePicture}
                      width={50}
                      height={50}
                      alt='Profile picture'
                    ></Image>
                  </div>
                </div>
                <div className={styles.profileDetails}>
                  <div className={styles.profileCount}>+238</div>
                  <div className={styles.moreText}>more</div>
                </div>
                <div className={styles.predictButtonContainer}>
                  <Button
                    onClick={() => {
                      setShowPredictionModal(true);
                    }}
                    variant='gradient'
                    rightIcon={faChevronRight}
                    color='white'
                  >
                    Predict
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.halfHeight}>
              <div className={styles.dateButtonContainer}>
                <button className={`${styles.dateButton} ${styles.activeDateButton}`}>
                  <div className={styles.dateButtonText}>S</div>
                  <div className={styles.dateButtonSubText}>6/6</div>
                </button>
                <button className={styles.dateButton}>
                  <div className={styles.dateButtonText}>F</div>
                  <div className={styles.dateButtonSubText}>5/6</div>
                </button>
                <button className={styles.dateButton}>
                  <div className={styles.dateButtonText}>T</div>
                  <div className={styles.dateButtonSubText}>4/6</div>
                </button>
                <button className={styles.dateButton}>
                  <div className={styles.dateButtonText}>W</div>
                  <div className={styles.dateButtonSubText}>3/6</div>
                </button>
                <button className={styles.dateButton}>
                  <div className={styles.dateButtonText}>T</div>
                  <div className={styles.dateButtonSubText}>2/6</div>
                </button>
                <button className={styles.dateButton}>
                  <div className={styles.dateButtonText}>M</div>
                  <div className={styles.dateButtonSubText}>1/6</div>
                </button>
                <div className={styles.dateButtonOverlay}></div>
              </div>
              <div className={styles.statsContainer}>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Total Bonuses</div>
                  <div className={styles.statsValue}>69</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Current Bonus</div>
                  <div className={styles.statsValue}>69</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Total Win</div>
                  <div className={styles.statsValue}>$3,150.500</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Date</div>
                  <div className={styles.statsValue}>19/06/2022</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Win/Bonus</div>
                  <div className={styles.statsValue}>$548.00</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>100x Wins</div>
                  <div className={styles.statsValue}>69</div>
                </div>
              </div>
              <div className={styles.averageStatsContainer}>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Average Bet</div>
                  <div className={styles.statsValue}>$500</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Average Win</div>
                  <div className={styles.statsValue}>$100</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statsLabel}>Average Multi</div>
                  <div className={styles.statsValue}>100.49x</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.searchBar}>
              <div className={styles.searchInputContainer}>
                <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                <input
                  type='text'
                  placeholder='Search for a Slot or a Provider...'
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.searchToggleContainer}>
                <Switch defaultChecked />
                <div>Results</div>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <tbody>
                  {tableData.map((item, index) => {
                    return (
                      <tr key={item.id} className={styles.tableRow}>
                        <td className={styles.tableCellIndex}>{index + 1}</td>
                        <td className={styles.tableCellName}>{item.name}</td>
                        <td className={styles.tableCellDescription}>{item.description}</td>
                        <td className={styles.tableCellPrice}>{item.price}</td>
                        <td className={styles.tableCellMultiplier}>{item.multiplier}</td>
                        <td className={styles.tableCellTotal}>{item.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          {bottomData.map((item, index) => {
            return (
              <div key={index} className={styles.bottomItem}>
                <div className={styles.imageContainer}>
                  <Image src={item.img} width={100} height={100} alt={item.name} />
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemDescription}>{item.description}</div>
                  <div className={styles.itemMultiContainer}>
                    <Image src={multiBackground} alt='multi background' />
                    <div className={styles.multiDetails}>
                      <div className={styles.multiType}>{item.type}</div>
                      <div className={styles.multiData}>{item.data}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PredictioModal
        isOpen={showPredictionModal}
        open={() => {
          setShowPredictionModal(true);
        }}
        close={() => {
          setShowPredictionModal(false);
        }}
      />
    </Layout>
  );
};

export default HuntTrackerPage;
