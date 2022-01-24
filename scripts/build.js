const { spawn, spawnSync } = require('child_process');

const cmdArgs = ['--parallel', 'build'];
const args = process.argv.slice(2);

// check if we should be watching
if (args.includes('--watch')) {
  args.splice(args.indexOf('--watch'), 1);
  cmdArgs.push('--', '--watch');
}

// eslint-disable-next-line no-console
console.log('Running pre-build...');
spawnSync('yarn', ['pre-build', ...args], { stdio: 'inherit' });

if (args.length > 0) {
  // Add only the package names passed in
  const packageArgs = args.flatMap(arg => ['--scope', `@leafygreen-ui/${arg}`]);
  cmdArgs.unshift(...packageArgs);
}

// Run lerna
const cmd = spawn('npx', ['lerna', 'run', ...cmdArgs], { stdio: 'inherit' });
cmd.on('close', code => {
  // eslint-disable-next-line no-console
  console.log(code === 0 ? '✅ Finished building \n' : `Exit code ${code}`);
});
