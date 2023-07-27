import { getAllPackageNames } from '@lg-tools/meta';
import { readFileSync } from 'fs-extra';
import { defaults } from 'lodash';

interface DependenciesOptions {
  dev?: boolean;
  peer?: boolean;
}

export function getPackageLGDependencies(
  pkg: string,
  opts?: DependenciesOptions,
) {
  opts = defaults(opts, { dev: true, peer: true });

  const pkgJson = JSON.parse(
    readFileSync(`packages/${pkg}/package.json`, 'utf-8'),
  );
  const dependencies = Object.keys({
    ...pkgJson.dependencies,
    ...(opts.dev ? pkgJson.devDependencies : {}),
    ...(opts.peer ? pkgJson.peerDependencies : {}),
  })
    .filter(pkg => pkg.includes('@leafygreen-ui'))
    .map(pkg => pkg.replace(`@leafygreen-ui/`, ''));
  return dependencies;
}

export function getPackageDependents(pkg: string) {
  const allPackages = getAllPackageNames();

  return allPackages
    .filter(otherPkg => {
      const otherPkgDeps = getPackageLGDependencies(otherPkg);
      return otherPkgDeps.includes(pkg);
    })
    .map(pkg => pkg.replace(`@leafygreen-ui/`, ''));
}
