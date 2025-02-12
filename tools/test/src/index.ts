#! /usr/bin/env node

import chalk from 'chalk';
import { spawn } from 'cross-spawn';

import { getConfigFile } from './utils/getConfigFile';
import { getJestBinary } from './utils/getJestBinary';

export interface TestCommandOptions {
  ci: boolean;
  watch?: boolean;
  verbose?: boolean;
  config?: string;
  react17?: boolean;
}

export const test = (
  passThrough: Array<string> | string | undefined,
  options: TestCommandOptions,
) => {
  const rootDir = process.cwd();
  const { watch, ci, verbose } = options;
  const ciFlags = [
    '--no-cache',
    '--ci',
    '--runInBand',
    '--reporters=default',
    '--reporters=jest-junit',
  ];
  const passThroughOptions = passThrough
    ? typeof passThrough === 'string'
      ? [passThrough]
      : passThrough
    : [];

  // Add coverage options
  if (passThroughOptions.includes('--coverage')) {
    const testDir = passThroughOptions.find(opt => !opt.startsWith('--'));
    const dir = testDir ? `packages/${testDir}/src/` : '';
    const coverageFlag =
      '--collectCoverageFrom=' + dir + '**/*.{js,jsx,ts,tsx}';
    passThroughOptions.push(coverageFlag);
  }

  const configFile = getConfigFile(options);
  const jestBinary = getJestBinary(options);

  const commandArgs = [
    ...[`--config`, configFile],
    ...[`--rootDir`, rootDir],
    watch ? '--watch' : '',
    verbose ? '--verbose' : '',
    ...(ci ? ciFlags : []),
    `--silent="${String(!verbose)}"`,
    ...passThroughOptions,
  ].filter(v => v !== '');

  verbose &&
    // eslint-disable-next-line no-console
    console.log(chalk.gray(`Running jest with args: ${commandArgs.join(' ')}`));

  spawn(jestBinary, commandArgs, {
    env: {
      ...process.env,
      JEST_ENV: 'client',
    },
    stdio: 'inherit',
  }).on('exit', process.exit);
};
