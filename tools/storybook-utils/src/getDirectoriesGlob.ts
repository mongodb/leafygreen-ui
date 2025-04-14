import { getLGConfig } from '@lg-tools/meta';

/**
 * Returns a `glob` pattern to match all directories
 * in the package.json "lg" config
 *
 * e.g.
 * ```js
 *   `{packages,tools}`
 *    // or, simply
 *   `packages`
 * ```
 */
export const getDirectoriesGlob = (): string => {
  // TODO: We may want to use pnpm-workspace config here,
  // since we could have story files in other non-package directories
  const { scopes } = getLGConfig();
  const directories = Object.values(scopes);

  if (directories.length <= 0) {
    throw new Error(`Could not find directories for scopes: ${scopes}`);
  }

  // If there are multiple directories, we need to wrap the list in curly bois {}
  const directoriesGlob =
    directories.length === 1 ? directories[0] : `{${directories.join(',')}}`;

  return directoriesGlob;
};
