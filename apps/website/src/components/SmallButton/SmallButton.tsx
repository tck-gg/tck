import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './SmallButton.module.scss';
import clsx from 'clsx';

function SmallButton({
  icon,
  disabled,
  onClick
}: {
  icon: IconDefinition;
  disabled?: boolean;
  onClick?: (props: any) => void;
}) {
  function handleClick() {
    if (!disabled) {
      onClick && onClick({});
    }
  }
  return (
    <div className={clsx(classes.root, disabled && classes.disabled)} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

export default SmallButton;
