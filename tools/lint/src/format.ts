import path from 'path';
import prettierAPI from 'prettier';

const prettierConfigPath = path.resolve(
  __dirname,
  '../config/prettier.config.js',
);
// const defaultParser: BuiltInParserName = 'typescript'; // Default parser

/**
 * Format a file using the LeafyGreen Prettier config
 */
export async function formatLG(fileContent: string, filepath: string) {
  const prettierConfig = await prettierAPI.resolveConfig(prettierConfigPath);

  const formatted = prettierAPI.format(fileContent, {
    ...prettierConfig,
    filepath,
  });

  return formatted;
}
