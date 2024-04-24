import { faBitcoin, faEthereum, faSteam } from '@fortawesome/free-brands-svg-icons';
import ProfileWallet from '../ProfileWallet/ProfileWallet';
import { faLitecoinSign } from '@fortawesome/free-solid-svg-icons';

function ProfileTabWallet() {
  return (
    <>
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
    </>
  );
}

export default ProfileTabWallet;
