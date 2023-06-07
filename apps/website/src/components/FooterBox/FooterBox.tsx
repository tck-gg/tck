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

import FooterSocialButton from '../FooterSocialButton/FooterSocialButton';
import GamblingAwareBox from '../GamblingAwareBox/GamblingAwareBox';

import { useAuth } from '@/hooks/auth';

import classes from './FooterBox.module.scss';

import tckLogo from '@/images/logo.png';

const footerSocialItems: { icon: IconDefinition; href: string }[] = [
  {
    icon: faDiscord,
    href: 'https://discord.com/invite/TCK'
  },
  {
    icon: faInstagram,
    href: 'https://www.instagram.com/livetck/'
  },
  {
    icon: faTwitter,
    href: 'https://twitter.com/TCKTwitch'
  },
  {
    icon: faTwitch,
    href: 'https://www.twitch.tv/livetck'
  },
  {
    icon: faYoutube,
    href: 'https://www.youtube.com/channel/UCJZcsYCqoQ13KtCtApTfLaQ'
  },
  {
    icon: faTiktok,
    href: 'https://www.tiktok.com/@tckhighlights'
  }
];

function FooterBox() {
  const auth = useAuth();
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.firstRow}>
          <div className={classes.brand}>
            <Image
              width={77}
              height={35}
              src={tckLogo}
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
          {auth.user?.isAdmin && (
            <a
              href={
                process.env.NODE_ENV === 'development'
                  ? 'http://localhost:8001/'
                  : 'https://admin.tck.hunterparcells.com'
              }
              target='_blank'
            >
              ADMIN PANEL
            </a>
          )}
        </div>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.bottom}>
        <GamblingAwareBox />
        <p className={classes.disclaimer}>
          We do not take responsibility for any losses from gambling in casinos and betting sites
          which are linked or promoted on our website(s). As a player, you are responsible for your
          bets.
        </p>
      </div>
    </div>
  );
}

export default FooterBox;
