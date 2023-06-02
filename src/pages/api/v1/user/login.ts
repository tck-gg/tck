import { NextApiRequest, NextApiResponse } from 'next';
import { Action } from '@prisma/client';

import prisma from '@/database/database';
import { tryLoginWithEmail } from '@/database/functions/auth';

import { isValidEmail } from '../../../../util/email';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: {
    email: string;
    password: string;
  } = req.body;
  let user;
  if (isValidEmail(data.email)) {
    user = await tryLoginWithEmail(data.email, data.password);
  } else {
    res.status(400).end();
    return;
  }
  if (!user) {
    res.status(401).end();
    return;
  }

  // Add user action.
  await prisma.user.update({
    where: { id: user.id },
    data: {
      actions: {
        create: {
          action: Action.ACCOUNT_LOGIN,
          ip: req.socket.remoteAddress || 'Unknown',
          timestamp: Date.now()
        }
      }
    }
  });

  res.send({ user });
}
export default handler;
