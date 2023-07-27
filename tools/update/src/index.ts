/* eslint-disable no-console */
import { getPackageManager } from '@lg-tools/meta';
import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

export interface UpdateCommandOptions {
  /**
   * Upgrades to the latest version, ignoring the specified range in `package.json`
   */
  latest: boolean;

  scope: string;
}

export const update = (
  packages: Array<string>,
  options: UpdateCommandOptions,
) => {
  const rootDir = process.cwd();
  const node_modulesDir = path.join(rootDir, 'node_modules');

  if (!fse.existsSync(node_modulesDir)) {
    console.error(
      chalk.red('Could not find `node_modules` directory at', node_modulesDir),
    );
  }

  const pkgMgr = getPackageManager(rootDir);
  const cmd = pkgMgr === 'npm' ? 'update' : 'upgrade';

  spawn(
    pkgMgr,
    [
      cmd,
      ...(packages ?? []),
      '--scope',
      options.scope,
      options.latest ? '--latest' : '',
    ],
    {
      stdio: 'inherit',
    },
  );
};
