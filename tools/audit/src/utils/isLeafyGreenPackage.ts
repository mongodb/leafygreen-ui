import { LG_SCOPES } from './constants';

/**
 * Checks if a package name is a LeafyGreen package
 */
export function isLeafyGreenPackage(packageName: string): boolean {
  return LG_SCOPES.some(scope => packageName.startsWith(scope));
}

