/* eslint-disable no-console */
import chalk from 'chalk';
import { ESLint } from 'eslint';

import { createESLintInstance, esLintExtensions } from './config';
import { BaseLintRunnerOptions } from './lint.types';

export const rootDir = process.cwd();

export const allFilePaths = `${rootDir}/**/*.{${esLintExtensions.join(',')}}`;

interface ESLintRunnerOptions extends BaseLintRunnerOptions {
  /** Optional glob string identifying the files to lint  */
  filePaths?: string;
}

/**
 * Creates and runs an ESLint instance
 */
export async function runESLint(
  options?: ESLintRunnerOptions,
): Promise<boolean> {
  console.log(chalk.blue('Running ESLint...'));

  const filePaths = options?.filePaths || allFilePaths;
  const fix = options?.fix || false;

  const eslint = createESLintInstance({ fix });
  const results = await eslint.lintFiles(filePaths);

  if (fix) {
    await ESLint.outputFixes(results);
  }

  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);
  console.log(resultText);

  const totalErrors = results.reduce(
    (acc, result) => acc + result.errorCount,
    0,
  );
  const hasErrors = totalErrors > 0;

  return !hasErrors;
}
