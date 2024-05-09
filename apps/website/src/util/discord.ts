import { DiscordAccount } from 'database';

export function getProfilePicture(discordAccount: DiscordAccount) {
  return `https://cdn.discordapp.com/avatars/${discordAccount.discordId}/${discordAccount.discordAvatar}.png`;
}
