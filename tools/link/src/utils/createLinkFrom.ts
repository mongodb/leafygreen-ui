/* eslint-disable no-console */
import { getPackageManager, SupportedPackageManager } from '@lg-tools/meta';
import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import path from 'path';

import { findDirectory } from './findDirectory';
import { PackageDetails } from './types';

interface CreateLinkOptions extends PackageDetails {
  verbose?: boolean;
  packageManager?: SupportedPackageManager;
}

/**
 * Runs the yarn link command in a leafygreen-ui package directory
 * @returns Promise that resolves when the yarn link command has finished
 */
export function createLinkFrom(
  source: string = process.cwd(),
  {
    scopeName,
    scopePath,
    packageName,
    packageManager,
    verbose,
  }: CreateLinkOptions,
): Promise<void> {
  const scopeSrc = scopePath;
  return new Promise<void>(resolve => {
    const packagesDirectory = findDirectory(source, scopeSrc);
    packageManager = packageManager ?? getPackageManager(source);

    if (packagesDirectory) {
      verbose &&
        console.log(
          'Creating link for:',
          chalk.green(`${scopeName}/${packageName}`),
        );

      spawn(packageManager, ['link'], {
        cwd: path.join(packagesDirectory, packageName),
        stdio: verbose ? 'inherit' : 'ignore',
      })
        .on('close', resolve)
        .on('error', () => {
          throw new Error(`Couldn't create link for package: ${packageName}`);
        });
    } else {
      throw new Error(
        `Can't find a ${scopeSrc} directory in ${process.cwd()} or any of its parent directories.`,
      );
    }
  });
}
