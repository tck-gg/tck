import { createGiveaway, getUserByAuthorization, uploadImage } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb'
    }
  }
};

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

  const { name, brand, value, maxEntries, timestampEnd, image } = req.body;

  const fileName = await uploadImage(Buffer.from(image, 'base64'), 'giveaways');
  if (!fileName) {
    res.status(500).end();
    return;
  }

  await createGiveaway(name, brand, value, maxEntries, timestampEnd, fileName);

  res.status(200).end();
}

export default handler;
