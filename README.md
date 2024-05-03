# TCK
> Affiliate website for TCK.

![](https://wakatime.com/badge/user/6b7d9181-edde-4a25-857c-e7101bfee7ea/project/37e24fb3-b1db-4114-a105-eb5412ae4287.svg?style=for-the-badge)

## Discord Bot
https://discord.com/oauth2/authorize?client_id=1188676912525090837&scope=bot&permissions=2148265024

## User Permissions
- `ACCESS_ADMIN_PANEL`
- `MANAGE_USERS`
- `MANAGE_LEADERBOARDS`
- `MANAGE_RAFFLES`
- `MANAGE_GIVEAWAYS`
- `MANAGE_IPS`
- `MANAGE_RELOADS`
- `USER_BAN`
- `USER_DELETE`
- `USER_UNBAN`
- `USER_MODIFY_PERMISSIONS`
- `USER_POINTS_ADD`
- `USER_POINTS_REMOVE`
- `USER_POINTS_SET`
- `USER_VIEW_ACTIVITY`

## `.env`
### Required
- `NEXT_PUBLIC_PRODUCTION_COOKIE_DOMAIN`
  - You may set this to any domain for development.
- `DATABASE_URL`
  - This must be a valid connection URL for a MongoDB instance.
  - Example: `mongodb+srv://username:password@xxx.xxxxxxx.mongodb.net/xxx"`

### Optional for Development
- `B2_BUCKET_NAME`
- `B2_APPLICATION_KEY_ID`
- `B2_APPLICATION_KEY`
- `DISCORD_TOKEN`
- `DISCORD_ANNOUNCEMENT_CHANNEL_ID`
- `DISCORD_OAUTH_CLIENT_ID`
- `DISCORD_OAUTH_CLIENT_SECRET`
- `GAMDOM_API_KEY`
- `KICK_CHANNEL`
- `KICK_VERIFY_CHANNEL`
- `KICK_EMAIL`
- `KICK_PASSWORD`
- `KICK_2FA`
- `KICK_AUTH`
- `RANDOM_ORG_API_KEY` (signed)
- `ROOBET_API_KEY`
- `SENTRY_AUTH_TOKEN`
- `YOUTUBE_API_KEY`
- `PACKDRAW_API_KEY`

### Unused
- `CLASH_API_KEY`