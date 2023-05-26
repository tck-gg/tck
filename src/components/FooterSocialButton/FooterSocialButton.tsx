import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import classes from './FooterSocialButton.module.scss';

function FooterSocialButton({ icon, href }: { icon: IconDefinition; href: string }) {
  return (
    <a href={href} target='_blank'>
      <div className={classes.root}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </a>
  );
}

export default FooterSocialButton;
