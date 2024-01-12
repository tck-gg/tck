import Modal from '../ui/Modal/Modal';
import ProfileConnection from '../profile/ProfileConnection/ProfileConnection';

import { useProfile } from '@/hooks/profile';
import { useAuth } from '@/hooks/auth';

import KickColored from '../svg/KickColored';

function ModalProfile() {
  const profile = useProfile();
  const auth = useAuth();

  function handleKickClick() {
    // Do nothing.
  }

  return (
    <Modal isOpen={profile.isOpen} open={profile.open} close={profile.close}>
      <ProfileConnection
        name='Kick'
        color='#53fc18'
        icon={<KickColored />}
        username={auth.user?.accounts?.kick}
        onClick={handleKickClick}
      />
    </Modal>
  );
}

export default ModalProfile;
