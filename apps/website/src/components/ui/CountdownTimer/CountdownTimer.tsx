import { Display } from 'react-7-segment-display';

import classes from './CountdownTimer.module.scss';

function CountdownTimer({
  days,
  hours,
  minutes
}: {
  days: number;
  hours: number;
  minutes: number;
}) {
  const now = new Date();

  return (
    <div className={classes.root}>
      <div className={classes.displayGroup}>
        <Display value={days.toString()} color='#9391c9' height={28} count={2} skew={false} />
        <p>Days</p>
      </div>
      <span>:</span>
      <div className={classes.displayGroup}>
        <Display value={hours.toString()} color='#9391c9' height={28} count={2} skew={false} />
        <p>Hours</p>
      </div>
      <span>:</span>
      <div className={classes.displayGroup}>
        <Display value={minutes.toString()} color='#9391c9' height={28} count={2} skew={false} />
        <p>Mins</p>
      </div>
    </div>
  );
}

export default CountdownTimer;
