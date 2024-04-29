import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Button from '@/components/ui/Button/Button';
import VerificationKick from '@/components/profile/verification/VerificationKick/VerificationKick';
import ProfileAffiliateConnection from '@/components/profile/ProfileAffiliateConnection/ProfileAffiliateConnection';

import { useProfile } from '@/hooks/profile';

import roobetMiniImage from '@/images/affiliate/roobet-mini.png';

import classes from './ProfileTabConnections.module.scss';

function ProfileTabConnections() {
  const profile = useProfile();

  function close() {
    profile.close();
  }

  return (
    <>
      <div className={classes.group}>
        <VerificationKick />
      </div>
      <hr className={classes.hr} />
      <div className={classes.group}>
        <ProfileAffiliateConnection
          name='Roobet'
          image={roobetMiniImage}
          httpAddress='/api/v1/user/accounts/update-roobet'
        />
      </div>
      <Button rightIcon={faChevronRight} onClick={close} variant='gradient'>
        Save Changes
      </Button>
    </>
  );
}

export default ProfileTabConnections;
