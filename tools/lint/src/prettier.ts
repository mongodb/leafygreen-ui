/* eslint-disable no-console */
import chalk from 'chalk';
import Progress from 'cli-progress';
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
const prettierIgnorePath = path.resolve(process.cwd(), '.prettierignore');

/** prettify all eslint extensions, plus some others */
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

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
    const files = glob.sync(pattern, {
      ignore: ignorePattern,
    });

    let success = true;
    const progressBar = new Progress.SingleBar(
      {
        format: `${chalk.magenta.bold(
          'Prettier {bar}',
        )} | {percentage}% | {value}/{total} | {filename}`,
      },
      Progress.Presets.shades_classic,
    );

    progressBar?.start(files.length, 0, {
      filename: '',
    });

    // Process all files
    for (const filePath of files) {
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const fileInfo = await prettierAPI.getFileInfo(filePath);

        // Skip files that shouldn't be formatted
        if (fileInfo.ignored || !fileInfo.inferredParser) continue;

        if (fix) {
          // Format and write the file
          const formatted = await LGFormat(fileContent, filePath);

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

        progressBar?.increment({
          filename: path.relative(rootDir, filePath),
        });
      } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
        success = false;
      }
    }

    progressBar?.stop();

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
