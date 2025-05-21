import { existsSync, lstatSync, readdirSync } from 'fs-extra';
import path from 'path';

import { getLGConfig } from '../getLGConfig';
import { getPackageName } from '../getPackageName';
import { getRepositoryRoot } from '../getRepositoryRoot';

/** @returns the absolute paths of all packages in the current repository */
export const getAllPackages = () => {
  const rootDir = getRepositoryRoot();
  const { scopes } = getLGConfig();

  const paths: Array<string> = [];

  for (const scopePath of Object.values(scopes)) {
    const scopeDir = path.resolve(rootDir, scopePath);

    if (existsSync(scopeDir)) {
      const pkgNames = readdirSync(scopeDir);
      const pkgPaths = pkgNames
        .map(name => path.resolve(scopeDir, name))
        .filter(pkgPath => lstatSync(pkgPath).isDirectory());
      paths.push(...pkgPaths);
    }
  }

  return paths;
};

/**
 * @returns the full names of all packages in the current repository
 */
export const getAllPackageNames = (): Array<string> => {
  const allPackages = getAllPackages();
  return allPackages
    .map(getPackageName)
    .filter(pkg => typeof pkg === 'string') as Array<string>;
};
