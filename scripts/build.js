const { spawn, spawnSync } = require('child_process');
const fs = require('fs');

const getAllPackageNames = () =>
  fs
    .readdirSync(`${__dirname}/../packages`, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

const cmdArgs = ['--parallel', 'build'];
const args = process.argv.slice(2);
let packages = args;

// check if we should be watching
if (args.includes('--watch')) {
  args.splice(args.indexOf('--watch'), 1);
  cmdArgs.push('--', '--watch');
}

// TODO: add a flag to build only changed files
// Base this off of git-staged files or off of components different from `main`

// Look for the packages we should be excluding
if (args.includes('--exclude') || args.includes('-e')) {
  const flagIndex =
    args.indexOf('--exclude') >= 0
      ? args.indexOf('--exclude')
      : args.indexOf('-e');
  args.splice(flagIndex, 1);

  packages = getAllPackageNames().filter(pkg => !args.includes(`${pkg}`));
}

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
