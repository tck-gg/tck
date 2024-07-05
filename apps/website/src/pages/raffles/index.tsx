import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import coin from '../../images/coin.png';
import coinBackground from '../../images/coin-background.png';
import imageBackground from '../../images/store/image-background.png';
import styles from './raffles.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faClock,
  faHistory,
  faTimesCircle,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/ui/Button/Button';

function Raffles() {
  const items = [
    {
      id: '1',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: true,
      watchUrl: 'https://google.com'
    },
    {
      id: '2',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: true,
      watchUrl: 'https://google.com'
    },
    {
      id: '3',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: false,
      watchUrl: 'https://google.com'
    },
    {
      id: '4',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: false,
      watchUrl: 'https://google.com'
    },
    {
      id: '13',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: false,
      watchUrl: 'https://google.com'
    },
    {
      id: '44',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: true,
      watchUrl: 'https://google.com'
    },
    {
      id: '55',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: false,
      watchUrl: 'https://google.com'
    },
    {
      id: '66',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: false,
      watchUrl: 'https://google.com'
    },
    {
      id: '77',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: false,
      watchUrl: 'https://google.com'
    },
    {
      id: '8',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: true,
      watchUrl: 'https://google.com'
    },
    {
      id: '5',
      name: 'TCK Points',
      description: 'Currency',
      price: 50000,
      image: coin,
      spot: 500,
      filled: 39,
      done: true,
      watchUrl: 'https://google.com'
    }
  ];

  const counter = [1, 2, 3, 4];

  return (
    <Layout title='Raffles'>
      <PageHeader title='Raffles' />
      <div className={styles.rafflePage}>
        <div className={styles.itemsContainer}>
          {items.map((item, index) => {
            if (!item.done) {
              return (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.coinButton}>
                    <div className={styles.coinButtonContent}>
                      <Image
                        src={coinBackground}
                        alt='Coin background'
                        className={styles.coinBackground}
                      />
                      <div className={styles.coinDetails}>
                        <Image
                          className={styles.coinImage}
                          src={coin}
                          alt='Coin'
                          width={20}
                          height={10}
                        />
                        <div className={styles.coinPrice}>{item.price}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemImageContainer}>
                      <Image src={item.image} alt='Item' className={styles.itemImage} />
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemDescription}>{item.description}</div>
                    </div>
                    <Button
                      variant='gradient'
                      color='#ffffff'
                      rightIcon={faChevronRight}
                      fullWidth={true}
                    >
                      Enter Raffle
                    </Button>
                  </div>
                  <div className={styles.stockDetails}>
                    <div className={styles.ticketPrice}>
                      <div className={styles.priceContainer}>
                        <Image className={styles.coinImage} src={coin} alt='Coin' />
                        <div className={styles.price}>{item.price}</div>
                      </div>
                      <div className={styles.priceLabel}>Ticket Price</div>
                    </div>
                    <div className={styles.spots}>
                      <div className={styles.spotsContainer}>
                        <FontAwesomeIcon icon={faUserCircle} className={styles.spotIcon} />
                        <div>
                          <span className={styles.filled}>{item.filled}</span>
                          <span className={styles.totalSpots}>/{item.spot}</span>
                        </div>
                      </div>
                      <div className={styles.spotsLabel}>Spots</div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className={styles.finishedRafflesContainer}>
          <div className={styles.finishedRafflesHeader}>
            <FontAwesomeIcon icon={faHistory} />
            <div className={styles.finishedRafflesTitle}>Finished Raffles</div>
          </div>
          <div className={styles.finishedRafflesItems}>
            {items
              .filter((item) => {
                return item.done;
              })
              .slice(0, 4)
              .map((item, index) => {
                if (item.done) {
                  return (
                    <div key={item.id} className={styles.itemCard}>
                      <div className={styles.coinButton}>
                        <div className={styles.coinButtonContent}>
                          <Image
                            src={coinBackground}
                            alt='Coin background'
                            className={styles.coinBackground}
                          />
                          <div className={styles.coinDetails}>
                            <Image className={styles.coinImage} src={coin} alt='Coin' />
                            <div className={styles.coinPrice}>{item.price}</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.itemContent}>
                        <div className={styles.itemImageContainer}>
                          <Image src={item.image} alt='Item' className={styles.itemImage} />
                        </div>
                        <div className={styles.itemDetails}>
                          <div className={styles.itemName}>{item.name}</div>
                          <div className={styles.itemDescription}>{item.description}</div>
                        </div>
                        <Button
                          variant='secondary'
                          color='#ffffff'
                          rightIcon={faChevronRight}
                          fullWidth={true}
                        >
                          Watch Raffle
                        </Button>
                      </div>
                      <div className={styles.stockDetails}>
                        <div className={styles.ticketPrice}>
                          <div className={styles.priceContainer}>
                            <Image className={styles.coinImage} src={coin} alt='Coin' />
                            <div className={styles.price}>{item.price}</div>
                          </div>
                          <div className={styles.priceLabel}>Ticket Price</div>
                        </div>
                        <div className={styles.spots}>
                          <div className={styles.spotsContainer}>
                            <FontAwesomeIcon icon={faUserCircle} className={styles.spotIcon} />
                            <div>
                              <span className={styles.filled}>{item.filled}</span>
                              <span className={styles.totalSpots}>/{item.spot}</span>
                            </div>
                          </div>
                          <div className={styles.spotsLabel}>Spots</div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
          {items.filter((item) => {
            return item.done;
          }).length > 4 && (
            <div className={styles.loadMoreContainer}>
              <div className={styles.loadMoreOverlay}>
                <Button variant='secondary' rightIcon={faChevronRight} color='#ffffff'>
                  Load More
                </Button>
              </div>
              {counter.map((item, index) => {
                return (
                  <div key={index} className={styles.loadMoreCard}>
                    <div className={styles.stockDetails}>
                      <div className={styles.ticketPrice}>
                        <div className={styles.priceContainer}>
                          <Image className={styles.coinImage} src={coin} alt='Coin' />
                          <div className={styles.price}>50000</div>
                        </div>
                        <div className={styles.priceLabel}>Ticket Price</div>
                      </div>
                      <div className={styles.spots}>
                        <div className={styles.spotsContainer}>
                          <FontAwesomeIcon icon={faUserCircle} className={styles.spotIcon} />
                          <div>
                            <span className={styles.filled}>50</span>
                            <span className={styles.totalSpots}>/50</span>
                          </div>
                        </div>
                        <div className={styles.spotsLabel}>Spots</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Raffles;
