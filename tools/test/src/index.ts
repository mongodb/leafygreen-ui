#! /usr/bin/env node
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

export interface TestCommandOptions {
  watch: boolean;
  ci: boolean;
  config?: string;
}

export const test = (
  passThrough: Array<string> | string | undefined,
  options: TestCommandOptions,
) => {
  const rootDir = process.cwd();
  const { watch, ci, config: configParam } = options;
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

  const localConfigFile = path.resolve(rootDir, 'jest.config.js');
  const defaultConfigFile = path.resolve(__dirname, '../config/jest.config.js');
  const configFile =
    configParam && fse.existsSync(configParam)
      ? configParam // Use the parameter if it exists
      : fse.existsSync(localConfigFile)
      ? localConfigFile // otherwise look for a config at the root
      : defaultConfigFile; // fallback to the default config

  spawn(
    'jest',
    [
      ...[`--config`, configFile],
      ...[`--rootDir`, rootDir],
      watch ? '--watch' : '',
      ...(ci ? ciFlags : []),
      ...passThroughOptions,
    ],
    {
      env: {
        ...process.env,
        JEST_ENV: 'client',
      },
      stdio: 'inherit',
    },
  );

  spawn('echo', [configFile]);
};
