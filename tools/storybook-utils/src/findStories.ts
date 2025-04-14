import { globSync } from 'glob';
import path from 'path';

import { getDirectoriesGlob } from './getDirectoriesGlob';

interface FindStoriesOptions {
  /**
   * Array of glob patterns to include story files
   * By default includes all `*.stories.tsx` files in the src directory
   *
   * @default
   * ```js
   * [`../${getDirectoriesGlob()}/**\/*.stor@(y|ies).@(js|ts)?(x)`]
   * ```
   */
  includePattern?: Array<string>;

  /**
   * Array of glob patterns to exclude story files
   * By default excludes all `node_modules` directories
   *
   * @default
   * ```js
   * [`../${getDirectoriesGlob()}/**\/node_modules`]`
   * ```
   */
  excludePattern?: Array<string>;
}

/**
 * Finds story files to include based on the provided include/exclude glob patterns
 * By default, includes all `*.stories.tsx` files in the src directory of each package
 * and excludes all `node_modules` directories
 *
 * @returns Array of all included story files,
 */
export function findStories(
  options: FindStoriesOptions = {},
): () => Promise<Array<string>> {
  const directoriesGlob = getDirectoriesGlob();

  const {
    includePattern = [`../${directoriesGlob}/**/*.stor@(y|ies).@(js|ts)?(x)`],
    excludePattern = [`../${directoriesGlob}/**/node_modules`],
  } = options;

  return async () => {
    const storybookFolderRelativePaths = globSync(
      [...includePattern, ...excludePattern.map(_glob => `!${_glob}`)],
      {
        cwd: path.join(process.cwd(), '.storybook'),
      },
    ).filter(path => !/node_modules/.test(path));

    return storybookFolderRelativePaths;
  };
}
