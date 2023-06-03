import Image from 'next/image';
import FeaturedBadge from '../FeaturedBadge/FeaturedBadge';

import { AffiliateTag } from '@/types/affiliate';

import classes from './AffiliateBox.module.scss';

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
  return (
    <div className={classes.root}>
      {featured && <FeaturedBadge />}
      <div className={classes.top}>
        <div className={classes.image}>
          <Image src={image} alt={name} width={142} height={39} />
        </div>
        <div className={classes.info}>
          <div className={classes.reward}>{reward}</div>
          <div className={classes.name}>{name}</div>
          <div className={classes.code}>{code}</div>
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
