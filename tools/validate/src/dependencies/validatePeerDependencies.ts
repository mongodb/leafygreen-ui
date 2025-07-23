import { DepCheckFunctionProps } from './config';

export const lgProvider = '@leafygreen-ui/leafygreen-provider';

export function isMissingProviderPeer({
  pkgJson,
  importedPackages,
}: DepCheckFunctionProps) {
  // Whether lgProvider is imported in any package files
  const usesProvider = Boolean(importedPackages[lgProvider]);
  const isMissingProviderPeer =
    usesProvider && !pkgJson?.peerDependencies?.[lgProvider];
  return isMissingProviderPeer;
}
