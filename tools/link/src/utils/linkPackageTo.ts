import { getPackageManager, SupportedPackageManager } from '@lg-tools/meta';
import chalk from 'chalk';
import path from 'path';

import { spawnLogged } from './spawnLogged';
import { PackageDetails } from './types';

interface LinkPackagesToOptions
  extends Pick<PackageDetails, 'scopeName' | 'packageName'> {
  verbose?: boolean;
  packageManager?: SupportedPackageManager;
  toolPath?: string;
}

/**
 * Runs the pnpm link <packageName> command in the destination directory
 * @returns Promise that resolves when the pnpm link <packageName> command has finished
 */
export async function linkPackageTo(
  destination: string,
  {
    scopeName,
    packageName,
    verbose,
    packageManager,
    toolPath,
  }: LinkPackagesToOptions,
): Promise<void> {
  const fullPackageName = `${scopeName}/${packageName}`;
  // eslint-disable-next-line no-console
  verbose && console.log('Linking package:', chalk.blue(fullPackageName));

  const resolvedPackageManager =
    packageManager ?? getPackageManager(destination);

  try {
    await spawnLogged(resolvedPackageManager, ['link', fullPackageName], {
      name: `link_dst:${packageName}`,
      cwd: destination,
      verbose,
      env: toolPath
        ? {
            ...process.env,
            PATH: `${toolPath}${path.delimiter}${process.env.PATH}`,
          }
        : undefined,
    });
  } catch (_) {
    throw new Error(`Couldn't link package: ${fullPackageName}`);
  }
}
