import { getActivity, getUserByAuthorization, validateAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET'],
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

  if (!user.permissions.includes('USER_VIEW_ACTIVITY')) {
    res.status(403).end();
    return;
  }

  const username = req.query.username as string;
  if (!username) {
    res.status(400).end();
    return;
  }

  const activity = await getActivity(username);

  res.send(activity);
}

export default handler;
