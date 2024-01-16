import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Modal from '@/components/ui/Modal/Modal';
import ProfileConnection from '@/components/profile/ProfileConnection/ProfileConnection';
import LogoutButton from '@/components/LogoutButton/LogoutButton';

import { useProfile } from '@/hooks/profile';
import { useAuth } from '@/hooks/auth';

import KickColored from '../svg/KickColored';
import ProfileBoxBase from '../profile/ProfileBoxBase/ProfileBoxBase';

import classes from './ModalProfile.module.scss';

function ModalProfile() {
  const profile = useProfile();
  const auth = useAuth();

  const [cookie, setCookie] = useCookies(['authorization']);

  const [disabled, setDisabled] = useState<boolean>(false);
  const [kickVerification, setKickVerification] = useState<string>(null as any);

  async function handleKickClick() {
    setDisabled(true);

    const response = await axios.post(
      '/api/v1/kick/request',
      {
        userId: auth.user?.id
      },
      {
        headers: {
          authorization: auth.user?.apiKey
        },
        validateStatus: () => {
          return true;
        }
      }
    );

    const code = response.data.verificationCode;
    setKickVerification(code);

    setDisabled(false);
  }

  useEffect(() => {
    setKickVerification(auth.user?.kickVerification?.verificationCode || (null as any));
  }, [auth.user]);

  return (
    <Modal isOpen={profile.isOpen} open={profile.open} close={profile.close}>
      <div className={classes.wrapper}>
        {kickVerification ? (
          <ProfileBoxBase>
            <div className={classes.kickVerification}>
              <p>
                Visit{' '}
                <a href='https://kick.com/tckgg' target='_blank'>
                  kick.com/tckgg
                </a>{' '}
                and send{' '}
                <code
                  className={classes.code}
                  onClick={() => {
                    navigator.clipboard.writeText(`!verify ${kickVerification}`);
                  }}
                >
                  !verify {kickVerification}
                </code>{' '}
                in the chat to link your <strong>Kick</strong> account. Then refresh this page.
              </p>
            </div>
          </ProfileBoxBase>
        ) : (
          <ProfileConnection
            name='Kick'
            color='#53fc18'
            icon={<KickColored />}
            username={auth.user?.accounts?.kick}
            onClick={handleKickClick}
            disabled={disabled}
          />
        )}
        <LogoutButton />
      </div>
    </Modal>
  );
}

export default ModalProfile;
