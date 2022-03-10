const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const _ = require('lodash');

const cmdArgs = ['--parallel', 'build'];
const args = process.argv.slice(2);
let packages; // = getAllPackageNames();

// check if we should be watching
if (args.includes('--watch')) {
  cmdArgs.push('--', '--watch');
  removeFromArgs('--watch');
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
  // Look for the packages we should be excluding
  packages = (packages ?? getAllPackageNames()).filter(
    pkg => !args.includes(pkg),
  );
  removeFromArgs('--exclude', '-e', ...args);
} else {
  packages.push(...args);
}

packages = _.uniq(packages);
const packageArgs = packages.flatMap(pkg => [
  '--scope',
  `@leafygreen-ui/${pkg}`,
]);
cmdArgs.unshift(...packageArgs);

// eslint-disable-next-line no-console
console.log('Running pre-build...');
spawnSync('yarn', ['pre-build', ...packages], { stdio: 'inherit' });

// Run lerna
const cmd = spawn('npx', ['lerna', 'run', ...cmdArgs], { stdio: 'inherit' });
cmd.on('close', code => {
  // eslint-disable-next-line no-console
  console.log(code === 0 ? '✅ Finished building \n' : `Exit code ${code}`);
});

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
