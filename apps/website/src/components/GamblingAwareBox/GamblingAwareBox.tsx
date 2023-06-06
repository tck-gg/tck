import AgeWarning from '../svg/AgeWarning';

import classes from './GamblingAwareBox.module.scss';

function GamblingAwareBox() {
  return (
    <a href='https://www.begambleaware.org/' target='_blank' className={classes.root}>
      <div className={classes.responsibleGamblingBox}>
        <AgeWarning />
        <p>Responsible Gambling</p>
      </div>
    </a>
  );
}

export default GamblingAwareBox;
