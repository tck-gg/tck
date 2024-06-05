import { getUserByAuthorization, submitClip, validateAuthorization } from 'database';

import { NextApiRequest, NextApiResponse } from 'next';
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorization = req.headers.authorization as string;
  if (!validateAuthorization(authorization)) {
    res.status(401).end();
    return;
  }

  const user = await getUserByAuthorization(authorization);
  if (!user) {
    res.status(401).end();
    return;
  }

  if (user.isBanned) {
    res.status(403).end();
    return;
  }

  const { clipLink } = req.body;

  if (!clipLink.trim()) {
    res.status(400).end();
    return;
  }

  const success = await submitClip(clipLink.trim());

  res.status(success ? 201 : 409).end();
}

export default handler;
