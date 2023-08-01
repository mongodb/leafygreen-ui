/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';
import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

import { formatLog } from './utils';

interface UnlinkOpts {
  verbose: boolean;
  noInstall: boolean;
  scope: string;
}

export async function unlinkPackages(destination: string, opts: UnlinkOpts) {
  const { verbose, noInstall, scope: scopeFlag } = opts;
  const relativeDestination = path.relative(process.cwd(), destination);

  // Check if the destination exists
  if (
    !(fse.existsSync(destination) && fse.lstatSync(destination).isDirectory())
  ) {
    throw new Error(
      `Can't find the directory ${formatLog.path(relativeDestination)}.`,
    );
  }
  console.log(
    chalk.yellow(
      `Unlinking packages from ${formatLog.path(relativeDestination)} ...`,
    ),
  );

  const { scopes: availableScopes } = getLGConfig();

  const unlinkPromises: Array<Promise<void>> = [];

  for (const scopeName of Object.keys(availableScopes)) {
    if (!scopeFlag || scopeFlag.includes(scopeName)) {
      unlinkPromises.push(
        unlinkPackageForScope(scopeName, destination, verbose),
      );
    }
  }

  await Promise.all(unlinkPromises);

  if (noInstall) {
    console.log(
      ` Skipping yarn install. \nYou will need to run ${formatLog.cmd(
        'yarn install --force',
      )} in ${formatLog.path(destination)} to restore dependencies.`,
    );
  } else {
    await forceInstall(destination);
  }
  console.log(chalk.yellow('Finished unlinking packages.'));
}

async function unlinkPackageForScope(
  scopeName: string,
  destination: string,
  verbose?: boolean,
) {
  const installedModulesDir = path.join(destination, 'node_modules', scopeName);

  if (fse.existsSync(installedModulesDir)) {
    const installedLGPackages = fse.readdirSync(installedModulesDir);
    chalk.gray(
      ` Removing links to ${formatLog.scope(scopeName)} scoped packages...`,
    ),
      await Promise.all(
        installedLGPackages.map(pkg =>
          unlinkPackageFromDestination(scopeName, pkg, destination, verbose),
        ),
      );
  } else {
    console.error(
      chalk.gray(
        ` Couldn't find any ${formatLog.scope(
          scopeName,
        )} packages installed at ${formatLog.path(destination)}. Skipping.`,
      ),
    );
  }
}

function unlinkPackageFromDestination(
  scopeName: string,
  packageName: string,
  destination: string,
  verbose?: boolean,
): Promise<void> {
  const fullPackageName = `${scopeName}/${packageName}`;

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

function forceInstall(destination: string) {
  return new Promise(resolve => {
    console.log(
      chalk.gray(` Reinstalling packages in ${formatLog.path(destination)}...`),
    );
    spawn('yarn', ['install', '--force'], {
      cwd: destination,
      stdio: 'inherit',
    }).on('close', resolve);
  });
}
