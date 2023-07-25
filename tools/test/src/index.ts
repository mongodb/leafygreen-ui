#! /usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export interface TestCommandOptions {
  watch: boolean;
  ci: boolean;
  testNamePattern?: string;
  config?: string;
}

export const test = (options: TestCommandOptions) => {
  const rootDir = process.cwd();
  const { watch, testNamePattern, ci, config: configParam } = options;
  const ciFlags = [
    '--no-cache',
    '--ci',
    '--runInBand',
    '--reporters=default',
    '--reporters=jest-junit',
  ];

  const localConfigFile = path.resolve(rootDir, 'jest.config.js');
  const defaultConfigFile = path.resolve(__dirname, '../config/jest.config.js');
  const configFile =
    configParam && fs.existsSync(configParam)
      ? configParam // Use the parameter if it exists
      : fs.existsSync(localConfigFile)
      ? localConfigFile // otherwise look for a config at the root
      : defaultConfigFile; // fallback to the default config

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
