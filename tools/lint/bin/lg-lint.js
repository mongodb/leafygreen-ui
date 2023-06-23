#! /usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const { Command } = require('commander');
const rootDir = process.cwd();
const eslintConfig = path.resolve(__dirname, '../eslint.config.js');
const prettierConfig = path.resolve(__dirname, '../prettier.config.js');

const esLintExtensions = ['js', 'ts', 'tsx'];
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml']

const cli = new Command()
.option('-f, --fix', 'fix linting errors', false)
.parse(process.argv);

const { fix } = cli.opts();

spawnSync(
  'eslint',
  [
    "--config",
    eslintConfig,
    `${rootDir}/**/*.{${esLintExtensions.join(',')}}`,
    fix ? '--fix' : '--no-fix',
  ],
  {
    stdio: 'inherit',
  }
);

spawnSync(
  'prettier',
  [
    fix ? '--write' : '--check',
    '--config',
    prettierConfig,
    `${rootDir}/**/*.{${prettierExtensions.join(',')}}`,
  ],
  {
    stdio: 'inherit',
  },
);
