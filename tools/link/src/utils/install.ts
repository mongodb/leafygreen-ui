import { spawn } from 'cross-spawn';

export function yarnInstall(path: string) {
  return new Promise((resolve, reject) => {
    spawn('yarn', ['install'], {
      cwd: path,
      stdio: 'ignore',
    })
      .on('close', resolve)
      .on('error', () => {
        throw new Error(`Error installing packages`);
      });
  });
}
