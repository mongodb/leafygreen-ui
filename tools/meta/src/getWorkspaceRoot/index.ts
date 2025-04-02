import { sync as spawnSync } from 'cross-spawn';

export const getWorkspaceRoot = (): string => {
  try {
    const result = spawnSync('git', ['rev-parse', '--show-toplevel'], {
      stdio: 'pipe',
    });

    const { stdout } = result;
    return stdout.toString().trim();
  } catch (err) {
    console.error(err);
    return '';
  }
};
