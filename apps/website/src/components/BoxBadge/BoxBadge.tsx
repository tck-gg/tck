import Gift from '../svg/Gift';

import classes from './BoxBadge.module.scss';

function BoxBadge({ children }: { children: string }) {
  return (
    <div className={classes.root}>
      <Gift />
      <p>{children}</p>
    </div>
  );
}

export default BoxBadge;
