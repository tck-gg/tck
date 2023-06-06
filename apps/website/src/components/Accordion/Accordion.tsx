import { useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import classes from './Accordion.module.scss';

function Accordion({ title, content }: { title: string; content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={classes.root}>
      <div className={classes.top} onClick={toggleAccordion}>
        <p>{title}</p>
        <span>
          <FontAwesomeIcon
            className={clsx(classes.icon, isOpen && classes.openIcon)}
            icon={faAngleDown}
          />
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={classes.bottom}
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto'
            }}
            exit={{
              opacity: 0,
              height: 0
            }}
            transition={{
              duration: 0.15
            }}
          >
            <div className={classes.content}>{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
