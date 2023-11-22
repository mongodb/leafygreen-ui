/* eslint-disable no-console */
import { exitWithErrorMessage } from '@lg-tools/meta';
import fse from 'fs-extra';
import path from 'path';

import { TestCommandOptions } from '..';

import { getCurrentJestVersion } from './getCurrentJestVersion';
import { getExpectedJestVersion } from './getExpectedJestVersion';

/** Returns the path of the correct Jest binary */
export function getJestBinary(options: TestCommandOptions): string {
  const { verbose, react17 } = options;

  const rootDir = process.cwd();

  const jestBinaryPath = path.resolve(
    rootDir,
    './node_modules/jest/bin/jest.js',
  );

  if (!fse.existsSync(jestBinaryPath)) {
    exitWithErrorMessage(`Could not find jest binary ${jestBinaryPath}`);
  }

  const expectedJestVersion = getExpectedJestVersion(!!react17);
  const currentVersion = getCurrentJestVersion(jestBinaryPath);

  if (expectedJestVersion !== currentVersion) {
    exitWithErrorMessage(
      `Incorrect Jest version installed. Expected ${expectedJestVersion}, using ${currentVersion}`,
    );
  }

  console.log(`Using jest@${currentVersion}`);
  verbose && console.log('Jest binary path:', jestBinaryPath);

  return jestBinaryPath;
}
