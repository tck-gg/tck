import { NextApiRequest, NextApiResponse } from 'next';
import { Action, getUserByAuthorization, prisma, validateAuthorization } from 'database';
import NextCors from 'nextjs-cors';

import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const ip = getIp(req);

  const data: { authorization: string } = req.body;
  const isValid = await validateAuthorization(data.authorization);
  if (!isValid) {
    res.status(401).end();
    return;
  }

  const user = await getUserByAuthorization(data.authorization);
  if (!user) {
    res.status(401).end();
    return;
  }

  // Don't send the password hash to the client.
  user.password = undefined as any;

  // If the user exists in the end.
  res.send({ user });
}
export default handler;
