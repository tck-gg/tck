import { enterGiveaway, getUserByAuthorization, validateAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getIp(req);

  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

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

  if (user.isBanned) {
    res.status(403).end();
    return;
  }

  const { giveaway } = req.query;
  const result = await enterGiveaway(user, giveaway as string, ip);

  res.status(result ? 200 : 500).end();
}

export default handler;
