import clsx from 'clsx';

import Jagged from '../svg/Jagged';

import classes from './JaggedBackgroundItem.module.scss';

function JaggedBackgroundItem({
  children,
  fill,
  withShadow,
  fullWidth
}: {
  children: string | JSX.Element;
  fill: string;
  withShadow?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={clsx(classes.root, fullWidth && classes.fullWidth)}>
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
