/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import trim from 'lodash/trim';

import { getLGConfig, type LGConfig } from '../getLGConfig';

/**
 * Returns the full name of a package at a given directory
 *
 * e.g. `getPackageName('packages/button)` => `@leafygreen-ui/button`
 */
export function getPackageName(dir: string) {
  if (!fse.existsSync(dir)) {
    console.log(chalk.red(`Could not get package name. ${dir} does not exist`));
    return;
  }

  const { scopes } = getLGConfig();
  const splitPath = dir.split('/');

  const pkgName = splitPath[splitPath.length - 1];
  const scopePath = splitPath[splitPath.length - 2];

  const scopeName = getScopeNameFromPath(scopes, scopePath);

  if (!scopeName) {
    console.log(
      chalk.red(
        `Could not get package name. \`${scopePath}\` is not a valid scope path`,
      ),
      { scopes },
    );
    return;
  }

  return scopeName + '/' + pkgName;
}

const getScopeNameFromPath = (scopes: LGConfig['scopes'], path: string) => {
  return Object.entries(scopes).find(([_, scopePath]) => {
    return trim(scopePath, '/') === trim(path, '/');
  })?.[0];
};
