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

  const configFile = getConfigFile(options);
  const jestBinary = getJestBinary(options);

  const commandArgs = [
    ...[`--config`, configFile],
    ...[`--rootDir`, rootDir],
    watch ? '--watch' : '',
    verbose ? '--verbose' : '',
    ...(ci ? ciFlags : []),
    '--silent',
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
