#!/usr/bin/env node

// lg-build can't use itself as a dependency in the build process
const { spawnSync } = require('child_process');
spawnSync('rollup', ['-c', './rollup.config.mjs'], {
  stdio: 'inherit',
  shell: true,
});
