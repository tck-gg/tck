import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import classes from './AffiliateBoxCodeBox.module.scss';

function AffiliateBoxCodeBox({ children }: { children: string }) {
  function handleClick() {
    navigator.clipboard.writeText(children);
  }

  return (
    <div className={classes.root}>
      <span className={classes.code}>{children}</span>
      <FontAwesomeIcon icon={faCopy} onClick={handleClick} />
    </div>
  );
}

export default AffiliateBoxCodeBox;
