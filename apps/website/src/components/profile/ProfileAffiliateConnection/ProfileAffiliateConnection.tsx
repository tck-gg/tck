/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import Image, { StaticImageData } from 'next/image';

import ProfileBoxBase from '@/components/profile/ProfileBoxBase/ProfileBoxBase';
import Input from '@/components/ui/Input/Input';

import { useAuth } from '@/hooks/auth';

import classes from './ProfileAffiliateConnection.module.scss';

function ProfileAffiliateConnection({
  name,
  image,
  httpAddress
}: {
  name: string;
  image: StaticImageData;
  httpAddress: string;
}) {
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
      <div className={classes.wrapper}>
        <div className={classes.label}>
          <Image src={image} alt={name} height={14} />
          <p>{name}</p>
        </div>
        <Input placeholder='Username' value={username} onChange={onAddressChange} />
      </div>
    </ProfileBoxBase>
  );
}

export default ProfileAffiliateConnection;
