import { IconDefinition, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '@/components/ui/Button/Button';
import ProfileBoxBase from '@/components/profile/ProfileBoxBase/ProfileBoxBase';

import classes from './ProfileConnection.module.scss';

function ProfileConnection({
  name,
  color,
  username,
  icon,
  disabled,
  onClick
}: {
  name: string;
  color: string;
  username: string | null | undefined;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <ProfileBoxBase>
      <div className={classes.left}>
        <div className={classes.name}>
          {icon && <div className={classes.icon}>{icon}</div>}
          {name}
        </div>
        <p className={classes.description}>
          {username ? `Connected to ${username}.` : `Connect your ${name} account.`}
        </p>
      </div>
      <Button
        background={color}
        disabled={!!username || disabled}
        {...(username ? {} : { rightIcon: faAngleRight })}
        color='#000000'
        onClick={onClick}
      >
        {`Connect${username ? 'ed' : ''}`}
      </Button>
    </ProfileBoxBase>
  );
}

export default ProfileConnection;
