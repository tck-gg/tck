import { getUserByAuthorization, updateGiveaway } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const authorization = req.headers.authorization as string;
  const user = await getUserByAuthorization(authorization);
  if (!user) {
    res.status(401).end();
    return;
  }
  if (!user.permissions.includes('MANAGE_GIVEAWAYS')) {
    res.status(403).end();
    return;
  }

  const { id, name, brand, value, maxEntries, timestampEnd } = req.body;

  await updateGiveaway(id, name, brand, value, maxEntries, timestampEnd);

  res.status(200).end();
}

export default handler;
