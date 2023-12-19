/* eslint-disable no-console */

import { NextApiRequest, NextApiResponse } from 'next';
import { isValidEmail } from 'custom-util';
import { prisma, createUser } from 'database';
import ProxyCheck from 'proxycheck-ts';

import { getIp } from '@/util/ip';

let proxyCheck: ProxyCheck;
if (process.env.PROXYCHECK_API_KEY) {
  proxyCheck = new ProxyCheck({ api_key: process.env.PROXYCHECK_API_KEY });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getIp(req);

  // Check if IP is banned.
  if (ip !== 'Unknown') {
    const proxyCheckResult = await proxyCheck.checkIP(ip, {
      vpn: 3
    });
    if (proxyCheckResult.status !== 'error') {
      const usingVpn = proxyCheckResult[ip].vpn === 'yes' || proxyCheckResult[ip].proxy === 'yes';
      if (usingVpn) {
        res.status(403).end();
        return;
      }
    }

    const bannedIP = await prisma.bannedIp.findUnique({ where: { ip } });
    if (bannedIP) {
      res.status(418).end();
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
