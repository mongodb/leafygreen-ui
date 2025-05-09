/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs/promises';
import { sync as globSync } from 'glob';
import prettierAPI from 'prettier';

import {
  prettierConfigPath,
  prettierExtensions,
  prettierIgnorePath,
} from './config';
import { formatPrettier } from './format';
import { LintFn } from './lint.types';

const rootDir = process.cwd();

/** Use Prettier Node API */
export const runPrettier: LintFn = async ({ fix, verbose }) => {
  try {
    console.log(chalk.magenta('Running Prettier...'));

    // Load prettier config
    const prettierConfig = await prettierAPI.resolveConfig(prettierConfigPath);

    // Get all files matching the patterns
    const pattern = `${rootDir}/**/*.{${prettierExtensions.join(',')}}`;
    verbose && console.log(fix ? 'Fixing' : 'Checking', pattern);

    const prettierIgnore = await fs.readFile(prettierIgnorePath, 'utf8');
    const ignorePattern = [
      '**/node_modules/**',
      '**/dist/**',
      ...prettierIgnore.split('\n'),
    ];

    verbose &&
      console.log(chalk.gray(`Ignoring patterns: ${ignorePattern.join(', ')}`));
    const files = globSync(pattern, {
      ignore: ignorePattern,
    });

    let success = true;

    // Process all files
    for (const filePath of files) {
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const fileInfo = await prettierAPI.getFileInfo(filePath);

        // Skip files that shouldn't be formatted
        if (fileInfo.ignored || !fileInfo.inferredParser) continue;

        if (fix) {
          // Format and write the file
          const formatted = await formatPrettier(fileContent, filePath);

          if (formatted !== fileContent) {
            await fs.writeFile(filePath, formatted, 'utf8');
            if (verbose) console.log(`Fixed: ${filePath}`);
          }
        } else {
          // Just check if the file is formatted
          const isFormatted = await prettierAPI.check(fileContent, {
            ...prettierConfig,
            filepath: filePath,
          });

          if (!isFormatted) {
            console.log(`${chalk.red('Not formatted')}: ${filePath}`);
            success = false;
          }
        }
      } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
        success = false;
      }
    }

    verbose &&
      success &&
      console.log(chalk.green('All files are formatted ✅'));
    !success &&
      console.log(
        chalk.magenta(
          'Some files are not correctly formatted',
          'Run prettier again with `--fix` to fix them',
        ),
      );

    return success;
  } catch (err) {
    console.error('Prettier error:', err);
    return false;
  }
};
