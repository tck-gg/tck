import { useEffect, useState } from 'react';
import axios from 'axios';

import KickColored from '@/components/svg/KickColored';
import ProfileBoxBase from '@/components/profile/ProfileBoxBase/ProfileBoxBase';
import ProfileConnection from '@/components/profile/ProfileConnection/ProfileConnection';

import { useAuth } from '@/hooks/auth';

import classes from './VerificationKick.module.scss';

function VerificationKick() {
  const auth = useAuth();

  const [disabled, setDisabled] = useState<boolean>(false);
  const [kickVerification, setKickVerification] = useState<string>(null as any);

  useEffect(() => {
    setKickVerification(auth.user?.kickVerification?.verificationCode || (null as any));
  }, [auth.user]);

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

  return kickVerification ? (
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
      username={auth.user?.accounts?.kick?.kickUsername}
      onClick={handleKickClick}
      disabled={disabled}
    />
  );
}

export default VerificationKick;
