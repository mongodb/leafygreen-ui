#! /usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
// const { Command } = require('commander');
const rootDir = process.cwd();
const eslintConfig = path.resolve(__dirname, '../eslint.config.js');
const prettierConfig = path.resolve(__dirname, '../prettier.config.js');

// spawnSync(
//   'eslint',
//   [
//     "--config",
//     eslintConfig,
//     `${rootDir}/**/*.{js,ts,tsx}`
//   ],
//   {
//     stdio: 'inherit',
//   }
// );

spawnSync(
  'prettier',
  [
    '--check',
    '--config',
    prettierConfig,
    `${rootDir}/**/*.{js,ts,tsx,mjs,json,md,yml}`,
  ],
  {
    stdio: 'inherit',
  },
);
