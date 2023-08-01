/* eslint-disable no-console */
import { getPackageName } from '@lg-tools/meta';
import depcheck from 'depcheck';

import { ValidateCommandOptions } from '../validate.types';

import { depcheckOptions, DependencyIssues } from './config';
import { fixDependencies } from './fixDependencyIssues';
import { logDependencyIssues } from './logDependencyIssues';
import { fixTSconfig, readPackageJson, sortDependenciesByUsage } from './utils';
import { validateListedDependencies } from './validateListedDependencies';
import { validateListedDevDependencies } from './validateListedDevDependencies';
import { isMissingProviderPeer } from './validatePeerDependencies';

export async function checkPackage(
  pkgPath: string,
  { fix, fixTsconfig, verbose }: Partial<ValidateCommandOptions>,
): Promise<boolean> {
  const check = await depcheck(pkgPath, depcheckOptions);
  const pkgName = getPackageName(pkgPath);

  if (!pkgName) {
    console.error('Could not get package name for ', pkgPath);
    return false;
  }

  /**
   * Packages listed in package.json as a devDependency,
   * but not imported in any file
   */
  const unusedDependencies = check.dependencies;

  /**
   * Packages listed in package.json as a devDependency,
   * but not imported in any file
   */
  const unusedDevDependencies = check.devDependencies;

  /**
   * All packages imported in a file
   */
  const importedPackages = check.using;

  /**
   * Packages that are imported in a file, but not listed in package.json
   */
  const allMissingPackages = check.missing;

  // Sort these based on the file it's used in
  const sortedMissingDeps = sortDependenciesByUsage(
    allMissingPackages,
    pkgName,
  );

  const missingDependencies = Object.values(sortedMissingDeps.dependencies);
  const missingDevDependencies = Object.values(
    sortedMissingDeps.devDependencies,
  );

  const pkgJson = readPackageJson(pkgPath);

  // Every listed devDependency must _only_ be used in test files
  const listedDevButUsedAsDependency = validateListedDevDependencies(
    { pkgName, pkgJson, importedPackages },
    { verbose },
  );

  // Every listed dependency must be used in _at least one_ non-test file
  const listedButOnlyUsedAsDev = validateListedDependencies(
    { pkgName, pkgJson, importedPackages },
    { verbose },
  );

  // Whether the package is missing required peer dependencies
  const isMissingPeers = isMissingProviderPeer({
    pkgName,
    pkgJson,
    importedPackages,
  });

  const allDependencyIssues: DependencyIssues = {
    missingDependencies,
    missingDevDependencies,
    unusedDependencies,
    unusedDevDependencies,
    listedDevButUsedAsDependency,
    listedButOnlyUsedAsDev,
    isMissingPeers,
  };

  logDependencyIssues(pkgName, allDependencyIssues, verbose);

  // Only certain issues are blocking
  const issuesExist = [
    missingDependencies,
    missingDevDependencies,
    listedDevButUsedAsDependency,
  ].some(prob => prob.length > 0);

  if (issuesExist && fix) {
    fixDependencies(pkgName, allDependencyIssues, verbose);
  }

  if (fixTsconfig) {
    fixTSconfig(pkgName);
  }

  issuesExist &&
    verbose &&
    console.log({ pkgName, issuesExist, allDependencyIssues });

  return issuesExist && !fix;
}
