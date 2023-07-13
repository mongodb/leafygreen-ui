/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

import { Scope } from './scopes';
import { formatLog } from './utils';

interface UnlinkOpts {
  verbose: boolean;
  noInstall: boolean;
  scope: keyof typeof Scope;
}

export async function unlinkPackages(destination: string, opts: UnlinkOpts) {
  const { verbose, noInstall, scope } = opts;
  const relativeDestination = path.relative(process.cwd(), destination);

  // Check if the destination exists
  if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
    console.log(
      chalk.yellow(
        `Unlinking packages from ${formatLog.path(relativeDestination)} ...`,
      ),
    );

    if (scope === '@leafygreen-ui') {
      await unlinkPackageForScope('@leafygreen-ui');
    } else if (scope === '@lg-tools') {
      await unlinkPackageForScope('@lg-tools');
    } else {
      await Promise.all([
        unlinkPackageForScope('@leafygreen-ui'),
        unlinkPackageForScope('@lg-tools'),
      ]);
    }

    if (noInstall) {
      console.log(
        ` Skipping yarn install. \nYou will need to run ${formatLog.cmd(
          'yarn install --force',
        )} in ${formatLog.path(destination)} to restore dependencies.`,
      );
    } else {
      await forceInstall();
    }
    console.log(chalk.yellow('Finished unlinking packages.'));
  } else {
    throw new Error(
      `Can't find the directory ${formatLog.path(relativeDestination)}.`,
    );
  }

  async function unlinkPackageForScope(scope: keyof typeof Scope) {
    const installedModulesDir = path.join(destination, 'node_modules', scope);

    if (fs.existsSync(installedModulesDir)) {
      const installedLGPackages = fs.readdirSync(installedModulesDir);
      chalk.gray(
        ` Removing links to ${formatLog.scope(scope)} scoped packages...`,
      ),
        await Promise.all(
          installedLGPackages.map(pkg =>
            unlinkPackageFromDestination(scope, pkg),
          ),
        );
    } else {
      console.error(
        chalk.gray(
          ` Couldn't find any ${formatLog.scope(
            scope,
          )} packages installed at ${formatLog.path(
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
      console.log(
        chalk.gray(
          ` Reinstalling packages in ${formatLog.path(destination)}...`,
        ),
      );
      spawn('yarn', ['install', '--force'], {
        cwd: destination,
        stdio: 'inherit',
      }).on('close', resolve);
    });
  }
}
