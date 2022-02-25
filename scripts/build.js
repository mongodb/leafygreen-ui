const { spawn, spawnSync } = require('child_process');
const fs = require('fs');

const getAllPackageNames = () =>
  fs
    .readdirSync(`${__dirname}/../packages`, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

const cmdArgs = ['--parallel', 'build'];
const args = process.argv.slice(2);

// check if we should be watching
if (args.includes('--watch')) {
  args.splice(args.indexOf('--watch'), 1);
  cmdArgs.push('--', '--watch');
}

if (args.length > 0) {
  let packageArgs;

  // If we need to ignore some packages
  if (args.some(arg => arg.startsWith('^'))) {
    packageArgs = getAllPackageNames()
      .filter(pkg => !args.includes(`^${pkg}`))
      .flatMap(pkg => ['--scope', `@leafygreen-ui/${pkg}`]);
  } else {
    // Add only the package names passed in
    packageArgs = args.flatMap(pkg => ['--scope', `@leafygreen-ui/${pkg}`]);
  }
  cmdArgs.unshift(...packageArgs);
}

// eslint-disable-next-line no-console
console.log('Running pre-build...');
spawnSync('yarn', ['pre-build', ...args], { stdio: 'inherit' });

// Run lerna
const cmd = spawn('npx', ['lerna', 'run', ...cmdArgs], { stdio: 'inherit' });
cmd.on('close', code => {
  // eslint-disable-next-line no-console
  console.log(code === 0 ? '✅ Finished building \n' : `Exit code ${code}`);
});
