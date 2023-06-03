import { NextApiRequest, NextApiResponse } from 'next';
import { Action } from '@prisma/client';

import { getIp } from '@/util/ip';

import prisma from '@/database/database';
import { validateAuthorization } from '@/database/functions/auth';
import { getUserByUsername } from '@/database/functions/user';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getIp(req);

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

  // Add user action.
  await prisma.user.update({
    where: { id: user.id },
    data: {
      actions: {
        create: {
          action: Action.ACCOUNT_LOGIN,
          ip,
          timestamp: Date.now()
        }
      }
    }
  });

  // If the user exists in the end.
  res.send({ user });
}
export default handler;
