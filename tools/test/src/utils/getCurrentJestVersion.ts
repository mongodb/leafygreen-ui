import { exitWithErrorMessage } from '@lg-tools/meta';
import { sync as spawnSync } from 'cross-spawn';

export function getCurrentJestVersion(jestBinary: string): string {
  const spawnResult = spawnSync(jestBinary, ['--version']);

  if (!spawnResult) {
    exitWithErrorMessage(`Error running jest binary ${jestBinary}`);
  }

  const stdout = spawnResult.stdout;

  if (!stdout) {
    exitWithErrorMessage(`No version returned from jest binary ${jestBinary}`);
  }

  const version = stdout.toString('utf-8').trim();
  return version;
}
