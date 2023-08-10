/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import path from 'path';

import { findDirectory } from './findDirectory';
import { PackageDetails } from './types';

/**
 * Runs the yarn link command in a leafygreen-ui package directory
 * @returns Promise that resolves when the yarn link command has finished
 */
export function createLinkFrom(
  source: string,
  { scopeName, scopePath, packageName }: PackageDetails,
  verbose?: boolean,
): Promise<void> {
  const scopeSrc = scopePath;
  return new Promise<void>(resolve => {
    const packagesDirectory = findDirectory(process.cwd(), scopeSrc);

    if (packagesDirectory) {
      verbose &&
        console.log(
          'Creating link for:',
          chalk.green(`${scopeName}/${packageName}`),
        );
      spawn('yarn', ['link'], {
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
