import { updateLeaderboard, validateAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const authorization = req.headers.Authorization as string;
  if (!validateAuthorization(authorization)) {
    res.status(401).end();
    return;
  }

  // const {  } = req.body;

  res.status(200).end();
}

export default handler;
