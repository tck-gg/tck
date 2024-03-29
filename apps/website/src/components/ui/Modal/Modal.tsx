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
      <div className={classes.modalWrapper}>
        <ClickAwayListener onClickAway={close}>
          <div className={classes.box}>
            <div className={classes.top}>
              {titleIcon && <IconBubble icon={titleIcon} size={16} />}
              {title && <p className={classes.title}>{title}</p>}
            </div>
            <div className={classes.bottom}>{children}</div>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={classes.close}
              onClick={close}
            >
              <path
                d='M10.3952 0.916837C10.9788 0.893246 11.4583 1.37278 11.4347 1.95641L11.0693 10.9982C11.0341 11.869 9.97925 12.2812 9.36296 11.6649L0.686694 2.9886C0.0704103 2.37232 0.482566 1.31751 1.35341 1.28231L10.3952 0.916837Z'
                fill='#989EAE'
                fillOpacity='0.25'
              />
            </svg>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  ) : null;
}

export default Modal;
