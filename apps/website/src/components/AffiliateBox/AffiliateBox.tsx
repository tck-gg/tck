import Image, { StaticImageData } from 'next/image';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import BoxBadge from '../BoxBadge/BoxBadge';
import AffiliateBoxCodeBox from '../AffiliateBoxCodeBox/AffiliateBoxCodeBox';
import Button from '@/components/ui/Button/Button';

import { AffiliateTag, IAffiliateCode } from '@/types/affiliate';

import classes from './AffiliateBox.module.scss';

function AffiliateBox({
  image,
  reward,
  name,
  codes,
  tags,
  featured,
  isOffPage
}: {
  image: StaticImageData;
  reward: string;
  name: string;
  codes: IAffiliateCode[];
  tags: AffiliateTag[];
  featured?: boolean;
  isOffPage?: boolean;
}) {
  const router = useRouter();

  function handleClick(link: string) {
    if (isOffPage) {
      router.push('/affiliates');
      return;
    }
    window.open(link, '_blank');
  }

  return (
    <div className={clsx(classes.root, featured && classes.featured)}>
      {featured && <BoxBadge>FEATURED</BoxBadge>}
      <div className={classes.top}>
        <div className={classes.image}>
          <Image src={image} alt={name} width={200} height={75} style={{ objectFit: 'contain' }} />
        </div>
        <div className={classes.info}>
          <div className={classes.reward}>{reward}</div>
          <div className={classes.name}>{name}</div>
        </div>
        <div className={classes.redeemWrapper}>
          {codes.map((code) => {
            return (
              <div className={classes.redeem} key={code.code}>
                <AffiliateBoxCodeBox>{code.code}</AffiliateBoxCodeBox>
                <Button
                  rightIcon={faAngleRight}
                  variant='gradient'
                  onClick={() => {
                    handleClick(code.link);
                  }}
                >
                  Claim
                </Button>
              </div>
            );
          })}
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
