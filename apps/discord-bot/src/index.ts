import { SapphireClient } from '@sapphire/framework';
import { ActivityType, GatewayIntentBits } from 'discord.js';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

import { initSocket } from './socket';

if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID) {
  console.log('Missing environment variables. Not starting Discord bot...');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://92455f7c5f4cdd0035a65e24b168fa6d@o4505824725172224.ingest.sentry.io/4505824785989632',
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    environment: process.env.NODE_ENV
  });
}

initSocket();

export const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

(async () => {
  try {
    client.logger.info('Logging in...');
    await client.login(process.env.DISCORD_TOKEN);
    client.logger.info('Logged in.');

    client.user?.setActivity('tck.gg', {
      type: ActivityType.Watching
    });
  } catch (error) {
    client.logger.fatal(error);
    client.destroy();
    process.exit(1);
  }
})();
