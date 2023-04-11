/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn, spawnSync } from 'child_process';
import { Command } from 'commander';

import { getRelevantPackages } from './utils/getRelevantPackages';

interface Opts {
  exclude?: Array<string>;
  diff: boolean;
  deps: boolean;
  dry: boolean;
  watch: boolean;
}

const cli = new Command('build-packages')
  .description(
    `Builds leafygreen-ui packages.
    By default, this script will build all packages in the \`packages/\` directory`,
  )
  .arguments('[packages...]')
  .option(
    '-e, --exclude <packages...>',
    `Optionally "exclude" packages from being built.
    For example: ${chalk.bgWhite(
      `yarn build -e icon typography`,
    )} will build everything ${chalk.underline('but')} icon & typography.`,
  )
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
  .option(
    '--dry',
    "Don't build, but print what would have been build given the same arguments.",
    false,
  )
  // .option('--watch', 'Watch all files you intend to build', false)
  .parse(process.argv);

const {
  exclude,
  diff,
  deps,
  dry,
  // watch,
} = cli.opts() as Opts;
const cmdArgs = ['--parallel', 'build'];

const packages = getRelevantPackages(cli.args, { diff, deps, exclude });

if (dry) {
  console.log(`
  ${chalk.bgYellowBright.black.bold('    Dry Run    ')}
  ${chalk.bold(`Would have built ${packages.length} packages:`)}
    ${chalk.green(packages.length ? packages.join(', ') : 'all packages')}
  `);
} else {
  /** BUILD */

  console.log(chalk.green.bold(`Building ${packages.length} packages.\n`));

  const packageArgs = packages.flatMap(pkg => [
    '--scope',
    `@leafygreen-ui/${pkg}`,
  ]);

  console.log(chalk.magenta('Running pre-build...'));

  spawnSync('yarn', ['pre-build', ...packages], { stdio: 'inherit' });

  // Run turbo
  cmdArgs.unshift(...packageArgs);

  const cmd = spawn('npx', ['turbo', 'run', ...cmdArgs], { stdio: 'inherit' });
  cmd.on('close', code => {
    // eslint-disable-next-line no-console
    console.log(
      code === 0
        ? chalk.green.bold(
            `\n✅ Finished building ${packages.length} packages\n`,
          )
        : chalk.red.bold(`\nExit code ${code}\n`),
    );
  });
}
