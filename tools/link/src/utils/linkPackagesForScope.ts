/* eslint-disable no-console */
import { getPackageManager } from '@lg-tools/meta';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { createLinkFrom } from './createLinkFrom';
import { formatLog } from './formatLog';
import { installPackages } from './install';
import { linkPackageTo } from './linkPackageTo';
import { PackageDetails } from './types';

/** Packages that we will not link */
const ignorePackages = ['mongo-nav'];

export async function linkPackagesForScope(
  { scopeName, scopePath }: Pick<PackageDetails, 'scopeName' | 'scopePath'>,
  source: string,
  destination: string,
  packages?: Array<string>,
  verbose?: boolean,
): Promise<void> {
  const node_modulesDir = path.join(destination, 'node_modules');

  // The directory where the scope's packages are installed
  const installedModulesDir = path.join(destination, 'node_modules', scopeName);

  if (fse.existsSync(node_modulesDir)) {
    // Check that the destination has scope's packages installed
    if (fse.existsSync(installedModulesDir)) {
      // Get a list of all the packages in the destination
      // Run npm link on each package
      // Run npm link <packageName> on the destination
      const installedLGPackages = fse.readdirSync(installedModulesDir);

      const destinationPackageManager = getPackageManager(destination);

      const packagesToLink = installedLGPackages.filter(
        installedPkg =>
          !ignorePackages.includes(installedPkg) &&
          (!packages ||
            packages.some(pkgFlag => pkgFlag.includes(installedPkg))),
      );

      /** Create links */
      console.log(
        chalk.gray(
          ` Creating links to ${formatLog.scope(scopeName)} packages...`,
        ),
      );
      await Promise.all(
        packagesToLink.map(pkg => {
          createLinkFrom(source, {
            scopeName,
            scopePath,
            packageName: pkg,
            verbose,
            packageManager: destinationPackageManager,
          });
        }),
      );

      /** Connect link */
      console.log(
        chalk.gray(
          ` Connecting links for ${formatLog.scope(
            scopeName,
          )} packages to ${chalk.blue(formatLog.path(destination))}...`,
        ),
      );
      await Promise.all(
        packagesToLink.map((pkg: string) =>
          linkPackageTo(destination, {
            scopeName,
            packageName: pkg,
            packageManager: destinationPackageManager,
            verbose,
          }),
        ),
      );
    } else {
      console.error(
        chalk.gray(
          ` Couldn't find ${formatLog.scope(
            scopeName,
          )} scoped packages installed at ${chalk.blue(
            formatLog.path(destination),
          )}. Skipping.`,
        ),
      );
    }
  } else {
    console.error(chalk.yellow(`${formatLog.path('node_modules')} not found.`));
    // TODO: Prompt user to install instead of just running it

    await installPackages(destination);

    await linkPackagesForScope(
      { scopeName, scopePath },
      destination,
      source,
      packages,
      verbose,
    );
  }
}
