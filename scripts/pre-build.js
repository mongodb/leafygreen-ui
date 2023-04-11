const { spawn } = require('child_process');

const cmdArgs = ['--parallel', 'pre-build', '--', '--env', 'production'];
const args = process.argv.slice(2);

// check if we should be watching
if (args.includes('--watch')) {
  args.splice(args.indexOf('--watch'), 1);
  cmdArgs.push('--', '--watch');
}

if (args.length > 0) {
  // Add only the package names passed in
  const packageArgs = args.flatMap(arg => ['--scope', `@leafygreen-ui/${arg}`]);
  cmdArgs.unshift(...packageArgs);
}

// Run turbo
const cmd = spawn('npx', ['turbo', 'run', ...cmdArgs], { stdio: 'inherit' });
cmd.on('close', code => {
  // eslint-disable-next-line no-console
  console.log(code === 0 ? '🛠️ Finished pre-build \n' : `Exit code ${code}`);
});
