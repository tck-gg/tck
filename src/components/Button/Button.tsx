import clsx from 'clsx';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Button.module.scss';

type ButtonVariants = 'primary' | 'secondary' | 'gradient';

function Button({
  children,
  variant = 'secondary',
  leftIcon,
  rightIcon,
  borderRadius,
  onClick
}: {
  children: string;
  variant?: ButtonVariants;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  borderRadius?: number;
  onClick?: (props: any) => void;
}) {
  function handleClick() {
    onClick && onClick({});
  }

  return (
    <div
      className={clsx(classes.root, classes[variant])}
      onClick={handleClick}
      style={{ borderRadius }}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      <p className={classes.text}>{children}</p>
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </div>
  );
}

export default Button;
