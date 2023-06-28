#! /usr/bin/env node
import { spawn } from 'child_process';
import { Command } from 'commander';
import path from 'path';

const rootDir = process.cwd();

const cli = new Command('test')
  .description('Tests leafygreen-ui packages with unified config.')
  .option('--ssr', 'Runs tests on a simulated server', false)
  .option('--watch', 'Watch all files you intend to test', false)
  .allowUnknownOption()
  .parse(process.argv);

const { ssr, watch } = cli.opts();

const configFile = ssr
  ? path.resolve(__dirname, '../config/ssr/jest.config.js')
  : path.resolve(__dirname, '../config/jest.config.js');

spawn(
  'jest',
  [`--config`, configFile, `--rootDir`, rootDir, watch ? '--watch' : ''],
  {
    env: {
      ...process.env,
      JEST_ENV: ssr ? 'ssr' : 'client',
    },
    stdio: 'inherit',
  },
);
