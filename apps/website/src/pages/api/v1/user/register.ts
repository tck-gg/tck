import { NextApiRequest, NextApiResponse } from 'next';

import { prisma, createUser } from 'database';

import { getIp } from '@/util/ip';
import { isValidEmail } from '@/util/email';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getIp(req);

  // Check if IP is banned.
  if (ip !== 'Unknown') {
    const bannedIP = await prisma.bannedIp.findUnique({ where: { ip } });
    if (bannedIP) {
      res.status(403).end();
      return;
    }
  }

  const data: {
    username: string;
    email: string;
    password: string;
  } = req.body;

  // Data validation.
  if (data.username.length < 3 || data.username.length > 32) {
    // Username must be between 3 and 32 characters long.
    res.status(400).end();
    return;
  }
  if (!isValidEmail(data.email)) {
    // Email must be valid.
    res.status(400).end();
    return;
  }
  if (data.password.length < 8) {
    // Password must be at least 8 characters long.
    res.status(400).end();
    return;
  }
  // Create the user.
  const success = await createUser(data.username, data.email, data.password, ip);
  if (success) {
    res.status(201).end();
    return;
  }
  res.status(409).end();
}
export default handler;
