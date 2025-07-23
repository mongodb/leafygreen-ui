/* eslint-disable no-console */
import { getAllPackages } from '@lg-tools/meta';

import { ValidateCommandOptions } from '../validate.types';

import { checkPackage } from './checkPackage';

export function validateDependencies(
  options: Partial<ValidateCommandOptions>,
): Promise<void> {
  console.log('Validating dependencies...');

  const allPackages = getAllPackages();

  const checkPromises = allPackages.map(pkgPath =>
    checkPackage(pkgPath, options),
  );

  return new Promise<void>((resolve, reject) => {
    Promise.all(checkPromises).then(results => {
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
