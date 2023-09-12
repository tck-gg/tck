import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './IconBubble.module.scss';

function IconBubble({
  icon,
  fill = '#989eae',
  backgroundFill = '#41414d',
  size
}: {
  icon: IconDefinition;
  fill?: string;
  backgroundFill?: string;
  size: number;
}) {
  return (
    <div
      className={classes.root}
      style={{
        width: size,
        height: size,
        backgroundColor: backgroundFill
      }}
    >
      <FontAwesomeIcon icon={icon} width={size / 2.66} height={size / 2.66} color={fill} />
    </div>
  );
}

export default IconBubble;
