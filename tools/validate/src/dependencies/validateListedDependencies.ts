import chalk from 'chalk';
import { pick } from 'lodash';
import path from 'path';
import { ValidateCommandOptions } from '../validate.types';

import { DepCheckFunctionProps, ignoreMatches } from './config';
import {
  isDependencyOnlyUsedInTestFile,
  readPackageJson,
  sortDependenciesByUsage,
} from './utils';

/**
 * Ensure every dependency listed as `dependencies`
 * are used in _at least one_ non-test file
 *
 * @returns An array of packages that are listed as `dependencies`,
 * but are only used in test files
 */
export function validateListedDependencies(
  { pkg, importedPackages }: DepCheckFunctionProps,
  { verbose }: Partial<ValidateCommandOptions>,
): string[] {
  const pkgJson = readPackageJson(pkg);

  const { dependencies: importedPackagesInSourceFile } =
    sortDependenciesByUsage(importedPackages, pkg);

  const { dependencies: _listedDepObj } = pick(pkgJson, ['dependencies']);
  const listedDependencies = _listedDepObj ? Object.keys(_listedDepObj) : [];

  const anyListedDependencyUsedInTestFile = listedDependencies.some(listedDep =>
    isDependencyOnlyUsedInTestFile(listedDep, importedPackages),
  );

  if (
    importedPackagesInSourceFile.length &&
    listedDependencies.length &&
    anyListedDependencyUsedInTestFile
  ) {
    const listedButOnlyUsedAsDev = listedDependencies.filter(
      listedDepName =>
        !importedPackagesInSourceFile.includes(listedDepName) &&
        !ignoreMatches.includes(listedDepName),
    );

    verbose &&
      console.log(
        `${chalk.blue(
          pkg,
        )}: lists packages as dependency, but only uses them in test files`,
      );
    verbose &&
      console.log(
        listedButOnlyUsedAsDev
          .map(
            depName =>
              `\t${depName}: \n\t\t${importedPackages?.[depName]
                ?.map((file: string) =>
                  file.replace(path.join(__dirname, '..'), ''),
                )
                .join('\n\t\t')}`,
          )
          .join('\n'),
      );

    return listedButOnlyUsedAsDev;
  }

  return [];
}
