import { spawnSync } from 'child_process';

export function getGitDiff(): Array<string> {
  const gitDiff = spawnSync('git', [
    'diff',
    '..origin/main',
    '--name-only',
  ]).stdout.toString();

  return gitDiff
    .trim()
    .split('\n')
    .filter(file => file.startsWith('packages/'))
    .map(file => file.replace(/(?<=packages\/.*?\/)(.*)|(packages\/)|\//g, ''));
}
