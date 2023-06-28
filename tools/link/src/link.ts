import chalk from 'chalk';
import { spawn } from 'child_process';
import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import { homedir } from 'os';
import { Scope } from './scopes';

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
    console.log(chalk.green(`Linking packages to ${relativeDestination} ...`));
    await linkPackageForScope('@leafygreen-ui');
    await linkPackageForScope('@lg-tools');
    console.log(chalk.green('Finished linking packages.'));
  } else {
    throw new Error(`Can't find the directory ${relativeDestination}.`);
  }

  async function linkPackageForScope(scope: keyof typeof Scope) {
    // The directory where the leafygreen-ui packages are installed
    const installedModulesDir = path.join(destination, 'node_modules', scope);
    // Check that the destination has leafygreen-ui packages installed
    if (fs.existsSync(installedModulesDir)) {
      // Get a list of all the packages in the destination
      // Run yarn link on each package
      // Run yarn link <packageName> on the destination
      const installedLGPackages = fs.readdirSync(installedModulesDir);
      console.log(chalk.gray(` Creating links...`));
      await Promise.all(
        installedLGPackages.map(pkg => {
          createYarnLinkForPackage(scope, pkg);
        }),
      );
      console.log(chalk.gray(` Connecting links...`));
      await Promise.all(
        installedLGPackages.map((pkg: string) =>
          linkPackageToDestination(scope, pkg),
        ),
      );
    } else {
      console.error(
        chalk.gray(
          ` Couldn't find any ${chalk.blue(
            scope,
          )} packages installed at ${chalk.blue(
            relativeDestination,
          )}. Skipping.`,
        ),
      );
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
