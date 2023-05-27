import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

import classes from './FooterSocialButton.module.scss';

function FooterSocialButton({ icon, href }: { icon: IconDefinition; href: string }) {
  return (
    <a href={href} target='_blank'>
      <motion.div whileHover={{ y: -2 }} className={classes.root}>
        <FontAwesomeIcon icon={icon} />
      </motion.div>
    </a>
  );
}

export default FooterSocialButton;
