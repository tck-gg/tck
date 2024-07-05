import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import coin from '../../images/coin.png';
import coinBackground from '../../images/store/coin-background.png';
import imageBackground from '../../images/store/image-background.png';
import item1 from '../../images/store/item-1.png';
import item2 from '../../images/store/item-2.png';
import item3 from '../../images/store/item-3.png';
import item4 from '../../images/store/item-4.png';

import styles from './store.module.scss';
import Image from 'next/image';
import {
  faCaretDown,
  faChevronRight,
  faInfo,
  faInfoCircle,
  faLayerGroup,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/components/ui/Button/Button';

function Store() {
  const items = [
    {
      id: '1',
      name: 'Airpods Pro',
      description: 'Apple',
      price: 250000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 100,
      image: item1
    },
    {
      id: '2',
      name: '$100 Bitcoin',
      description: 'Cryptocurrency',
      price: 260000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 100,
      image: item2
    },
    {
      id: '3',
      name: '$240 Bonus Buy',
      description: 'Sweet Bonanza XMAS',
      price: 250000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 0,
      image: item3
    },
    {
      id: '4',
      name: '$240 Bonus Buy',
      description: 'Gates of Olympus',
      price: 250000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 0,
      image: item4
    },
    {
      id: '5',
      name: 'Airpods Pro',
      description: 'Apple',
      price: 250000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 100,
      image: item1
    },
    {
      id: '6',
      name: '$100 Bitcoin',
      description: 'Cryptocurrency',
      price: 250000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 100,
      image: item2
    },
    {
      id: '7',
      name: '$240 Bonus Buy',
      description: 'Sweet Bonanza XMAS',
      price: 250000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 0,
      image: item3
    },
    {
      id: '8',
      name: '$240 Bonus Buy',
      description: 'Gates of Olympus',
      price: 250000,
      tooltip: 'lorem ipsum dolor amet',
      stock: 0,
      image: item4
    }
  ];

  return (
    <Layout title='Store'>
      <PageHeader title='Store' />
      <div className={styles.storePage}>
        <div className={styles.searchBar}>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input type='text' placeholder='Search...' className={styles.searchInput} />
          </div>

          <div className={styles.buttonGroup}>
            <Button rightIcon={faCaretDown}>All Items</Button>
            <Button rightIcon={faCaretDown}>Price Ascending</Button>
          </div>
        </div>

        <div className={styles.itemsGrid}>
          {items.map((item, index) => {
            return (
              <div key={item.id} className={styles.itemCard}>
                <button className={styles.tooltipButton}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>

                <div className={styles.itemContent}>
                  {/* Item image  */}
                  <div className={styles.itemImageContainer}>
                    <Image
                      src={imageBackground}
                      alt='Image background'
                      className={styles.imageBackground}
                    />
                    <Image src={item.image} alt='Item' className={styles.itemImage} />
                  </div>
                  {/* Item details  */}
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemDescription}>{item.description}</div>
                  </div>

                  {/* Price details */}
                  <div className={styles.priceContainer}>
                    <Image
                      src={coinBackground}
                      alt='Coin background'
                      className={styles.coinBackground}
                    />
                    <div className={styles.priceContent}>
                      <Image src={coin} alt='Coin' width={20} />
                      <div className={styles.price}>{item.price}</div>
                    </div>
                  </div>

                  {/* Action button */}

                  <Button
                    variant={item.stock >= 1 ? 'gradient' : 'secondary'}
                    fullWidth={true}
                    color='white'
                    rightIcon={faChevronRight}
                    disabled={item.stock <= 0}
                  >
                    Purchase
                  </Button>
                </div>
                {/* stock details  */}
                <div className={styles.stockContainer}>
                  {item.stock > 0 && (
                    <div className={styles.inStock}>
                      <div className={styles.stockText}>
                        <FontAwesomeIcon icon={faLayerGroup} width={12} />
                        <div>Stock</div>
                      </div>
                      <div className={styles.stockQuantity}>{item.stock}</div>
                    </div>
                  )}
                  {item.stock <= 0 && <div className={styles.outOfStock}>Out of Stock</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Store;
