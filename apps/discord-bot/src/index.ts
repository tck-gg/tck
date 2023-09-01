import { SapphireClient } from '@sapphire/framework';
import { ActivityType, GatewayIntentBits } from 'discord.js';

import { initSocket } from './socket';

initSocket();

export const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

(async () => {
  try {
    client.logger.info('Logging in...');
    await client.login();
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
