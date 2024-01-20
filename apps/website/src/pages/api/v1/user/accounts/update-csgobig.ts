import { getUserByAuthorization, updateCsgobigUsername, validateAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const { username } = req.body;

  const cleanUsername = username.trim();
  if (!cleanUsername) {
    res.status(400).end();
    return;
  }

  await updateCsgobigUsername(cleanUsername, user.id);

  res.status(200).end();
}

export default handler;
