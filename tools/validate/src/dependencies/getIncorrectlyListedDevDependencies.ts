/* eslint-disable no-console */
import pick from 'lodash/pick';

import { DepCheckFunctionProps } from '../validate.types';

import { groupMissingDependenciesByUsage } from './utils';

/**
 * Ensure every package listed as a `devDependency` is _only_ be used in test files
 *
 * If it's used in other files, we should remove it and re-install it as a regular dependency
 *
 * @returns An array of packages that are listed as `devDependencies`, but are used in non-test files
 */
export function getIncorrectlyListedDevDependencies({
  pkgName,
  pkgJson,
  importedPackages,
}: DepCheckFunctionProps): Array<string> {
  const { missingDependencies } = groupMissingDependenciesByUsage(
    importedPackages,
    pkgName,
  );
  const importedPackagesInSourceFile = Object.keys(missingDependencies);

  const { devDependencies: _listedDevObj } = pick(pkgJson, ['devDependencies']);
  const listedDevDependencies = _listedDevObj ? Object.keys(_listedDevObj) : [];

  // Check if any devDependency is imported from a source file

  const listedDevButUsedAsDependency = listedDevDependencies.filter(dep =>
    importedPackagesInSourceFile.includes(dep),
  );

  return listedDevButUsedAsDependency;
}
