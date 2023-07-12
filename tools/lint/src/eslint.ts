import { spawn } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import { LintCommandOptions } from './lint.types';

const rootDir = process.cwd();
const eslintConfigPath = path.resolve(__dirname, '../config/eslint.config.js');
export const esLintExtensions = ['js', 'ts', 'tsx'];

/** Spawns an eslint job */
export function eslint({
  fix,
  verbose,
}: Pick<LintCommandOptions, 'fix' | 'verbose'>) {
  return new Promise<void>(resolve => {
    console.log(chalk.blue('Running ESLint...'));
    spawn(
      'eslint',
      [
        '--config',
        eslintConfigPath,
        `${rootDir}/**/*.{${esLintExtensions.join(',')}}`,
        fix ? '--fix' : '--no-fix',
        verbose ? '' : '--quiet',
      ],
      {
        stdio: 'inherit',
      },
    ).on('close', resolve);
  });
}
