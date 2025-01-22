/* eslint-disable no-console */
import chalk from 'chalk';
import { ESLint } from 'eslint';
import path from 'path';

import { BaseLintRunnerOptions } from './lint.types';

export const eslintConfigPath = path.resolve(
  __dirname,
  '../config/eslint.config.mjs',
);
export const rootDir = process.cwd();
export const esLintExtensions = ['ts', 'tsx'];
export const allFilePaths = `${rootDir}/**/*.{${esLintExtensions.join(',')}}`;

// Create an instance of ESLint with the configuration passed to the function
function createESLintInstance(fix: boolean): ESLint {
  return new ESLint({
    overrideConfigFile: eslintConfigPath,
    fix,
  });
}
interface ESLintRunnerOptions extends BaseLintRunnerOptions {
  /** Optional glob string identifying the files to lint  */
  filePaths?: string;
}

/**
 * Creates and runs an ESLint instance
 */
export async function eslint(options?: ESLintRunnerOptions): Promise<boolean> {
  console.log(chalk.blue('Running ESLint...'));

  const filePaths = options?.filePaths || allFilePaths;
  const fix = options?.fix || false;

  const eslint = createESLintInstance(fix);
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
