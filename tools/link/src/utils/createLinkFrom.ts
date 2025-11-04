/* eslint-disable no-console */
import { getPackageManager, SupportedPackageManager } from '@lg-tools/meta';
import chalk from 'chalk';
import path from 'path';

import { findDirectory } from './findDirectory';
import { spawnLogged } from './spawnLogged';
import { PackageDetails } from './types';

interface CreateLinkOptions extends PackageDetails {
  verbose?: boolean;
  packageManager?: SupportedPackageManager;
  toolPath?: string;
}

/**
 * Runs the pnpm link command in a leafygreen-ui package directory
 * @returns Promise that resolves when the pnpm link command has finished
 */
export async function createLinkFrom(
  source: string = process.cwd(),
  {
    scopeName,
    scopePath,
    packageName,
    packageManager,
    verbose,
    toolPath,
  }: CreateLinkOptions,
): Promise<void> {
  const scopeSrc = scopePath;
  const packagesDirectory = findDirectory(source, scopeSrc);

  if (packagesDirectory) {
    verbose &&
      console.log(
        'Creating link for:',
        chalk.green(`${scopeName}/${packageName}`),
      );

    const resolvedPackageManager =
      packageManager ?? getPackageManager(packagesDirectory);

    try {
      await spawnLogged(resolvedPackageManager, ['link'], {
        name: `link_src:${packageName}`,
        cwd: path.join(packagesDirectory, packageName),
        verbose,
        env: toolPath
          ? {
              ...process.env,
              PATH: `${toolPath}${path.delimiter}${process.env.PATH}`,
            }
          : undefined,
      });
    } catch (_) {
      throw new Error(`Couldn't create link for package: ${packageName}`);
    }
  } else {
    throw new Error(
      `Can't find a ${scopeSrc} directory in ${process.cwd()} or any of its parent directories.`,
    );
  }
}
