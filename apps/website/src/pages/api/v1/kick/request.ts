import {
  getUserByAuthorization,
  hasKickVerification,
  requestKickVerification,
  validateAuthorization
} from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const authorization = req.headers.authorization;
  if (!authorization || !validateAuthorization(authorization)) {
    res.status(401).end();
    return;
  }

  const user = await getUserByAuthorization(authorization);
  if (!user) {
    res.status(401).end();
    return;
  }

  const { kickUsername } = req.body;

  if (await hasKickVerification(kickUsername)) {
    res.status(418).end();
  }

  const verificationCode = await requestKickVerification(user.id, kickUsername);

  res.send({ verificationCode });
}

export default handler;
