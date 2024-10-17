/* eslint-disable no-console */
import pick from 'lodash/pick';

import { DepCheckFunctionProps, DependencyIssues } from '../validate.types';

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
}: DepCheckFunctionProps): DependencyIssues['listedDevButUsedAsDependency'] {
  const { missingDependencies } = groupMissingDependenciesByUsage(
    importedPackages,
    pkgName,
  );
  const missingDependencyNames = Object.keys(missingDependencies);

  const { devDependencies: _listedDevObj } = pick(pkgJson, ['devDependencies']);
  const listedDevDependencies = _listedDevObj ? Object.keys(_listedDevObj) : [];

  // Check if any devDependency is imported from a source file
  const listedDevButUsedAsDependency = listedDevDependencies
    .filter(depName => missingDependencyNames.includes(depName))
    .reduce((listedDev, depName) => {
      listedDev[depName] = missingDependencies[depName];
      return listedDev;
    }, {} as Record<string, Array<string>>);

  return listedDevButUsedAsDependency;
}
