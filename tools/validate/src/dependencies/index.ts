/* eslint-disable no-console */

import { getAllPackageNames } from '../utils/getAllPackageNames';
import { ValidateCommandOptions } from '../validate.types';

import { checkPackage } from './checkPackage';

export function validateDependencies(
  options: Partial<ValidateCommandOptions>,
): Promise<void> {
  const lgPackages = getAllPackageNames();

  console.log('Validating dependencies...');

  const packages = lgPackages;

  const checks = packages.map(pkg => checkPackage(pkg, options));

  return new Promise<void>((resolve, reject) => {
    Promise.all(checks).then(results => {
      if (results.every(r => !r)) {
        console.log('Dependencies OK ✅');
        resolve();
      } else {
        console.log(
          "Issues found in package dependencies. Run with `--verbose` flag for more details.',",
        );
        reject();
      }
    });
  });
}
