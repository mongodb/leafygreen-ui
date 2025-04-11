/* eslint-disable no-console */
import { spawn } from 'cross-spawn';
import chalk from 'chalk';

import { getPackageManager } from '@lg-tools/meta';

import type {InstallCommandOptions} from './types'
import { getPackagesToInstall } from './getPackagesToInstall';


const rootDir = process.cwd();

/**
 * Installs the defined LeafyGreen packages
 */
export const installLeafyGreen = (
  packages: Array<string>,
  { ignoreWorkspaceRootCheck, verbose, dry }: InstallCommandOptions,
) => {
  console.log('Preparing to install LeafyGreen packages...');

  // Get packages to install (from static file or NPM)
  const packagesToInstall = getPackagesToInstall(packages, { verbose })
  
  if (!packagesToInstall.length) {
    console.error('No packages found to install');
    return;
  }

  console.log(chalk.green(`🥬 Installing ${packagesToInstall.length} LeafyGreen packages`));

  const pkgMgr = getPackageManager(rootDir);
  verbose && console.log(`Detected package manager: ${pkgMgr}`);
  
  const installCommand = pkgMgr === 'yarn' ? 'add' : 'install';
  const commandOptions = [ignoreWorkspaceRootCheck ? '-W' : '']

  if (dry) {
    console.log(`Dry run: Would have installed ${packagesToInstall.length} packages`);
    verbose && console.log('Dry run Would have run command: ');
    verbose && console.log(chalk.gray(`${pkgMgr} ${installCommand} ${packagesToInstall.join(' ')} ${commandOptions.join(' ')}`,));
    return
  }

  spawn(
    pkgMgr,
    [
      installCommand,
      ...packagesToInstall,
      ...commandOptions
    ],
    {
      stdio: 'inherit',
    },
  );
};
