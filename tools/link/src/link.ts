/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { createLinkFrom } from './utils/createLinkFrom';
import { formatLog } from './utils/formatLog';
import { yarnInstall } from './utils/install';
import { linkPackageTo } from './utils/linkPackageTo';
import { PackageDetails } from './utils/types';

interface LinkOptions {
  packages: Array<string>;
  scope: string;
  verbose: boolean;
  to?: string;
  from?: string;
}

const ignorePackages = ['mongo-nav'];

export async function linkPackages(
  dest: string | undefined,
  opts: LinkOptions,
) {
  const { verbose, scope: scopeFlag, packages, to, from } = opts;

  const rootDir = process.cwd();

  if (!to && !dest && !from) {
    console.error('Error linking. Must provide either a destination or source');
  }

  const destination = path.resolve(path.join(rootDir, dest || to || '.'));
  const source = path.resolve(from ? path.join(rootDir, from) : rootDir);

  // Check if the destination exists
  if (
    !(
      destination &&
      fse.existsSync(destination) &&
      fse.lstatSync(destination).isDirectory()
    )
  ) {
    throw new Error(
      `Can't find the directory ${formatLog.path(destination ?? '')}.`,
    );
  }

  if (dest ?? to) {
    console.log(
      chalk.green(`Linking packages to ${formatLog.path(destination)} ...`),
    );
  }

  if (from) {
    console.log(
      chalk.green(`Linking packages from ${formatLog.path(source)} ...`),
    );
  }

  const { scopes: availableScopes } = getLGConfig(source);

  verbose &&
    console.log({
      availableScopes,
      dest,
      to,
      from,
      destination,
      source,
      rootDir,
    });

  const linkPromises: Array<Promise<void>> = [];

  for (const [scopeName, scopePath] of Object.entries(availableScopes)) {
    if (!scopeFlag || scopeFlag.includes(scopeName)) {
      linkPromises.push(
        linkPackagesForScope(
          { scopeName, scopePath },
          source,
          destination,
          packages,
          verbose,
        ),
      );
    }
  }

  await Promise.all(linkPromises);

  console.log(chalk.green('Finished linking packages.'));
}

async function linkPackagesForScope(
  { scopeName, scopePath }: Pick<PackageDetails, 'scopeName' | 'scopePath'>,
  source: string,
  destination: string,
  packages?: Array<string>,
  verbose?: boolean,
) {
  const node_modulesDir = path.join(destination, 'node_modules');

  // The directory where the scope's packages are installed
  const installedModulesDir = path.join(destination, 'node_modules', scopeName);

  if (fse.existsSync(node_modulesDir)) {
    // Check that the destination has scope's packages installed
    if (fse.existsSync(installedModulesDir)) {
      // Get a list of all the packages in the destination
      // Run yarn link on each package
      // Run yarn link <packageName> on the destination
      const installedLGPackages = fse.readdirSync(installedModulesDir);

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
          createLinkFrom(
            source,
            { scopeName, scopePath, packageName: pkg },
            verbose,
          );
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
          linkPackageTo(
            destination,
            {
              scopeName,
              packageName: pkg,
            },
            verbose,
          ),
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
    await yarnInstall(destination);
    await linkPackagesForScope(
      { scopeName, scopePath },
      destination,
      source,
      packages,
      verbose,
    );
  }
}
