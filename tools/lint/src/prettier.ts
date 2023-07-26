/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import path from 'path';

import { esLintExtensions } from './eslint';
import { LintFn } from './lint.types';

const rootDir = process.cwd();
const prettierConfigPath = path.resolve(
  __dirname,
  '../config/prettier.config.js',
);
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

/** Spawns a prettier job */
export const prettier: LintFn = ({ fix, verbose }) => {
  return new Promise<boolean>((resolve, reject) => {
    console.log(chalk.magenta('Running Prettier...'));
    spawn(
      'prettier',
      [
        fix ? '--write' : '--check',
        '--config',
        prettierConfigPath,
        `${rootDir}/**/*.{${prettierExtensions.join(',')}}`,
      ],
      {
        stdio: 'inherit',
      },
    )
      .on('exit', code => {
        if (code === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on('error', reject);
  });
};
