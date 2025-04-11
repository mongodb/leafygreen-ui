/* eslint-disable no-console */
import { getPackageManager } from '@lg-tools/meta';
import chalk from 'chalk';
import { spawn } from 'cross-spawn';

import { getPackagesToInstall } from './getPackagesToInstall';
import type { InstallCommandOptions } from './types';

const rootDir = process.cwd();

/**
 * Installs the defined LeafyGreen packages
 */
export const installLeafyGreen = (
  packages: Array<string>,
  options: InstallCommandOptions,
) => {
  const { verbose, dry } = options;

  console.log('Preparing to install LeafyGreen packages...');

  // Get packages to install based on options and flags
  const packagesToInstall = getPackagesToInstall(packages, options);

  if (!packagesToInstall.length) {
    console.error('No packages found to install');
    return;
  }

  console.log(
    chalk.green(
      `🥬 Installing ${packagesToInstall.length} LeafyGreen packages`,
    ),
  );

  const pkgMgr = getPackageManager(rootDir);
  verbose && console.log(`Detected package manager: ${pkgMgr}`);

  const installCommand = pkgMgr === 'yarn' ? 'add' : 'install';

  if (dry) {
    console.log(
      `Dry run: Would have installed ${packagesToInstall.length} packages`,
    );
    verbose && console.log('Dry run—would have run command: ');
    verbose &&
      console.log(
        chalk.gray(
          `${pkgMgr} ${installCommand} ${packagesToInstall.join(' ')}`,
        ),
      );
    return;
  }

  spawn(pkgMgr, [installCommand, ...packagesToInstall], {
    stdio: 'inherit',
  });
};
