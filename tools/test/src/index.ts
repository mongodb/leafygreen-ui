#! /usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';

const rootDir = process.cwd();

export interface TestCommandOptions {
  watch: boolean;
  ci: boolean;
  testNamePattern?: string;
}

export const test = (options: TestCommandOptions) => {
  const { watch, testNamePattern, ci } = options;
  const ciFlags = [
    '--no-cache',
    '--ci',
    '--runInBand',
    '--reporters=default',
    '--reporters=jest-junit',
  ];
  const configFile = path.resolve(__dirname, '../config/jest.config.js');

  spawn(
    'jest',
    [
      `--config`,
      configFile,
      `--rootDir`,
      rootDir,
      watch ? '--watch' : '',
      testNamePattern ? `--testNamePattern=${testNamePattern}` : '',
      ...(ci ? ciFlags : []),
    ],
    {
      env: {
        ...process.env,
        JEST_ENV: 'client',
      },
      stdio: 'inherit',
    },
  );
};
