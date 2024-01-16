import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useProfile } from '@/hooks/profile';
import { useAuth } from '@/hooks/auth';

import classes from './LogoutButton.module.scss';

function LogoutButton() {
  const auth = useAuth();
  const profile = useProfile();

  function onClick() {
    profile.close();
    auth.logOut();
  }

  return (
    <div onClick={onClick} className={classes.root}>
      <FontAwesomeIcon icon={faRightFromBracket} />
      <p>Logout</p>
    </div>
  );
}

export default LogoutButton;
