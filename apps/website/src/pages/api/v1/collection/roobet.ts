import { collectRoobetReload } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roobetUsername, discordUsername } = req.body;

  if (!roobetUsername.trim() || !discordUsername.trim()) {
    res.status(400).end();
    return;
  }

  const success = await collectRoobetReload(roobetUsername.trim(), discordUsername.trim());

  res.status(success ? 201 : 409).end();
}

export default handler;
