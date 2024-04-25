import ProfileBoxBase from '@/components/profile/ProfileBoxBase/ProfileBoxBase';
import VerificationKick from '@/components/profile/verification/VerificationKick/VerificationKick';

import classes from './ProfileTabConnections.module.scss';

function ProfileTabConnections() {
  return (
    <>
      <div className={classes.group}>
        <VerificationKick />
      </div>
      <hr className={classes.hr} />
      <div className={classes.group}>
        <ProfileBoxBase>
          <p>TODO</p>
        </ProfileBoxBase>
      </div>
    </>
  );
}

export default ProfileTabConnections;
