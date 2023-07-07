/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

import { Scope } from './scopes';

const program = new Command();

program
  .name('unlink')
  .description(
    "Link local LeafyGreen packages to a destination app. This is useful for testing changes to a package's source code in another project.",
  )
  .arguments('destination')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('--noInstall', 'Skip the yarn install step', false)
  .action(unlinkPackages)
  .parse(process.argv);

interface Opts {
  verbose: boolean;
  noInstall: boolean;
}

async function unlinkPackages(destination: string, opts: Opts) {
  const { verbose, noInstall } = opts;
  const relativeDestination = path.relative(process.cwd(), destination);

  // Check if the destination exists
  if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
    console.log(
      chalk.yellow(`Unlinking packages from ${relativeDestination} ...`),
    );

    await unlinkPackageForScope('@leafygreen-ui');
    await unlinkPackageForScope('@lg-tools');
    if (noInstall) {
      console.log(
        ` Skipping yarn install. \nYou will need to run ${chalk.bgGray.black(
          'yarn install --force',
        )} in ${destination} to restore dependencies.`,
      );
    } else {
      await forceInstall();
    }
    console.log(chalk.yellow('Finished unlinking packages.'));
  } else {
    throw new Error(`Can't find the directory ${relativeDestination}.`);
  }

  async function unlinkPackageForScope(scope: keyof typeof Scope) {
    const installedModulesDir = path.join(destination, 'node_modules', scope);

    if (fs.existsSync(installedModulesDir)) {
      const installedLGPackages = fs.readdirSync(installedModulesDir);
      console.log(chalk.gray(` Unlinking packages...`));
      await Promise.all(
        installedLGPackages.map(pkg =>
          unlinkPackageFromDestination(scope, pkg),
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

  function unlinkPackageFromDestination(
    scope: keyof typeof Scope,
    packageName: string,
  ): Promise<void> {
    const fullPackageName = `${scope}/${packageName}`;

    return new Promise(resolve => {
      verbose && console.log('Linking package:', chalk.blue(fullPackageName));

      spawn('yarn', ['unlink', fullPackageName], {
        cwd: destination,
        stdio: verbose ? 'inherit' : 'ignore',
      })
        .on('close', resolve)
        .on('error', () => {
          throw new Error(`Couldn't unlink package: ${fullPackageName}`);
        });
    });
  }

  function forceInstall() {
    return new Promise(resolve => {
      console.log(chalk.gray(` Reinstalling packages in ${destination}...`));
      spawn('yarn', ['install', '--force'], {
        cwd: destination,
        stdio: 'inherit',
      }).on('close', resolve);
    });
  }
}
