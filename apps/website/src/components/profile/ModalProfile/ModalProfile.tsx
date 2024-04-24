import Modal from '@/components/ui/Modal/Modal';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import VerificationKick from '@/components/profile/verification/VerificationKick/VerificationKick';

import { useProfile } from '@/hooks/profile';

import classes from './ModalProfile.module.scss';

function ModalProfile() {
  const profile = useProfile();

  return (
    <Modal isOpen={profile.isOpen} open={profile.open} close={profile.close}>
      <div className={classes.wrapper}>
        <VerificationKick />
        <LogoutButton />
      </div>
    </Modal>
  );
}

export default ModalProfile;
