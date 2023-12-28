import ClickAwayListener from 'react-click-away-listener';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import IconBubble from '../IconBubble/IconBubble';

import classes from './Modal.module.scss';

function Modal({
  isOpen,
  open,
  close,
  children,
  title,
  titleIcon
}: {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  children: React.ReactNode;
  title?: string;
  titleIcon?: IconDefinition;
}) {
  return isOpen ? (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={close}>
        <div className={classes.box}>
          <div className={classes.top}>
            {titleIcon && <IconBubble icon={titleIcon} size={16} />}
            {title && <p className={classes.title}>{title}</p>}
          </div>
          <div className={classes.bottom}>{children}</div>
        </div>
      </ClickAwayListener>
    </div>
  ) : null;
}

export default Modal;
