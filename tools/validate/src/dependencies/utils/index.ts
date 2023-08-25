/* eslint-disable no-console */
import chalk from 'chalk';
import depcheck from 'depcheck';
import { readFileSync, writeFileSync } from 'fs-extra';
import { isEqual } from 'lodash';
import path from 'path';

import { ignoreFilePatterns, ignoreMatches } from '../config';

import { getPackageLGDependencies } from './getPackageDependencies';

const rootDir = process.cwd();

/**
 * Reads the tsconfig file and rewrites the references array based on the package.json
 */
export function fixTSconfig(pkg: string) {
  const tsConfigFileName = `packages/${pkg}/tsconfig.json`;
  // Including devDependencies in tsconfig can introduce circular dependencies
  const dependencies = getPackageLGDependencies(pkg, { dev: false });

  try {
    const tsconfig = JSON.parse(readFileSync(tsConfigFileName, 'utf-8'));
    const refs = dependencies
      .filter(dep => dep !== 'mongo-nav')
      .map(dep => ({
        path: `../${dep}`,
      }));

    if (!isEqual(tsconfig.references, refs)) {
      tsconfig.references = refs;
      console.log(chalk.gray(`Fixing ${pkg}/tsconfig.json`));
      writeFileSync(tsConfigFileName, JSON.stringify(tsconfig, null, 2) + '\n');
    }
  } catch (error) {
    throw new Error(`Error in ${pkg}/tsconfig.json: ${error}`);
  }
}

/**
 * Sorts DepsRecord into dependencies & devDependencies based on what files it's used in
 */
export function sortDependenciesByUsage(
  depsRecord: { [dependencyName: string]: Array<string> },
  pkgName: string,
): {
  dependencies: Array<string>;
  devDependencies: Array<string>;
} {
  const globalPackageJson = JSON.parse(
    readFileSync(path.join(rootDir, 'package.json'), 'utf-8'),
  );
  const globalDevDependencies = Object.keys(globalPackageJson.devDependencies);
  return (
    Object.entries(depsRecord)
      // If the package in provided globally, ignore it
      .filter(([dep]) => !globalDevDependencies.includes(dep))
      // If a dependency is only used in tests or storybook,
      // then we add it as a dev dependency
      .reduce(
        (_missing, [name, fileUsedIn]) => {
          if (
            // If every file used in is a test file...
            fileUsedIn.every(file =>
              ignoreFilePatterns.some(pattern => pattern.test(file)),
            )
          ) {
            // Ignore when we import the package itself in a test file
            if (!name.includes(pkgName)) {
              _missing.devDependencies.push(name);
            }
          } else {
            _missing.dependencies.push(name);
          }

          return _missing;
        },
        {
          dependencies: [] as Array<string>,
          devDependencies: [] as Array<string>,
        },
      )
  );
}

/**
 * @returns a parsed package.json
 */
export function readPackageJson(pkgPath: string): { [key: string]: any } {
  const pkgJsonPath = path.resolve(pkgPath, `package.json`);
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
  return pkgJson;
}

/** Returns whether the given dependency is used in a source package file */
export const isDependencyUsedInSourceFile = (
  depName: string,
  importedPackages: depcheck.Results['using'],
): boolean => {
  // consider a dependency used in a package file if its in `ignoreMatches`
  const isIgnored = ignoreMatches.includes(depName);
  const usedInPackageFile = importedPackages?.[depName]?.some(
    // is used in at least one...
    // file that is not ignored
    (file: string) => !ignoreFilePatterns.some(pattern => pattern.test(file)),
  );

  return isIgnored || usedInPackageFile;
};

/** Returns whether the given dependency is only used in test files */
export const isDependencyOnlyUsedInTestFile = (
  depName: string,
  importedPackages: depcheck.Results['using'],
): boolean => {
  return importedPackages?.[depName]?.every(
    // Every file is a test file
    (file: string) => ignoreFilePatterns.some(pattern => pattern.test(file)),
  );
};
