/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { isValidJSON } from './getRootPackageJson';

/**
 * Returns the `package.json` data for a given directory.
 *
 * @param dir defaults to `__dirname`
 */
export function getPackageJson(
  dir = __dirname,
): Record<string, any> | undefined {
  if (!fse.existsSync(dir)) {
    console.log(chalk.red(`Could not get package name. ${dir} does not exist`));
    return;
  }

  return findPackageJson(dir);
}

function findPackageJson(dir: string): Record<string, any> | undefined {
  if (dir === '/') {
    console.log(
      chalk.red(`Could not find a package.json file in any parent directory`),
    );

    return;
  }

  const pkgJsonPath = path.resolve(dir, 'package.json');

  if (fse.existsSync(pkgJsonPath)) {
    const pkgJsonStr = fse.readFileSync(pkgJsonPath, 'utf-8');

    if (isValidJSON(pkgJsonStr)) {
      return JSON.parse(pkgJsonStr);
    } else {
      console.log(chalk.red(`Invalid JSON found in file ${pkgJsonPath}`));
    }
  } else {
    return findPackageJson(path.resolve(dir, '..'));
  }
}
