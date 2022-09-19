import { readFileSync } from 'fs';

export function getPackageLGDependencies(pkg: string) {
  const pkgJson = JSON.parse(
    readFileSync(`packages/${pkg}/package.json`, 'utf-8'),
  );
  const dependencies = Object.keys({
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
    ...pkgJson.peerDependencies
  })
    .filter(pkg => pkg.includes('@leafygreen-ui'))
    .map(pkg => pkg.replace(`@leafygreen-ui/`, ''));
  return dependencies;
}
