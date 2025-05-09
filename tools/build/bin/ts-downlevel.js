#! /usr/bin/env node
const { runTypescriptDownlevel } = require('../dist/umd/index.js');
const args = process.argv.slice(2);
const verbose = args.includes('--verbose') || args.includes('-v');
const update = args.includes('--update') || args.includes('-u');

runTypescriptDownlevel({ verbose, update });
