import { useState } from 'react';

import ProfileConnection from '@/components/profile/ProfileConnection/ProfileConnection';
import DiscordColored from '@/components/svg/DiscordColored';

function VerificationDiscord() {
  const [disabled, setDisabled] = useState<boolean>(false);

  function handleClick() {
    setDisabled(true);

    // TODO: Logic.

    setDisabled(false);
  }

  return (
    <ProfileConnection
      name='Discord'
      color='#5865f2'
      icon={<DiscordColored />}
      username={null}
      onClick={handleClick}
      disabled={disabled}
    />
  );
}

export default VerificationDiscord;
