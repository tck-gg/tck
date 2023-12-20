import { getUserByAuthorization, updatePermissions, validateAuthorization } from 'database';
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

  if (!user.permissions.includes('USER_MODIFY_PERMISSIONS')) {
    res.status(403).end();
    return;
  }

  const { permissions, userId } = req.body;

  if (!permissions || !userId) {
    res.status(400).end();
    return;
  }

  // Can't change your own permissions.
  if (user.id === userId) {
    res.status(418).end();
    return;
  }

  const success = await updatePermissions(userId, permissions);
  if (!success) {
    res.status(500).end();
    return;
  }
  res.status(200).end();
}

export default handler;
