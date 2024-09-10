/* eslint-disable no-console */
import { exitWithErrorMessage, getLGConfig } from '@lg-tools/meta';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { formatLog } from './utils/formatLog';
import { linkPackagesForScope } from './utils/linkPackagesForScope';

interface LinkOptions {
  packages: Array<string>;
  scope: string;
  verbose: boolean;
  to?: string;
  from?: string;
}

export async function linkPackages(
  dest: string | undefined,
  opts: LinkOptions,
) {
  const { verbose, scope: scopeFlag, packages, to, from } = opts;

  const rootDir = process.cwd();

  if (!to && !dest && !from) {
    exitWithErrorMessage(
      'Error linking. Must provide either a destination or source',
    );
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
    exitWithErrorMessage(
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
