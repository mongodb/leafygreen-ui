import type { PackageJson } from '@lg-tools/meta';

import { isLeafyGreenPackage } from './isLeafyGreenPackage';

/**
 * Extracts LeafyGreen dependencies from package.json
 */
export function extractLeafyGreenDeps(packageJson: PackageJson): Array<{
  name: string;
  version: string;
}> {
  const deps: Array<{
    name: string;
    version: string;
  }> = [];

  const depTypes = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ] as const;

  for (const depType of depTypes) {
    const depsObj = packageJson[depType];

    if (depsObj) {
      for (const [name, version] of Object.entries(depsObj)) {
        if (isLeafyGreenPackage(name)) {
          deps.push({ name, version });
        }
      }
    }
  }

  return deps;
}
