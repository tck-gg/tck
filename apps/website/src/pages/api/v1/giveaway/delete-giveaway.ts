import { deleteGiveaway, getUserByAuthorization, validateAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const ip = getIp(req);
  const authorization = req.headers.authorization as string;
  if (!validateAuthorization(authorization)) {
    res.status(401).end();
    return;
  }

  const user = await getUserByAuthorization(authorization);
  if (!user) {
    res.status(401).end();
    return;
  }
  if (!user.permissions.includes('MANAGE_GIVEAWAYS')) {
    res.status(403).end();
    return;
  }

  const { id } = req.body;
  if (!id) {
    res.status(400).end();
    return;
  }

  const success = await deleteGiveaway(id, user.id, ip);
  if (!success) {
    res.status(500).end();
    return;
  }
  res.status(200).end();
}

export default handler;
