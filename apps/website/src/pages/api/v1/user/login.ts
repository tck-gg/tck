import { NextApiRequest, NextApiResponse } from 'next';
import { Action, prisma, tryLoginWithEmail } from 'database';
import { isValidEmail } from 'custom-util';

import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getIp(req);

  const data: {
    email: string;
    password: string;
  } = req.body;
  let user;
  if (isValidEmail(data.email)) {
    user = await tryLoginWithEmail(data.email.trim().toLowerCase(), data.password);
  } else {
    res.status(400).end();
    return;
  }
  if (!user || !user.isVerified) {
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
          ip,
          timestamp: Date.now()
        }
      }
    }
  });

  res.send({ user });
}
export default handler;
