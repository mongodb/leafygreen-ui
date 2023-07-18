/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { Scope } from './scopes';

export interface UpdateCommandOptions {
  /**
   * Upgrades to the latest version, ignoring the specified range in `package.json`
   */
  latest: boolean;
}

export const update = (
  packages?: Array<string>,
  options?: UpdateCommandOptions,
) => {
  const rootDir = process.cwd();
  const node_modulesDir = path.join(rootDir, 'node_modules');

  if (!fs.existsSync(node_modulesDir)) {
    console.error(
      chalk.red('Could not find `node_modules` directory at', node_modulesDir),
    );
  }

  spawn(
    'yarn',
    [
      'upgrade',
      ...(packages ?? []),
      '--scope',
      ...Object.keys(Scope),
      options?.latest ? '--latest' : '',
    ],
    {
      stdio: 'inherit',
    },
  );
};
