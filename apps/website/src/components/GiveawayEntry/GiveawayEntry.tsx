import clsx from 'clsx';
import classes from './GiveawayEntry.module.scss';

function GiveawayEntry({ position }: { position: number }) {
  return (
    <div className={clsx(classes.root, classes.unclaimed)}>
      <p className={classes.position}>{position}</p>
    </div>
  );
}

export default GiveawayEntry;
