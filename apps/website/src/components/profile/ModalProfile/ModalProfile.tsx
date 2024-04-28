import { useEffect, useState } from 'react';

import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';

import { useProfile } from '@/hooks/profile';

import ProfileTabProfile from '../tab/ProfileTabProfile';
import ProfileTabConnections from '../tab/ProfileTabConnections/ProfileTabConnections';
import ProfileTabWallet from '../tab/ProfileTabWallet/ProfileTabWallet';

import classes from './ModalProfile.module.scss';

function ModalProfile() {
  const profile = useProfile();

  const [tab, setTab] = useState<'profile' | 'connections' | 'wallet'>('profile');

  useEffect(() => {
    setTab('profile');
  }, [profile.isOpen]);

  return (
    <Modal isOpen={profile.isOpen} open={profile.open} close={profile.close}>
      <div className={classes.wrapper}>
        <div className={classes.buttons}>
          <Button
            onClick={() => {
              setTab('profile');
            }}
            variant={tab === 'profile' ? 'primary' : 'secondary'}
          >
            Profile
          </Button>
          <Button
            onClick={() => {
              setTab('connections');
            }}
            variant={tab === 'connections' ? 'primary' : 'secondary'}
          >
            Connections
          </Button>
          <Button
            onClick={() => {
              setTab('wallet');
            }}
            variant={tab === 'wallet' ? 'primary' : 'secondary'}
          >
            Profile
          </Button>
        </div>
        {
          {
            profile: <ProfileTabProfile />,
            connections: <ProfileTabConnections />,
            wallet: <ProfileTabWallet />
          }[tab]
        }
      </div>
    </Modal>
  );
}

export default ModalProfile;
