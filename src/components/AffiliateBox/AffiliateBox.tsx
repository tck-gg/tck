import Image from 'next/image';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import AffiliateBoxFeaturedBadge from '../AffiliateBoxFeaturedBadge/AffiliateBoxFeaturedBadge';
import Button from '../Button/Button';

import { AffiliateTag } from '@/types/affiliate';

import classes from './AffiliateBox.module.scss';
import AffiliateBoxCodeBox from '../AffiliateBoxCodeBox/AffiliateBoxCodeBox';

function AffiliateBox({
  image,
  reward,
  name,
  code,
  link,
  tags,
  featured
}: {
  image: string;
  reward: string;
  name: string;
  code: string;
  link: string;
  tags: AffiliateTag[];
  featured?: boolean;
}) {
  function handleButtonClick() {
    window.open(link, '_blank');
  }

  return (
    <div className={clsx(classes.root, featured && classes.featured)}>
      {featured && <AffiliateBoxFeaturedBadge />}
      <div className={classes.top}>
        <div className={classes.image}>
          <Image src={image} alt={name} width={200} height={100} style={{ objectFit: 'contain' }} />
        </div>
        <div className={classes.content}>
          <div className={classes.info}>
            <div className={classes.reward}>{reward}</div>
            <div className={classes.name}>{name}</div>
          </div>
          <div className={classes.redeem}>
            <AffiliateBoxCodeBox>{code}</AffiliateBoxCodeBox>
            <Button rightIcon={faAngleRight} variant='gradient' onClick={handleButtonClick}>
              Claim
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        {tags.map((tag) => {
          return (
            <span className={classes.tag} key={tag}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default AffiliateBox;
