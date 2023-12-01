import { NextApiRequest, NextApiResponse } from 'next';

import { getIp } from '@/util/ip';
import { verifyAccount } from 'database';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getIp(req);

  const data: { uuid: string } = req.body;

  if (!data.uuid) {
    res.status(400).end();
    return;
  }

  const success = await verifyAccount(data.uuid);

  if (!success) {
    res.status(500).end();
    return;
  }

  res.status(200).end();
}

export default handler;
