/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import { homedir } from 'os';
import path from 'path';

import { Scope } from './scopes';
import { formatLog } from './utils';

const program = new Command();

program
  .name('link')
  .description(
    "Link local LeafyGreen packages to a destination app. This is useful for testing changes to a package's source code in another project.",
  )
  .arguments('destination')
  .option('-v --verbose', 'Prints additional information to the console', false)
  // TODO: Add `scope` option using `.addOption` method
  .action(linkPackages)
  .parse(process.argv);

async function linkPackages(
  destination: string,
  opts: { scope: string; verbose: boolean },
) {
  const { verbose } = opts;
  const relativeDestination = path.relative(process.cwd(), destination);

  // Check if the destination exists
  if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
    console.log(
      chalk.green(
        `Linking packages to ${formatLog.path(relativeDestination)} ...`,
      ),
    );
    await linkPackageForScope('@leafygreen-ui');
    await linkPackageForScope('@lg-tools');
    console.log(chalk.green('Finished linking packages.'));
  } else {
    throw new Error(
      `Can't find the directory ${formatLog.path(relativeDestination)}.`,
    );
  }

  async function linkPackageForScope(scope: keyof typeof Scope) {
    const node_modulesDir = path.join(destination, 'node_modules');

    // The directory where the scope's packages are installed
    const installedModulesDir = path.join(destination, 'node_modules', scope);

    if (fs.existsSync(node_modulesDir)) {
      // Check that the destination has scope's packages installed
      if (fs.existsSync(installedModulesDir)) {
        // Get a list of all the packages in the destination
        // Run yarn link on each package
        // Run yarn link <packageName> on the destination
        const installedLGPackages = fs.readdirSync(installedModulesDir);
        console.log(
          chalk.gray(
            ` Creating links to ${formatLog.scope(scope)} packages...`,
          ),
        );
        await Promise.all(
          installedLGPackages.map(pkg => {
            createYarnLinkForPackage(scope, pkg);
          }),
        );
        console.log(
          chalk.gray(
            ` Connecting links for ${formatLog.scope(
              scope,
            )} packages to ${chalk.blue(
              formatLog.path(relativeDestination),
            )}...`,
          ),
        );
        await Promise.all(
          installedLGPackages.map((pkg: string) =>
            linkPackageToDestination(scope, pkg),
          ),
        );
      } else {
        console.error(
          chalk.gray(
            ` Couldn't find ${formatLog.scope(
              scope,
            )} scoped packages installed at ${chalk.blue(
              formatLog.path(relativeDestination),
            )}. Skipping.`,
          ),
        );
      }
    } else {
      console.error(
        chalk.yellow(`${formatLog.path('node_modules')} not found.`),
      );
      // TODO: Prompt user to install instead of just running it
      await yarnInstall(destination);
      await linkPackageForScope(scope);
    }
  }

  /**
   * Runs the yarn link command in a leafygreen-ui package directory
   * @returns Promise that resolves when the yarn link command has finished
   */
  function createYarnLinkForPackage(
    scope: keyof typeof Scope,
    packageName: string,
  ): Promise<void> {
    const scopeSrc = Scope[scope];
    return new Promise<void>(resolve => {
      const packagesDirectory = findDirectory(process.cwd(), scopeSrc);

      if (packagesDirectory) {
        verbose &&
          console.log(
            'Creating link for:',
            chalk.green(`${scope}/${packageName}`),
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
    scope: keyof typeof Scope,
    packageName: string,
  ): Promise<void> {
    const fullPackageName = `${scope}/${packageName}`;
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
}

function findDirectory(
  startDir: string,
  targetDir: string,
): string | undefined {
  const testDir = path.join(startDir, targetDir);

  if (fs.existsSync(testDir) && fs.lstatSync(testDir).isDirectory()) {
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
