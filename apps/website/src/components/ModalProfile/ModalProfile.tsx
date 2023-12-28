import { useProfile } from '@/hooks/profile';
import Modal from '../ui/Modal/Modal';

function ModalProfile() {
  const profile = useProfile();

  return (
    <Modal isOpen={profile.isOpen} open={profile.open} close={profile.close}>
      <p>Nice</p>
    </Modal>
  );
}

export default ModalProfile;
