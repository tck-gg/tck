import { NextApiRequest, NextApiResponse } from 'next';

import { getUserByUsername } from '../../../../database/functions/user';
import { validateAuthorization } from '../../../../database/functions/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: { authorization: string } = req.body;

  const isValid = await validateAuthorization(data.authorization);

  const username = data.authorization.split('@')[0];
  const user = await getUserByUsername(username);

  if (!user || !isValid) {
    res.status(401).end();
    return;
  }

  // Don't send the password hash to the client.
  user.password = undefined as any;

  // If the user exists in the end.
  res.send({ user });
}
export default handler;
