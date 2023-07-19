/* eslint-disable no-console */
import chalk from 'chalk';
import { pick } from 'lodash';
import path from 'path';

import { ValidateCommandOptions } from '../validate.types';

import { DepCheckFunctionProps } from './config';
import { isDependencyUsedInSourceFile, sortDependenciesByUsage } from './utils';

/**
 * Ensure every package listed as a `devDependency`
 * is _only_ be used in test files
 *
 * If it's used in other files, we should remove it and re-install it as a regular dependency
 *
 * @returns An array of packages that are listed as `devDependencies`, but are used in non-test files
 */
export function validateListedDevDependencies(
  { pkgName, pkgJson, importedPackages }: DepCheckFunctionProps,
  options?: Partial<ValidateCommandOptions>,
): Array<string> {
  const { verbose } = options ?? { verbose: false };
  const { devDependencies: importedPackagesInTestFile } =
    sortDependenciesByUsage(importedPackages, pkgName);

  const { devDependencies: _listedDevObj } = pick(pkgJson, ['devDependencies']);
  const listedDevDependencies = _listedDevObj ? Object.keys(_listedDevObj) : [];

  // Check if any devDependency is imported from a source file
  const isAnyListedDevDepUsedInSourceFile = listedDevDependencies.some(
    listedDev => isDependencyUsedInSourceFile(listedDev, importedPackages),
  );

  if (listedDevDependencies.length && isAnyListedDevDepUsedInSourceFile) {
    // add the dependencies that are listed as dev but not used as dev to the unused array to uninstall them
    const listedDevButUsedAsDependency = listedDevDependencies.filter(
      dep => !importedPackagesInTestFile.includes(dep),
    );

    verbose &&
      console.log(
        `${chalk.blue(
          pkgName,
        )}: lists packages as devDependencies, but uses them in source files`,
      );
    verbose &&
      console.log(
        listedDevButUsedAsDependency
          .map(
            devDepName =>
              `\t${chalk.bold(devDepName)} used in: \n\t\t${importedPackages?.[
                devDepName
              ]
                ?.map((file: string) =>
                  file.replace(path.join(__dirname, '..'), ''),
                )
                .join('\n\t\t')}`,
          )
          .join('\n'),
      );

    return listedDevButUsedAsDependency;
  }

  return [];
}
