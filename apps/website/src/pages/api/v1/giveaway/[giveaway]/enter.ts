import { enterGiveaway, getUserByAuthorization, validateAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const authorization = req.headers.authorization as string;
  if (!validateAuthorization(authorization)) {
    res.status(403).end();
    return;
  }

  const user = await getUserByAuthorization(authorization);
  if (!user) {
    return;
  }

  const { giveaway } = req.query;
  await enterGiveaway(user, giveaway as string);

  res.status(200).end();
}

export default handler;
