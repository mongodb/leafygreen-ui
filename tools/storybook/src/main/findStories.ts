import { globSync } from 'glob';
import path from 'path';

export function findStories(
  includePattern: string,
  excludePattern: string,
): () => Promise<Array<string>> {
  return async () => {
    const storybookFolderRelativePaths = globSync(
      [includePattern, `!${excludePattern}`],
      {
        cwd: path.join(process.cwd(), '.storybook'),
      },
    ).filter(path => !/node_modules/.test(path));

    return storybookFolderRelativePaths;
  };
}
