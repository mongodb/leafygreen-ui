#! /usr/bin/env node
/* eslint-disable no-console */
import { spawn } from 'cross-spawn';

import { getConfigFile } from './utils/getConfigFile';
import { getJestBinary } from './utils/getJestBinary';

export interface TestCommandOptions {
  ci: boolean;
  watch?: boolean;
  verbose?: boolean;
  config?: string;
  react17?: boolean;
  silent?: boolean;
}

export const test = (
  passThrough: Array<string> | string | undefined,
  options: TestCommandOptions,
) => {
  const rootDir = process.cwd();
  const { watch, ci, verbose, silent } = options;
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
    silent ? '--silent' : '',
    ...(ci ? ciFlags : []),
    ...passThroughOptions,
  ].filter(v => v !== '');

  spawn(jestBinary, commandArgs, {
    env: {
      ...process.env,
      JEST_ENV: 'client',
    },
    stdio: 'inherit',
  }).on('exit', process.exit);
};
