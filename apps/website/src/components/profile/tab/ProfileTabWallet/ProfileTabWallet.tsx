import { faBitcoin, faEthereum, faSteam } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faLitecoinSign } from '@fortawesome/free-solid-svg-icons';

import ProfileWallet from '@/components/profile/ProfileWallet/ProfileWallet';
import Button from '@/components/ui/Button/Button';

import { useProfile } from '@/hooks/profile';

import classes from './ProfileTabWallet.module.scss';

function ProfileTabWallet() {
  const profile = useProfile();

  function close() {
    profile.close();
  }

  return (
    <>
      <div className={classes.group}>
        <ProfileWallet
          name='Bitcoin'
          icon={faBitcoin}
          httpAddress='/api/v1/user/wallet/update-bitcoin'
        />
        <ProfileWallet
          name='Ethereum'
          icon={faEthereum}
          httpAddress='/api/v1/user/wallet/update-ethereum'
        />
        <ProfileWallet
          name='Litecoin'
          icon={faLitecoinSign}
          httpAddress='/api/v1/user/wallet/update-litecoin'
        />
        <ProfileWallet
          name='Steam Trade URL'
          icon={faSteam}
          httpAddress='/api/v1/user/wallet/update-steam-trade'
        />
      </div>
      <Button rightIcon={faChevronRight} onClick={close} variant='gradient'>
        Save Changes
      </Button>
    </>
  );
}

export default ProfileTabWallet;
