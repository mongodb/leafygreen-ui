const { spawn, spawnSync } = require('child_process');

console.log('Running pre-build...');
spawnSync('yarn', ['pre-build'], { stdio: 'inherit' });

const args = process.argv.slice(2);

const cmdArgs = ['--parallel', 'build'];

// check if we should be watching
if (args.includes('--watch')) {
  args.splice(args.indexOf('--watch'), 1);
  cmdArgs.push('--', '--watch');
}

if (args.length > 0) {
  // Run the build script for only the package names passed in
  const packageArgs = args.flatMap(arg => ['--scope', `@leafygreen-ui/${arg}`]);
  cmdArgs.unshift(...packageArgs);
}

// otherwise build all packages
const cmd = spawn('npx', ['lerna', 'run', ...cmdArgs], { stdio: 'inherit' });
cmd.on('close', code => {
  if (code == 0) console.log('Finished building');
  else console.log(`Exit code ${code}`);
});
