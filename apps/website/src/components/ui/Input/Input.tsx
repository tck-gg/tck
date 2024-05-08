import clsx from 'clsx';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Input.module.scss';

function Input({
  label,
  placeholder,
  value,
  icon,
  disabled,
  onChange
}: {
  label?: string;
  placeholder: string;
  value: string;
  icon?: IconDefinition;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={classes.root}>
      {label && (
        <div className={classes.labelGroup}>
          {icon && <FontAwesomeIcon icon={icon} width={15} height={15} color='#989eae' />}
          <p className={classes.label}>{label}</p>
        </div>
      )}
      <input
        className={clsx(classes.input, disabled && classes.disabled)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
