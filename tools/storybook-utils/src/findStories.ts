interface FindStoriesArgs {
  includePattern: Array<string>;
  excludePattern: Array<string>;
}
/**
 * Finds story files to include based on the provided include/exclude glob patterns
 * @param includePattern
 * @param excludePattern
 * @returns Array of all included files
 */
export function findStories({
  includePattern,
  excludePattern,
}: FindStoriesArgs): () => Promise<Array<string>> {
  return async () => {
    const { globSync } = await import('glob');

    const storybookFolderRelativePaths = globSync(
      [...includePattern, ...excludePattern.map(x => `!${x}`)],
      {
        cwd: `${process.cwd()}/.storybook`,
      },
    ).filter(pathItem => !/node_modules/.test(pathItem));

    return storybookFolderRelativePaths;
  };
}
