/* eslint-disable no-console */

import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { Events, Kient } from 'kient';
import {
  createKickRaffle,
  endKickRaffle,
  enterKickRaffle,
  getUserByKickId,
  getUserPointsByKickId,
  updateKickUsername,
  validateKickVerification
} from 'database';
import OTP from 'otp';

if(process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://199400c6557fe69cd7e442efda7419df@o4505824725172224.ingest.sentry.io/4506578396119040',
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    environment: process.env.NODE_ENV
  });
}

(async () => {
  const client = await Kient.create();
  const verifyClient = await Kient.create();
  
  let raffleTimeout: NodeJS.Timeout | null = null;
  let currentRaffle: string | null = null;

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

      const user = await getUserByKickId(kickId);
      if(!user || !user.permissions.includes("CREATE_KICK_RAFFLE")) {
        return;
      }
      
      if(raffleTimeout) {
        client.api.chat.sendMessage(channel.data.chatroom.id, `@${kickUsername} There's already a raffle in progress!`);
        return;
      }
      
      const reward = parseInt(regexResponse[1]);
      const duration = parseInt(regexResponse[2]);

      if(reward < 1) {
        client.api.chat.sendMessage(channel.data.chatroom.id, `@${kickUsername} You can only give a positive number of points.`);
        return;
      }
      if(reward > 10000) {
        client.api.chat.sendMessage(channel.data.chatroom.id, `@${kickUsername} You can only give a maximum of 10k points.`);
        return;
      }

      const createdRaffleId = await createKickRaffle(duration, reward, kickUsername);
      if(!createdRaffleId) {
        return;
      }
      currentRaffle = createdRaffleId;

      if(process.env.NODE_ENV === 'production') {
        await client.api.chat.sendMessage(
          channel.data.chatroom.id,
          `Raffle started for ${reward} points; type [emote:2191419:tckFREE] to join within the next ${duration} seconds!`
        );
      }else {
        await client.api.chat.sendMessage(
          channel.data.chatroom.id,
          `Raffle started for ${reward} points; type tckFREE to join within the next ${duration} seconds!`
        );
      }
      
      raffleTimeout = setTimeout(async () => {
        if(!currentRaffle) {
          return;
        }

        const response = await endKickRaffle(currentRaffle);
        if(response.entries < 0) {
          raffleTimeout = null;
          currentRaffle = null;
          return;
        }
        if(response.entries === 0) {
          client.api.chat.sendMessage(channel.data.chatroom.id, `Nobody joined the raffle :(`);
          raffleTimeout = null;
          currentRaffle = null;
          return;
        }
        
        // Send results.
        client.api.chat.sendMessage(
          channel.data.chatroom.id,
          `${response.entries} viewer${response.entries !== 1 ? 's' : ''} win${response.entries === 1 ? 's' : ''} ${response.points} point${response.points !== 1 ? 's' : ''}!`
        );
        
        // Reset.
        raffleTimeout = null;
        currentRaffle = null;
      }, duration * 1000);
    }

    if(content === '[emote:2191419:tckFREE]' || content === '[emote:2191426:tckPoints]') {
      if(!currentRaffle) {
        return;
      }

      const response = await enterKickRaffle(currentRaffle, kickId);
      if(response === 'error') {
        return;
      }
      if(response === 'unlinked') {
        await client.api.chat.sendMessage(channel.data.chatroom.id, `@${kickUsername} You must link your Kick account to enter raffles!`);
      }

      return;
    }

    if(content === '!points') {
      const points = await getUserPointsByKickId(kickId);

      await client.api.chat.sendMessage(channel.data.chatroom.id, `@${kickUsername} You have ${points} point${points !== 1 ? 's' : ''}!`);
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
        await verifyClient.api.chat.sendMessage(verifyChannel.data.chatroom.id, `Verified @${kickUsername}!`);
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
        await verifyClient.api.chat.sendMessage(verifyChannel.data.chatroom.id, `Updated @${kickUsername}!`);
      }

      return;
    }
  });
})();
