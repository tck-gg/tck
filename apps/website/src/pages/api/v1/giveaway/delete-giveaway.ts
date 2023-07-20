import { deleteGiveaway, validateAuthorization } from 'database';
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
    res.status(403).end();
    return;
  }

  const { id } = req.body;
  if (!id) {
    res.status(404).end();
    return;
  }

  const success = await deleteGiveaway(id);
  if (!success) {
    res.status(500).end();
    return;
  }
  res.status(200).end();
}

export default handler;
