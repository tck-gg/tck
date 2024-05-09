import { getUserByAuthorization, updateSteamTradeUrl, validateAuthorization } from 'database';
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

  const { address } = req.body;

  const cleanAddress = address.trim();

  const result = await updateSteamTradeUrl(cleanAddress, user.id);
  if (!result) {
    res.status(400).end();
    return;
  }
  res.status(200).end();
}

export default handler;
