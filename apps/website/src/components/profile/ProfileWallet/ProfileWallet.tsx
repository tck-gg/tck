/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import { camelCase } from 'custom-util';

import ProfileBoxBase from '../ProfileBoxBase/ProfileBoxBase';

import Input from '@/components/ui/Input/Input';

import { useAuth } from '@/hooks/auth';

function ProfileWallet({
  name,
  icon,
  httpAddress
}: {
  name: string;
  icon: IconDefinition;
  httpAddress: string;
}) {
  const auth = useAuth();

  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [debouncedAddress] = useDebounce(address, 300);

  useEffect(() => {
    const wallets = auth.user?.wallets || {};
    const field = camelCase(name);
    setAddress(wallets[field as keyof typeof wallets] || '');
  }, [auth.user?.wallets]);

  useEffect(() => {
    if (!hasChanged) {
      return;
    }
    (async () => {
      await axios.post(
        httpAddress,
        {
          address: debouncedAddress
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
      setHasChanged(false);
    })();
  }, [debouncedAddress]);

  function onAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHasChanged(true);
    setAddress(event.target.value);
  }

  return (
    <ProfileBoxBase>
      <Input
        label={name}
        icon={icon}
        placeholder='Address'
        value={address}
        onChange={onAddressChange}
      />
    </ProfileBoxBase>
  );
}

export default ProfileWallet;
