import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './SmallButton.module.scss';

function SmallButton({ icon, onClick }: { icon: IconDefinition; onClick?: () => void }) {
  return (
    <div className={classes.root} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

export default SmallButton;
