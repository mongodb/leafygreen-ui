#! /usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const { Command } = require('commander');
const rootDir = process.cwd();
const eslintConfig = path.resolve(__dirname, '../eslint.config.js');
const prettierConfig = path.resolve(__dirname, '../prettier.config.js');

const esLintExtensions = ['js', 'ts', 'tsx'];
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

const cli = new Command()
  .option('-f, --fix', 'fix linting errors', false)
  .option('-p, --prettier', 'run prettier only', false)
  .option('-e, --eslint', 'run eslint only', false)
  .parse(process.argv);

const { fix, prettier: prettierOnly, eslint: eslintOnly } = cli.opts();

!prettierOnly &&
  spawn(
    'eslint',
    [
      '--config',
      eslintConfig,
      `${rootDir}/**/*.{${esLintExtensions.join(',')}}`,
      fix ? '--fix' : '--no-fix',
    ],
    {
      stdio: 'inherit',
    },
  );

!eslintOnly &&
  spawn(
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

const npmPkgLintConfig = path.resolve(
  __dirname,
  '../npmpackagejsonlintrc.config.js',
);

spawn('npmPkgJsonLint', ['--configFile', npmPkgLintConfig, rootDir], {
  stdio: 'inherit',
});
