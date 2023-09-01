import { ChannelType, EmbedBuilder } from 'discord.js';
import { Giveaway } from 'database';

import { client } from '../index';

export async function sendNewGiveawayNotification(giveaway: Giveaway) {
  if (!process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID) {
    return;
  }

  const channel = await client.channels.fetch(process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID);
  if (!channel || channel.type !== ChannelType.GuildText) {
    return;
  }

  const giveawayUrl = `https://tck.gg/giveaways/${giveaway.id}`;

  channel.send({
    content: '@everyone',
    embeds: [
      new EmbedBuilder()
        .setColor('#546bff')
        .setTitle('New Giveaway Created')
        .setURL(giveawayUrl)
        .setDescription(`New giveaway for **${giveaway.name}** posted on tck.gg!`)
        .setThumbnail(`https://cdn.tck.gg/giveaways/${giveaway.image}`)
        .addFields([
          {
            name: 'Ends on',
            value: new Date(giveaway.timestampEnd).toLocaleString(),
            inline: true
          },
          {
            name: 'Max Entries',
            value: giveaway.maxEntries.toString(),
            inline: true
          }
        ])
    ],
    components: [
      {
        type: 1,
        components: [
          {
            style: 5,
            label: `View Giveaway`,
            url: giveawayUrl,
            disabled: false,
            emoji: {
              name: `🎉`
            },
            type: 2
          },
          {
            style: 5,
            label: `View All Giveaways`,
            url: 'https://tck.gg/giveaways',
            disabled: false,
            emoji: {
              name: `🔎`
            },
            type: 2
          }
        ]
      }
    ]
  });
}

export async function sendDeletedGiveawayNotification(giveaway: Giveaway) {
  if (!process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID) {
    return;
  }

  const channel = await client.channels.fetch(process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID);
  if (!channel || channel.type !== ChannelType.GuildText) {
    return;
  }

  channel.send({
    embeds: [
      new EmbedBuilder()
        .setColor('#546bff')
        .setTitle('Giveaway Deleted')
        .setDescription(`Giveaway for **${giveaway.name}** has been removed.`)
    ],
    components: [
      {
        type: 1,
        components: [
          {
            style: 5,
            label: `View All Giveaways`,
            url: 'https://tck.gg/giveaways',
            disabled: false,
            emoji: {
              name: `🔎`
            },
            type: 2
          }
        ]
      }
    ]
  });
}
