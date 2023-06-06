import Copy from '../svg/Copy';
import Jagged from '../svg/Jagged';

import classes from './AffiliateBoxCodeBox.module.scss';

function AffiliateBoxCodeBox({ children }: { children: string }) {
  function handleClick() {
    navigator.clipboard.writeText(children);
  }

  return (
    <div className={classes.root}>
      <Jagged className={classes.background} />
      <span className={classes.code}>{children}</span>
      <span onClick={handleClick} className={classes.copy}>
        <Copy />
      </span>
    </div>
  );
}

export default AffiliateBoxCodeBox;
