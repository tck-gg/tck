import clsx from 'clsx';

import Jagged from '../svg/Jagged';

import classes from './JaggedBackgroundItem.module.scss';

function JaggedBackgroundItem({
  children,
  fill,
  withShadow
}: {
  children: string | JSX.Element;
  fill: string;
  withShadow?: boolean;
}) {
  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <Jagged
        className={clsx(classes.background, withShadow && classes.shadow)}
        style={{
          fill
        }}
      />
    </div>
  );
}

export default JaggedBackgroundItem;
