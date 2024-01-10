import { validateAuthorization, validateKickVerification } from 'database';
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

  const { kickUsername, verificationCode } = req.body;
  const cleanKickUsername = kickUsername.trim();
  const cleanVerificationCode = verificationCode.trim();

  if (!cleanKickUsername || !cleanVerificationCode) {
    res.status(400).end();
    return;
  }

  const result = await validateKickVerification(cleanKickUsername, cleanVerificationCode);

  if (!result) {
    res.status(400).end();
    return;
  }

  res.status(200).end();
}

export default handler;
