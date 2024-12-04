import clsx from 'clsx';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Button.module.scss';

type ButtonVariants = 'primary' | 'secondary' | 'gradient' | 'roobet';

function Button({
  children,
  variant = 'secondary',
  leftIcon,
  rightIcon,
  borderRadius,
  fullWidth,
  disabled,
  background,
  width,
  color,
  onClick
}: {
  children: string | JSX.Element;
  variant?: ButtonVariants;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  borderRadius?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  background?: string;
  width?: number;
  color?: string;
  onClick?: (props: any) => void;
}) {
  function handleClick() {
    if (disabled) {
      return;
    }
    onClick && onClick({});
  }

  return (
    <div
      className={clsx(
        classes.root,
        classes[variant],
        // disabled ? classes.secondary : classes[variant],
        fullWidth && classes.fullWidth,
        disabled && classes.disabled
      )}
      onClick={handleClick}
      style={{
        borderRadius,
        background,
        width,
        minWidth: width,
        color
      }}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      <p className={classes.text}>{children}</p>
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </div>
  );
}

export default Button;
