import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Copy from '../svg/Copy';
import Jagged from '../svg/Jagged';

import classes from './AffiliateBoxCodeBox.module.scss';

function AffiliateBoxCodeBox({ children }: { children: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(children);
    setHasCopied(true);
  }

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 1500);
    }
  }, [hasCopied]);

  return (
    <div className={classes.root}>
      <Jagged className={classes.background} />

      <span className={classes.code}>{children}</span>

      {hasCopied ? (
        <FontAwesomeIcon
          icon={faCheck}
          className={clsx(classes.copy, classes.copied)}
          color='#3fb950'
        />
      ) : (
        <span onClick={handleClick} className={classes.copy}>
          <Copy />
        </span>
      )}
    </div>
  );
}

export default AffiliateBoxCodeBox;
