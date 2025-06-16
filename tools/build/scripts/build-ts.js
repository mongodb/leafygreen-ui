#!/usr/bin/env node

// Define an array of flags to exclude
const excludedFlags = ['--downlevel', '--update'];

// Filter out excluded flags
const filteredArgs = process.argv
  .slice(2)
  .filter(arg => !excludedFlags.includes(arg));

// Execute tsc command
const { spawnSync } = require('child_process');
spawnSync('tsc', ['--build', 'tsconfig.json', ...filteredArgs], {
  stdio: 'inherit',
  shell: true,
});

process.exit(0);
