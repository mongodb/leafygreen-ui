import fs from 'fs';
import path from 'path';
import { getLGConfig } from './getLGConfig';
import { getPackageName } from './getPackageName';

/** @returns the absolute paths of all packages in the current repository */
export const getAllPackages = () => {
  const rootDir = process.cwd();
  const { scopes } = getLGConfig();

  const paths: Array<string> = [];

  for (let scopePath of Object.values(scopes)) {
    const scopeDir = path.resolve(rootDir, scopePath);
    if (fs.existsSync(scopeDir)) {
      const pkgNames = fs.readdirSync(scopeDir);
      const pkgPaths = pkgNames.map(name => path.resolve(scopeDir, name));
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
