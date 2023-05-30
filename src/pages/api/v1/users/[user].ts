// This is merely a test file to see if the database connection works.

import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '@/database/database';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();

  const { user } = req.query;

  res.send(user);
}
export default handler;
