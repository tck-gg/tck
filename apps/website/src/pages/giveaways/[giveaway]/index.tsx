import { useRouter } from 'next/router';

function GiveawayPage() {
  const router = useRouter();

  return <p>Giveaway: {router.query.giveaway}</p>;
}

export default GiveawayPage;
