import { readFileSync } from 'fs';
import { getAllPackageNames } from './getAllPackageNames';

export function getPackageLGDependencies(pkg: string) {
  const pkgJson = JSON.parse(
    readFileSync(`packages/${pkg}/package.json`, 'utf-8'),
  );
  const dependencies = Object.keys({
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
  })
    .filter(pkg => pkg.includes('@leafygreen-ui'))
    .map(pkg => pkg.replace(`@leafygreen-ui/`, ''));
  return dependencies;
}

export function getPackageDependants(pkg: string) {
  const allPackages = getAllPackageNames();

  return allPackages
    .filter(otherPkg => {
      const otherPkgDeps = getPackageLGDependencies(otherPkg);
      return otherPkgDeps.includes(pkg);
    })
    .map(pkg => pkg.replace(`@leafygreen-ui/`, ''));
}
