import { DepCheckFunctionProps } from './config';
import { readPackageJson } from './utils';

export const lgProvider = '@leafygreen-ui/leafygreen-provider';

export function isMissingProviderPeer({
  pkg,
  importedPackages,
}: DepCheckFunctionProps) {
  const pkgJson = readPackageJson(pkg);
  // Whether lgProvider is imported in any package files
  const usesProvider = Boolean(importedPackages[lgProvider]);
  const isMissingProviderPeer =
    usesProvider && !pkgJson?.peerDependencies?.[lgProvider];
  return isMissingProviderPeer;
}
