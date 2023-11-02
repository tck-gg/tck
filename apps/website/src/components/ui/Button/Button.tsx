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
  fullWidth,
  disabled,
  background,
  width,
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
  onClick?: (props: any) => void;
}) {
  function handleClick() {
    onClick && onClick({});
  }

  return (
    <div
      className={clsx(
        classes.root,
        disabled ? classes.secondary : classes[variant],
        fullWidth && classes.fullWidth,
        disabled && classes.disabled
      )}
      onClick={handleClick}
      style={{
        borderRadius,
        background,
        width
      }}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      <p className={classes.text}>{children}</p>
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </div>
  );
}

export default Button;
