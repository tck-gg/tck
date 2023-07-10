import { createGiveaway, uploadProfilePicture, validateAuthorization } from 'database';
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

  const { name, brand, value, maxEntries, timestampEnd, image } = req.body;

  const fileName = await uploadProfilePicture(Buffer.from(image, 'base64'));
  if (!fileName) {
    res.status(500).end();
    return;
  }

  await createGiveaway(name, brand, value, maxEntries, timestampEnd, fileName);

  res.status(200).end();
}

export default handler;
