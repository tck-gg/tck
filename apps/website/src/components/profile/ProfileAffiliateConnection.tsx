/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

import ProfileBoxBase from './ProfileBoxBase/ProfileBoxBase';
import Input from '@/components/ui/Input/Input';

import { useAuth } from '@/hooks/auth';

function ProfileAffiliateConnection({ name, httpAddress }: { name: string; httpAddress: string }) {
  const auth = useAuth();

  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [debouncedUsername] = useDebounce(username, 300);

  useEffect(() => {
    if (!hasChanged) {
      return;
    }
    (async () => {
      await axios.post(
        httpAddress,
        {
          username: debouncedUsername
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
      await auth.refresh();
    })();
  }, [debouncedUsername]);

  function onAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHasChanged(true);
    setUsername(event.target.value);
  }

  return (
    <ProfileBoxBase>
      <Input
        label={name}
        // icon={icon}
        placeholder='Username'
        value={username}
        onChange={onAddressChange}
      />
    </ProfileBoxBase>
  );
}

export default ProfileAffiliateConnection;
