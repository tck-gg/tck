/* eslint-disable no-console */

import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { Events, Kient } from 'kient';
import { updateKickUsername, validateKickVerification } from 'database';
import OTP from 'otp';

Sentry.init({
  dsn: 'https://199400c6557fe69cd7e442efda7419df@o4505824725172224.ingest.sentry.io/4506578396119040',
  integrations: [new ProfilingIntegration()],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  environment: process.env.NODE_ENV
});

(async () => {
  const client = await Kient.create();

  if (
    !process.env.KICK_CHANNEL ||
    !process.env.KICK_EMAIL ||
    !process.env.KICK_PASSWORD ||
    !process.env.KICK_2FA
  ) {
    return;
  }

  const channel = await client.api.channel.getChannel(process.env.KICK_CHANNEL);

  await client.api.authentication.login({
    email: process.env.KICK_EMAIL,
    password: process.env.KICK_PASSWORD,
    otc: new OTP({
      secret: process.env.KICK_2FA
    }).totp(Date.now())
  });

  console.log('Listening to Kick chatroom...');
  await client.ws.chatroom.listen(channel.data.chatroom.id);
  client.on(Events.Chatroom.Message, async (message) => {
    const kickUsername = message.data.sender.username;
    const kickId = message.data.sender.id;

    const content = message.data.content.trim();

    if (content.startsWith('!verify')) {
      const code = /!verify ([a-z0-9]{8})$/gm.exec(content)?.[1];
      if (!code) {
        return;
      }
    
      const response = await validateKickVerification(
        kickUsername,
        kickId,
        code,
        "kick.com"
      );
      if (response) {
        await client.api.chat.sendMessage(channel.data.chatroom.id, `Verified ${kickUsername}!`);
      }

      return;
    }

    if(content.startsWith('!update')) {
      const response = await updateKickUsername(
        kickUsername,
        kickId,
        "kick.com"
      );
      if (response) {
        await client.api.chat.sendMessage(channel.data.chatroom.id, `Updated ${kickUsername}!`);
      }

      return;
    }
  });
})();
