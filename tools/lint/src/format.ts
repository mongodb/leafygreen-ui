import path from 'path';
import prettierAPI, { BuiltInParserName } from 'prettier';

const prettierConfigPath = path.resolve(
  __dirname,
  '../config/prettier.config.js',
);
// const defaultParser: BuiltInParserName = 'typescript'; // Default parser

/**
 * Format a file using the LeafyGreen Prettier config
 */
export async function LGFormat(
  fileContent: string,
  _parser?: BuiltInParserName,
) {
  const prettierConfig = await prettierAPI.resolveConfig(prettierConfigPath);

  const formatted = await prettierAPI.format(fileContent, {
    ...prettierConfig,
    // parser: parser || defaultParser,
  });

  return formatted;
}
