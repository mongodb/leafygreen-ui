/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';
import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import { homedir } from 'os';
import path from 'path';

import { formatLog } from './utils';

interface LinkOptions {
  packages: Array<string>;
  scope: string;
  verbose: boolean;
}

const ignorePackages = ['mongo-nav'];

export async function linkPackages(destination: string, opts: LinkOptions) {
  const { verbose, scope: scopeFlag, packages } = opts;
  const rootDir = process.cwd();
  const relativeDestination = path.relative(rootDir, destination);

  // Check if the destination exists
  if (
    !(fse.existsSync(destination) && fse.lstatSync(destination).isDirectory())
  ) {
    throw new Error(
      `Can't find the directory ${formatLog.path(relativeDestination)}.`,
    );
  }

  console.log(
    chalk.green(
      `Linking packages to ${formatLog.path(relativeDestination)} ...`,
    ),
  );

  const { scopes: availableScopes } = getLGConfig();

  const linkPromises: Array<Promise<void>> = [];

  for (const [scopeName, scopePath] of Object.entries(availableScopes)) {
    if (!scopeFlag || scopeFlag.includes(scopeName)) {
      linkPromises.push(
        linkPackagesForScope(
          scopeName,
          scopePath as string,
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
  scopeName: string,
  scopePath: string,
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

      console.log(
        chalk.gray(
          ` Creating links to ${formatLog.scope(scopeName)} packages...`,
        ),
      );
      await Promise.all(
        packagesToLink.map(pkg => {
          createYarnLinkForPackage(scopeName, scopePath, pkg, verbose);
        }),
      );
      console.log(
        chalk.gray(
          ` Connecting links for ${formatLog.scope(
            scopeName,
          )} packages to ${chalk.blue(formatLog.path(destination))}...`,
        ),
      );
      await Promise.all(
        packagesToLink.map((pkg: string) =>
          linkPackageToDestination(scopeName, pkg, destination, verbose),
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
      scopeName,
      scopePath,
      destination,
      packages,
      verbose,
    );
  }
}

/**
 * Runs the yarn link command in a leafygreen-ui package directory
 * @returns Promise that resolves when the yarn link command has finished
 */
function createYarnLinkForPackage(
  scopeName: string,
  scopePath: string,
  packageName: string,
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

/**
 * Runs the yarn link <packageName> command in the destination directory
 * @returns Promise that resolves when the yarn link <packageName> command has finished
 */
function linkPackageToDestination(
  scopeName: string,
  packageName: string,
  destination: string,
  verbose?: boolean,
): Promise<void> {
  const fullPackageName = `${scopeName}/${packageName}`;
  return new Promise<void>(resolve => {
    verbose && console.log('Linking package:', chalk.blue(fullPackageName));
    spawn('yarn', ['link', fullPackageName], {
      cwd: destination,
      stdio: verbose ? 'inherit' : 'ignore',
    })
      .on('close', resolve)
      .on('error', () => {
        throw new Error(`Couldn't link package: ${fullPackageName}`);
      });
  });
}

function findDirectory(
  startDir: string,
  targetDir: string,
): string | undefined {
  const testDir = path.join(startDir, targetDir);

  if (fse.existsSync(testDir) && fse.lstatSync(testDir).isDirectory()) {
    return testDir;
  } else {
    const parentDir = path.join(startDir, '..');

    // If we haven't reached the users home directory, recursively look for the packages directory
    if (parentDir !== homedir()) {
      return findDirectory(path.join(startDir, '..'), targetDir);
    }
  }
}

function yarnInstall(path: string) {
  return new Promise((resolve, reject) => {
    spawn('yarn', ['install'], {
      cwd: path,
      stdio: 'ignore',
    })
      .on('close', resolve)
      .on('error', () => {
        throw new Error(`Error installing packages`);
      });
  });
}
