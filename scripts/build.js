const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const _ = require('lodash');
const chalk = require('chalk');
const { exit } = require('process');

const cmdArgs = ['--parallel', 'build'];
const args = process.argv.slice(2);
let packages = [];
let dryRun = false;

const docs = `
${chalk.green.bold.underline('Leafygreen Build script')}

By default, this script will build all packages in the \`packages/\` directory.
Cutomize which packages get built by adding flags to this script:

${chalk.bold.inverse('--help, -h')}: Show this help menu.

${chalk.bold.inverse(
  '--exclude, -e',
)}: Optionally "exclude" packages from being built.
  For example: ${chalk.bgGray(
    `yarn build -e icon typography`,
  )} will build everything ${chalk.underline('but')} icon & typography.
  Note: If an exclude flag is provided, any packages listed before the flag are ignored.

${chalk.bold.inverse(
  '--diff',
)}: Builds packages that you have been working on, based on the current git diff

${chalk.bold.inverse(
  '--dependencies, --deps',
)}: Builds packages that you have been working on, and their leafygreen-ui dependencies. 

${chalk.bold.inverse(
  '--dry',
)}: Don't build, but print what would have been build given the same arguments.

${chalk.bold.inverse('--watch')}: Watch all files you intend to build
`;

if (argsIncludes('--help', '-h')) {
  // eslint-disable-next-line no-console
  console.log(docs);
  exit(0);
}

// check if we should be watching
if (args.includes('--watch')) {
  cmdArgs.push('--', '--watch');
  removeFromArgs('--watch');
}

if (argsIncludes('--dry')) {
  dryRun = true;
  removeFromArgs('--dry');
}

/**
 * `--diff` - builds only packages that have uncommitted changes
 * `--dependencies` or `--deps` - builds the dependencies of packages that have uncommitted changes
 */
if (argsIncludes('--diff', '--dependencies', '--deps')) {
  // Base this off of git-staged files
  // TODO - see if we can get files that have been changed vs `main`
  const gitDiff = spawnSync('git', ['diff', '--name-only']).stdout.toString();
  packages = gitDiff
    .trim()
    .split('\n')
    .filter(file => file.startsWith('packages/'))
    .map(file => file.replace(/(?<=packages\/.*?\/)(.*)|(packages\/)|\//g, ''));

  if (argsIncludes('--dependencies', '--deps')) {
    const dependencies = packages.flatMap(pkg => getPackageDependencies(pkg));
    packages.splice(0, 0, ...dependencies);
  }
  removeFromArgs('--diff', '--dependencies', '--deps');
}

/**
 * `--exclude` - run all packages EXCEPT the ones following this flag (alias: `-e`)
 */
if (argsIncludes('--exclude', '-e')) {
  removeFromArgs('--exclude', '-e');
  // Look for the packages we should be excluding
  packages = (packages.length ? packages : getAllPackageNames()).filter(
    pkg => !args.includes(pkg),
  );

  // eslint-disable-next-line no-console
  console.log(`
  ${chalk.bold('Excluding:')} ${chalk.red(args.join(', '))}
  `);

  removeFromArgs(...args);
} else {
  packages.push(...args);
}

// Remove duplicates
packages = _.uniq(packages);

if (!dryRun) {
  const packageArgs = packages.flatMap(pkg => [
    '--scope',
    `@leafygreen-ui/${pkg}`,
  ]);

  // eslint-disable-next-line no-console
  console.log(chalk.magenta('Running pre-build...'));
  spawnSync('yarn', ['pre-build', ...packages], { stdio: 'inherit' });

  // Run lerna
  cmdArgs.unshift(...packageArgs);

  // eslint-disable-next-line no-console
  console.log(chalk.green.bold(`Building ${packages.length} packages.\n`));

  const cmd = spawn('npx', ['lerna', 'run', ...cmdArgs], { stdio: 'inherit' });
  cmd.on('close', code => {
    // eslint-disable-next-line no-console
    console.log(
      code === 0
        ? chalk.green.bold(`\n✅ Finished building\n`)
        : chalk.red.bold(`\nExit code ${code}\n`),
    );
  });
} else {
  // eslint-disable-next-line no-console
  console.log(`
  ${chalk.bgYellowBright.black.bold('    Dry Run    ')}
  ${chalk.bold('Would have built:')}
    ${chalk.green(packages.length ? packages.join(', ') : 'all packages')}
  `);
}

function getAllPackageNames() {
  return fs
    .readdirSync(`${__dirname}/../packages`, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
}

function getPackageDependencies(pkg) {
  const pkgJson = JSON.parse(fs.readFileSync(`packages/${pkg}/package.json`));
  const dependencies = Object.keys(pkgJson.dependencies).map(pkg =>
    pkg.replace(`@leafygreen-ui/`, ''),
  );
  return dependencies;
}

function argsIncludes(...flags) {
  return flags.some(flag => args.includes(flag));
}

function removeFromArgs(...flags) {
  flags.forEach(flag => {
    const i = args.indexOf(flag);

    if (i > -1) {
      args.splice(i, 1);
    }
  });
}
