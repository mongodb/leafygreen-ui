/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs/promises';
import glob from 'glob';
import path from 'path';
import prettierAPI from 'prettier';

import { esLintExtensions } from './eslint';
import { LGFormat } from './format';
import { LintFn } from './lint.types';

const rootDir = process.cwd();
const prettierConfigPath = path.resolve(
  __dirname,
  '../config/prettier.config.js',
);

/** prettify all eslint extensions, plus some others */
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

/** Use Prettier Node API */
export const runPrettier: LintFn = async ({ fix, verbose }) => {
  try {
    console.log(chalk.magenta('Running Prettier...'));

    // Get all files matching the patterns
    const pattern = `${rootDir}/**/*.{${prettierExtensions.join(',')}}`;
    const files = glob.sync(pattern, {
      ignore: ['**/node_modules/**', '**/dist/**'],
    });

    // Load prettier config
    const prettierConfig = await prettierAPI.resolveConfig(prettierConfigPath);

    let success = true;

    // Process all files
    for (const file of files) {
      try {
        const fileContent = await fs.readFile(file, 'utf8');
        const fileInfo = await prettierAPI.getFileInfo(file);

        // Skip files that shouldn't be formatted
        if (fileInfo.ignored || !fileInfo.inferredParser) continue;

        if (fix) {
          // Format and write the file
          const formatted = await LGFormat(fileContent);

          if (formatted !== fileContent) {
            await fs.writeFile(file, formatted, 'utf8');
            if (verbose) console.log(`Fixed: ${file}`);
          }
        } else {
          // Just check if the file is formatted
          const isFormatted = await prettierAPI.check(fileContent, {
            ...prettierConfig,
            filepath: file,
          });

          if (!isFormatted) {
            console.log(`${chalk.red('Not formatted')}: ${file}`);
            success = false;
          }
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
        success = false;
      }
    }

    return success;
  } catch (err) {
    console.error('Prettier error:', err);
    return false;
  }
};
