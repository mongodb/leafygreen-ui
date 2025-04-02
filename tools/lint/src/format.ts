import prettierAPI from 'prettier';

import { createESLintInstance, prettierConfigPath } from './config';

/**
 * Formats a block of code using Prettier & ESLint
 */
export async function formatLG(
  fileContent: string,
  filepath: string,
): Promise<string> {
  const linted = await formatESLint(fileContent, filepath);
  const prettified = await formatPrettier(linted, filepath);
  return prettified;
}

/**
 * Formats a block of code using Prettier
 */
export async function formatPrettier(
  fileContent: string,
  filepath: string,
): Promise<string> {
  const prettierConfig = await prettierAPI.resolveConfig(prettierConfigPath);
  const prettified = prettierAPI.format(fileContent, {
    ...prettierConfig,
    filepath,
  });

  return prettified;
}

/**
 * Formats a block of code using ESLint
 */
export async function formatESLint(
  fileContent: string,
  filePath: string,
): Promise<string> {
  const eslint = createESLintInstance(true);
  const [result] = await eslint.lintText(fileContent, { filePath });
  const output = result.output;

  if (!output) {
    throw new Error('No output from ESLint');
  }

  return output ?? '';
}
