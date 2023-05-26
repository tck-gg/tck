import FooterBackground from '../FooterBackground/FooterBackground';
import FooterBox from '../FooterBox/FooterBox';

import classes from './Footer.module.scss';

function Footer() {
  return (
    <>
      <div className={classes.background}>
        <FooterBackground />
      </div>
      <FooterBox />
    </>
  );
}

export default Footer;
