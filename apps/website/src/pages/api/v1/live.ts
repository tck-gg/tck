import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const CHANNEL = 'tck';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await axios.get(`https://kick.com/api/v2/channels/${CHANNEL}/livestream`, {
    headers: {
      'x-kick-auth': process.env.KICK_AUTH
    }
  });
  const data = response.data;
  const isLive = !!data.data;

  res.send({
    isLive
  });
}

export default handler;
