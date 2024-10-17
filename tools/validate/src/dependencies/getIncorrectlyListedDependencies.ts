/* eslint-disable no-console */
import pick from 'lodash/pick';

import { externalDependencies } from '../config';
import { DepCheckFunctionProps } from '../validate.types';

import { globToRegex } from './utils/globToRegex';
import {
  groupMissingDependenciesByUsage,
  isDependencyOnlyUsedInTestFile,
} from './utils';

/**
 * Ensure every dependency listed as `dependencies`
 * are used in _at least one_ non-test file
 *
 * @returns An array of packages that are listed as `dependencies`,
 * but are only used in test files
 */
export function getIncorrectlyListedDependencies({
  pkgName,
  pkgJson,
  importedPackages,
}: DepCheckFunctionProps): Array<string> {
  const { missingDependencies } = groupMissingDependenciesByUsage(
    importedPackages,
    pkgName,
  );

  const importedPackagesInSourceFile = Object.keys(missingDependencies);

  const { dependencies: _listedDepObj } = pick(pkgJson, ['dependencies']);
  const listedDependencies = _listedDepObj ? Object.keys(_listedDepObj) : [];

  const anyListedDependencyUsedInTestFile = listedDependencies.some(listedDep =>
    isDependencyOnlyUsedInTestFile(listedDep, importedPackages),
  );

  if (listedDependencies.length && anyListedDependencyUsedInTestFile) {
    const listedButOnlyUsedAsDev = listedDependencies.filter(
      listedDepName =>
        !importedPackagesInSourceFile.includes(listedDepName) &&
        !externalDependencies.some(glob => {
          const regEx = globToRegex(glob);
          return regEx.test(listedDepName);
        }),
    );

    return listedButOnlyUsedAsDev;
  }

  return [];
}
