#! /usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
// const { Command } = require('commander');
// const rootDir = process.cwd();
const config = path.resolve(__dirname, '../eslint.config.js');

spawn(
  'eslint',
  [
    "**/*.{js,ts,tsx}",
    "--config",
    config
  ],
  {
    stdio: 'inherit',
  }
)



