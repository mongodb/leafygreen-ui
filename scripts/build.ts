/* eslint-disable no-console */
import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';
import { exit } from 'process';
import { Command } from 'commander';
import { uniq } from 'lodash';

interface Opts {
  exclude?: Array<string>;
  diff: boolean;
  deps: boolean;
  dry: boolean;
  watch: boolean;
}

const cli = new Command('build-packages')
  // .description('By default, this script will build all packages in the `packages/` directory')
  .arguments('[packages...]')
  .option(
    '-e, --exclude <packages...>',
    `Optionally "exclude" packages from being built.
    For example: ${chalk.bgGray(
      `yarn build -e icon typography`,
    )} will build everything ${chalk.underline('but')} icon & typography.
    Note: If an exclude flag is provided, any packages listed before the flag are ignored.`,
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

/**
 * `--diff` - builds only packages that have uncommitted changes
 * `--dependencies` or `--deps` - builds the dependencies of packages that have uncommitted changes
 */
let packages: Array<string> = [];

if (diff) {
  console.log(
    chalk.bold(`\nBuilding changed packages against ${chalk.bgWhite('main')}`),
  );
  cli.args.length > 0 &&
    console.log(
      chalk.yellow(`\tIgnoring ${cli.args.length} package names provided`),
    );

  const gitDiff = spawnSync('git', [
    'diff',
    '..main',
    '--name-only',
  ]).stdout.toString();

  const changedPackages = gitDiff
    .trim()
    .split('\n')
    .filter(file => file.startsWith('packages/'))
    .map(file => file.replace(/(?<=packages\/.*?\/)(.*)|(packages\/)|\//g, ''));

  packages =
    changedPackages.length > 0 ? changedPackages : getAllPackageNames();

  if (changedPackages.length > 0) {
    console.log(
      `\t${changedPackages.length} diffs found:`,
      chalk.blue(changedPackages),
    );
    packages = changedPackages;
  } else {
    console.log('\tNo diffs found. Aborting build');
    exit(0);
  }
} else {
  packages = cli.args.length > 0 ? cli.args : getAllPackageNames();
}

if (deps) {
  const dependencies = uniq(
    packages.flatMap(pkg => getPackageLGDependencies(pkg)),
  );
  console.log(
    chalk.bold(`\nIncluding ${dependencies.length} dependencies:`),
    chalk.blue(`${dependencies}`),
  );
  packages.splice(0, 0, ...dependencies);
}

/**
 * `--exclude` - run all packages EXCEPT the ones following this flag (alias: `-e`)
 */
if (exclude && exclude.length > 0) {
  console.log(`${chalk.bold.red(`Excluding: ${exclude.length} packages`)}`);

  // Look for the packages we should be excluding
  packages = packages.filter(pkg => !exclude.includes(pkg));
}

packages = uniq(packages);

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

  // Run lerna
  cmdArgs.unshift(...packageArgs);

  const cmd = spawn('npx', ['lerna', 'run', ...cmdArgs], { stdio: 'inherit' });
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

function getAllPackageNames() {
  return fs
    .readdirSync(`${__dirname}/../packages`, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
}

function getPackageLGDependencies(pkg: string) {
  const pkgJson = JSON.parse(
    fs.readFileSync(`packages/${pkg}/package.json`, 'utf-8'),
  );
  const dependencies = Object.keys({
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
  })
    .filter(pkg => pkg.includes('@leafygreen-ui'))
    .map(pkg => pkg.replace(`@leafygreen-ui/`, ''));
  return dependencies;
}

// function argsIncludes(...flags : Array<any>) {
//   return flags.some(flag => args.includes(flag));
// }

// function removeFromArgs(...flags : Array<any>) {
//   flags.forEach(flag => {
//     const i = args.indexOf(flag);

//     if (i > -1) {
//       args.splice(i, 1);
//     }
//   });
// }
