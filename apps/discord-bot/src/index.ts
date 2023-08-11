import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

(async () => {
  try {
    client.logger.info('Logging in...');
    await client.login();
    client.logger.info('Logged in.');
  } catch (error) {
    client.logger.fatal(error);
    client.destroy();
    process.exit(1);
  }
})();

export * from './functions/notifications';
