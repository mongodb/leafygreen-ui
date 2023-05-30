// tsc --build build.tsconfig.json
import { spawnSync } from 'child_process';
import { Command } from 'commander';

import { getRelevantPackages } from './utils/getRelevantPackages';

const cli = new Command('build-TS')
  .arguments('[packages...]')
  .option(
    '--diff',
    'Builds packages that you have been working on, based on the current git diff',
    false,
  )
  .option(
    '--deps',
    'Builds packages that you have been working on, and their leafygreen-ui dependencies.',
    false,
  )
  .parse(process.argv);

const { diff, deps } = cli.opts();

const packages = getRelevantPackages(cli.args, { diff, deps });

const packageArgs = packages.map(pkg => `packages/${pkg}`);

const tsc = spawnSync(
  'tsc',
  ['--build', 'build.tsconfig.json', ...packageArgs],
  {
    stdio: 'inherit',
  },
);

// If the tsc build fails, this script should too
process.exit(tsc.status ?? 1);
