const sloc = require('node-sloc');
const chalk = require('chalk');

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

  return {
    sloc: result.sloc,
    comments: result.comments,
    blank: result.blank,
    files: result.files
  };
}

(async () => {
  let totals = {
    sloc: 0,
    comments: 0,
    blank: 0,
    files: 0
  };
  for(const path of PATHS) {
    const result = (await getSloc(path))
    totals.sloc += result.sloc;
    totals.comments += result.comments;
    totals.blank += result.blank;
    totals.files += result.files;
  }

  const total = totals.sloc + totals.comments + totals.blank;

  console.log(chalk.bold(chalk.underline(`Total`) +  `: ${total} Lines of Code (${total - 18138})`));
  console.log(`> Source: ${totals.sloc}`);
  console.log(`> Comment: ${totals.comments}`);
  console.log(`> Blank: ${totals.blank}`);
  console.log();
  console.log(`> Files: ${totals.files}`);
})();
