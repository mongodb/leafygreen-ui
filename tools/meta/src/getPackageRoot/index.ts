import fse from 'fs-extra';
import path from 'path';

/**
 *
 * Get the root directory of the package by searching for package.json
 * in the current directory and its parent directories.
 *
 * e.g.
 * calling `getPackageRoot(__dirname)` from any package file will return that package's root directory
 *
 * @param startDir
 * @returns
 */
export function getPackageRoot(startDir: string): string {
  let currentDir = startDir;

  while (currentDir !== '/') {
    const packageJsonPath = path.join(currentDir, 'package.json');

    if (fse.existsSync(packageJsonPath)) {
      return currentDir;
    }

    // Move up one directory
    currentDir = path.dirname(currentDir);
  }

  return '/';
}
