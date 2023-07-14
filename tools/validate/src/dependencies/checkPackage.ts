/* eslint-disable no-console */
import depcheck from 'depcheck';
import path from 'path';
import { ValidateCommandOptions } from 'src/validate.types';

import { depcheckOptions, DependencyIssues } from './config';
import { fixDependencies } from './fixDependencyIssues';
import { logDependencyIssues } from './logDependencyIssues';
import { fixTSconfig, sortDependenciesByUsage } from './utils';
import { validateListedDependencies } from './validateListedDependencies';
import { validateListedDevDependencies } from './validateListedDevDependencies';
import { isMissingProviderPeer } from './validatePeerDependencies';

const rootDir = process.cwd();

export async function checkPackage(
  pkg: string,
  { fix, fixTsconfig, verbose }: Partial<ValidateCommandOptions>,
): Promise<boolean> {
  return new Promise(async resolve => {
    const check = await depcheck(
      path.resolve(rootDir, 'packages', pkg),
      depcheckOptions,
    );

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
    const sortedMissingDeps = sortDependenciesByUsage(allMissingPackages, pkg);
    const missingDependencies = Object.keys(sortedMissingDeps.dependencies);
    const missingDevDependencies = Object.keys(
      sortedMissingDeps.devDependencies,
    );

    // Every listed devDependency must _only_ be used in test files
    const listedDevButUsedAsDependency = validateListedDevDependencies(
      { pkg, importedPackages },
      { verbose },
    );

    // Every listed dependency must be used in _at least one_ non-test file
    const listedButOnlyUsedAsDev = validateListedDependencies(
      { pkg, importedPackages },
      { verbose },
    );

    // Whether the package is missing required peer dependencies
    const isMissingPeers = isMissingProviderPeer({ pkg, importedPackages });

    const allDependencyIssues: DependencyIssues = {
      missingDependencies,
      missingDevDependencies,
      unusedDependencies,
      unusedDevDependencies,
      listedDevButUsedAsDependency,
      listedButOnlyUsedAsDev,
      isMissingPeers,
    };

    logDependencyIssues(pkg, allDependencyIssues);

    if (fix) {
      fixDependencies(pkg, allDependencyIssues);
    }

    if (fixTsconfig) {
      fixTSconfig(pkg);
    }

    const issuesExist = Object.values(allDependencyIssues).every(
      prob => prob.length > 0,
    );

    issuesExist && console.log({ pkg, issuesExist, allDependencyIssues });

    resolve(issuesExist && !fix);
  });
}
