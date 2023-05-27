import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

import classes from './FooterSocialButton.module.scss';

function FooterSocialButton({ icon, href }: { icon: IconDefinition; href: string }) {
  return (
    <motion.a href={href} target='_blank' className={classes.root} whileHover={{ y: -2 }}>
      <FontAwesomeIcon icon={icon} />
    </motion.a>
  );
}

export default FooterSocialButton;
