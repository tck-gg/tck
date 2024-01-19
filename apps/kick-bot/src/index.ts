/* eslint-disable no-console */

import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { Events, Kient } from 'kient';
import { createKickRaffle, updateKickUsername, validateKickVerification } from 'database';
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
  const verifyClient = await Kient.create();
  
  let raffleTimeout: NodeJS.Timeout | null = null;

  if (
    !process.env.KICK_CHANNEL ||
    !process.env.KICK_VERIFY_CHANNEL ||
    !process.env.KICK_EMAIL ||
    !process.env.KICK_PASSWORD ||
    !process.env.KICK_2FA
  ) {
    return;
  }

  await client.api.authentication.login({
    email: process.env.KICK_EMAIL,
    password: process.env.KICK_PASSWORD,
    otc: new OTP({
      secret: process.env.KICK_2FA
    }).totp(Date.now())
  });
  const channel = await client.api.channel.getChannel(process.env.KICK_CHANNEL);
  await client.ws.chatroom.listen(channel.data.chatroom.id);
  console.log(`Listening to ${process.env.KICK_CHANNEL}`);

  await verifyClient.api.authentication.login({
    email: process.env.KICK_EMAIL,
    password: process.env.KICK_PASSWORD,
    otc: new OTP({
      secret: process.env.KICK_2FA
    }).totp(Date.now())
  });
  const verifyChannel = await verifyClient.api.channel.getChannel(process.env.KICK_VERIFY_CHANNEL);
  await verifyClient.ws.chatroom.listen(verifyChannel.data.chatroom.id);
  console.log(`Listening to ${process.env.KICK_VERIFY_CHANNEL}`);
 
  client.on(Events.Chatroom.Message, async (message) => {
    const kickUsername = message.data.sender.username;
    const kickId = message.data.sender.id;
    const content = message.data.content.trim();

    if(content.startsWith("!raffle")) {
      const regexResponse = /!raffle\s(\d+)\s(\d+)$/gm.exec(content);
      if(!regexResponse) {
        return;
      }

      if(raffleTimeout) {
        client.api.chat.sendMessage(channel.data.chatroom.id, `There's already a raffle in progress!`);
        return;
      }
      
      const reward = parseInt(regexResponse[1]);
      const duration = parseInt(regexResponse[2]);

      if(reward < 1) {
        client.api.chat.sendMessage(channel.data.chatroom.id, `You can only give a positive number of points.`);
        return;
      }
      if(reward > 10000) {
        client.api.chat.sendMessage(channel.data.chatroom.id, `You can only give a maximum of 10k points.`);
        return;
      }

      const response = await createKickRaffle(duration, reward);
      if(!response) {
        return;
      }

      await client.api.chat.sendMessage(
        channel.data.chatroom.id,
        `Raffle started for ${reward} points; type livetc1Coinstatic or livetc1Points to join within the next ${duration} seconds!`
      );
      
      raffleTimeout = setTimeout(() => {
        // TODO: Rename this.
        client.api.chat.sendMessage(channel.data.chatroom.id, `Raffle has ended!`);
        raffleTimeout = null;
      }, duration * 1000);
    }
  });
  
  verifyClient.on(Events.Chatroom.Message, async (message) => {
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
        await client.api.chat.sendMessage(verifyChannel.data.chatroom.id, `Verified ${kickUsername}!`);
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
        await client.api.chat.sendMessage(verifyChannel.data.chatroom.id, `Updated ${kickUsername}!`);
      }

      return;
    }
  });
})();
