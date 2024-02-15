/* eslint-disable no-console */
import { exitWithErrorMessage } from '@lg-tools/meta';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { TestCommandOptions } from '..';

import { getCurrentJestVersion } from './getCurrentJestVersion';

/** Returns the path of the correct Jest binary */
export function getJestBinary(options: TestCommandOptions): string {
  const { verbose } = options;

  const rootDir = process.cwd();

  const jestBinaryPath = path.resolve(
    rootDir,
    './node_modules/jest/bin/jest.js',
  );

  if (!fse.existsSync(jestBinaryPath)) {
    exitWithErrorMessage(`Could not find jest binary ${jestBinaryPath}`);
  }

  const jestVersion = getCurrentJestVersion(jestBinaryPath);

  verbose && console.log(chalk.gray.bold(`\nUsing jest@${jestVersion}`));
  verbose && console.log(chalk.gray('\tJest binary path:', jestBinaryPath));

  return jestBinaryPath;
}
