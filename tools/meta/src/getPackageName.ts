/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';

import { getLGConfig } from './getLGConfig';

/**
 * Returns the full name of a package at a given directory
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

  const scopeName = Object.entries(scopes).find(
    ([_, _path]) => _path == scopePath,
  )?.[0];

  if (!scopeName) {
    console.log(
      chalk.red(`Could not get package name. ${scopePath} is not valid`),
    );
    return;
  }

  return scopeName + '/' + pkgName;
}
