#! /usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';

const rootDir = process.cwd();

interface TestCommandOptions {
  watch: boolean;
}

export const test = (options: TestCommandOptions) => {
  const { watch } = options;
  const configFile = path.resolve(__dirname, '../config/jest.config.js');

  spawn(
    'jest',
    [`--config`, configFile, `--rootDir`, rootDir, watch ? '--watch' : ''],
    {
      env: {
        ...process.env,
        JEST_ENV: 'client',
      },
      stdio: 'inherit',
    },
  );
};
