const sloc = require('node-sloc');

const PATHS = [
  'apps/admin/src',
  'apps/discord-bot/src',
  'apps/kick-bot/src',
  'apps/startup/src',
  'apps/website/cypress',
  'apps/website/src',
  'packages/custom-util/src',
  'packages/database/prisma',
  'packages/database/src',
  'packages/types/src',
];

async function getSloc(path) {
  const result = await sloc({
    path,
    extensions: [
      'html',
      'js',
      'json',
      'prisma',
      'scss',
      'ts',
      'tsx'
    ],
    ignoreDefault: true
  });
  return result.sloc;
}

(async () => {
  let sum = 0;
  for(const path of PATHS) {
    sum += await getSloc(path);
  }
  console.log(`SLOC: ${sum} (${sum - 18138})`);
})();
