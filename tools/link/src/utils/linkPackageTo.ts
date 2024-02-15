import { getPackageManager, SupportedPackageManager } from '@lg-tools/meta';
import chalk from 'chalk';
import { spawn } from 'cross-spawn';

import { PackageDetails } from './types';

interface LinkPackagesToOptions
  extends Pick<PackageDetails, 'scopeName' | 'packageName'> {
  verbose?: boolean;
  packageManager?: SupportedPackageManager;
}

/**
 * Runs the yarn link <packageName> command in the destination directory
 * @returns Promise that resolves when the yarn link <packageName> command has finished
 */
export function linkPackageTo(
  destination: string,
  { scopeName, packageName, verbose, packageManager }: LinkPackagesToOptions,
): Promise<void> {
  const fullPackageName = `${scopeName}/${packageName}`;
  return new Promise<void>(resolve => {
    // eslint-disable-next-line no-console
    verbose && console.log('Linking package:', chalk.blue(fullPackageName));
    packageManager = packageManager ?? getPackageManager(destination);

    spawn(packageManager, ['link', fullPackageName], {
      cwd: destination,
      stdio: verbose ? 'inherit' : 'ignore',
    })
      .on('close', resolve)
      .on('error', () => {
        throw new Error(`Couldn't link package: ${fullPackageName}`);
      });
  });
}
