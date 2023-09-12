import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

import classes from './FooterSocialButton.module.scss';
import SmallButton from '@/components/ui/SmallButton/SmallButton';

function FooterSocialButton({ icon, href }: { icon: IconDefinition; href: string }) {
  return (
    <motion.a href={href} target='_blank' whileHover={{ y: -2 }} className={classes.root}>
      <SmallButton icon={icon} />
    </motion.a>
  );
}

export default FooterSocialButton;
