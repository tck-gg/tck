import Image from 'next/image';
import Link from 'next/link';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faDiscord,
  faInstagram,
  faTwitter,
  faTwitch,
  faYoutube,
  faTiktok
} from '@fortawesome/free-brands-svg-icons';

import AgeWarning from '../svg/AgeWarning';
import FooterSocialButton from '../FooterSocialButton/FooterSocialButton';

import classes from './Footer.module.scss';

// TODO: Get links.
const footerSocialItems: { icon: IconDefinition; href: string }[] = [
  {
    icon: faDiscord,
    href: 'https://example.com/'
  },
  {
    icon: faInstagram,
    href: 'https://example.com/'
  },
  {
    icon: faTwitter,
    href: 'https://example.com/'
  },
  {
    icon: faTwitch,
    href: 'https://example.com/'
  },
  {
    icon: faYoutube,
    href: 'https://example.com/'
  },
  {
    icon: faTiktok,
    href: 'https://example.com/'
  }
];

function Footer() {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.firstRow}>
          <div className={classes.brand}>
            <Image
              width={77}
              height={35}
              src='/img/logo.png'
              alt='logo'
              style={{ objectFit: 'contain' }}
            />
            <p>© Copyright 2023 TCK.GG</p>
          </div>
          <div className={classes.socialButtons}>
            {footerSocialItems.map(({ icon, href }) => {
              return <FooterSocialButton icon={icon} href={href} key={href} />;
            })}
          </div>
        </div>
        <div className={classes.secondRow}>
          <Link href='terms'>TERMS OF SERVICE</Link>
          <Link href='faq'>FREQUENTLY ASKED</Link>
          <Link href='privacy'>PRIVACY POLICY</Link>
        </div>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.bottom}>
        <div className={classes.responsibleGamblingBox}>
          <AgeWarning />
          <p>Responsible Gambling</p>
        </div>
        <p className={classes.disclaimer}>
          We do not take responsibility for any losses from gambling in casinos and betting sites
          which are linked or promoted on our website(s). As a player, you are responsible for your
          bets.
        </p>
      </div>
    </div>
  );
}

export default Footer;
