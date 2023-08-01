import clsx from 'clsx';

import classes from './EntryCounter.module.scss';

function EntryCounter({ count, max }: { count: number; max: number }) {
  return (
    <p>
      <span className={classes.entries}>{count}</span>
      <span className={clsx(classes.maxEntries, classes.grey)}>/{max.toLocaleString()}</span>
    </p>
  );
}

export default EntryCounter;
