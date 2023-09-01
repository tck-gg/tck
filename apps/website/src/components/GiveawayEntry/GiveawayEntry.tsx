import clsx from 'clsx';

import classes from './GiveawayEntry.module.scss';

function GiveawayEntry({ position, display }: { position: number; display?: string }) {
  return (
    <div className={clsx(classes.root, !display && classes.unclaimed)}>
      {display ? (
        <p className={classes.display}>{display}</p>
      ) : (
        <p className={classes.position}>{position}</p>
      )}
    </div>
  );
}

export default GiveawayEntry;
