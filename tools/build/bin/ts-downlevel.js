#! /usr/bin/env node
const { runTypescriptDownlevel } = require('../dist/index.js');
const args = process.argv.slice(2);
const verbose = args.includes('--verbose') || args.includes('-v');
runTypescriptDownlevel({ verbose });
