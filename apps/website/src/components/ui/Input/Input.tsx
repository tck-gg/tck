import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Input.module.scss';

function Input({
  label,
  placeholder,
  value,
  icon,
  onChange
}: {
  label?: string;
  placeholder: string;
  value: string;
  icon?: IconDefinition;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
