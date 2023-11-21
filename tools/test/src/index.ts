#! /usr/bin/env node
/* eslint-disable no-console */
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

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
  const { watch, ci, verbose, config: configParam, react17 } = options;
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
  const react17ConfigFile = path.resolve(
    __dirname,
    '../config/react17/jest.config.js',
  );

  const configFile = getConfigFile();

  const commandArgs = [
    ...[`--config`, configFile],
    ...[`--rootDir`, rootDir],
    watch ? '--watch' : '',
    verbose ? '--verbose' : '',
    ...(ci ? ciFlags : []),
    ...passThroughOptions,
  ].filter(v => v !== '');

  // TODO: if react17 - use jest 26.x binary

  spawn('jest', commandArgs, {
    env: {
      ...process.env,
      JEST_ENV: 'client',
    },
    stdio: 'inherit',
  }).on('exit', process.exit);

  // uses closure
  function getConfigFile() {
    if (configParam && fse.existsSync(configParam)) {
      return configParam; // Use the parameter if it exists
    }

    if (react17) {
      if (fse.existsSync(react17ConfigFile)) {
        console.log('Using React 17 test config');
        verbose && console.log(react17ConfigFile);
        return react17ConfigFile; // If react17 flag was used, use that config
      } else {
        throw new Error('No React17 test config found');
      }
    }

    if (fse.existsSync(localConfigFile)) {
      return localConfigFile; // otherwise look for a config at the root
    }

    return defaultConfigFile; // fallback to the default config
  }
};
