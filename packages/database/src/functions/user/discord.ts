import axios from 'axios';

export async function verifyDiscord(accessToken: string, userId: string): Promise<boolean> {
  const response = await axios.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status !== 200) {
    return false;
  }

  const data = response.data;

  const discordId = data.id;
  const discordUsername = data.username;
  const discordAvatar = data.avatar;

  // TODO: Database work.

  return true;
}
