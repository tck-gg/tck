import { collectStakeReload } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stakeUsername, discordUsername } = req.body;

  if (!stakeUsername.trim() || !discordUsername.trim()) {
    res.status(400).end();
    return;
  }

  const success = await collectStakeReload(stakeUsername.trim(), discordUsername.trim());

  res.status(success ? 201 : 409).end();
}

export default handler;
