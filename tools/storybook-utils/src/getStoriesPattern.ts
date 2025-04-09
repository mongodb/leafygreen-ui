import { getLGConfig } from '@lg-tools/meta';

/**
 * Returns a glob to match all story files,
 * based on the scopes and directories defined in
 * the package.json "lg" config
 */
export const getStoriesPattern = (): string => {
  // TODO: We may want to use pnpm-workspace config here,
  // since we could have story files in other non-package directories
  const { scopes } = getLGConfig();
  const directories = Object.values(scopes);

  if (directories.length <= 0) {
    throw new Error(`Could not find directories for scopes: ${scopes}`);
  }

  const baseStoriesGlob = `**/*.stor@(y|ies).@(js|ts)?(x)`;

  // If there are multiple directories, we need to wrap the list in curly bois {}
  const directoriesGlob =
    directories.length === 1 ? directories[0] : `{${directories.join(',')}}`;

  return `../${directoriesGlob}/${baseStoriesGlob}`;
};
