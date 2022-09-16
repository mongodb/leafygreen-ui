/* eslint-disable no-console */
import {  spawnSync } from 'child_process';
import { Command } from 'commander';
import { uniq } from 'lodash';
import { getGitDiff } from './utils/getGitDiff'
// import { getAllPackageNames } from './utils/getAllPackageNames'
import { getPackageLGDependencies } from './utils/getPackageDependencies'

interface Opts {
  diff: boolean;
  deps: boolean;
  watch: boolean;
  ssr: boolean,
  t: Array<string>;
}

const cli = new Command('test')
  .description('Tests leagygreen-ui packages.')
  .arguments('[packages...]')
  .option('--ssr', 'Runs tests on a simulated server', false)
  .option(
    '--diff',
    'Tests packages that you have been working on, based on the current git diff',
    false,
  )
  .option(
    '--deps',
    'Tests packages and their leafygreen-ui dependencies.',
    false,
  )
  .option('--watch', 'Watch all files you intend to test', false)
  .option(
    '-t <t...>',
    'passes into jest -t option',
    []
  )
  .parse(process.argv)

  const {
    diff,
    deps,
    ssr,
    watch,
    t
  } = cli.opts() as Opts;
let packages: Array<string> = cli.args;

if (diff) {
  const changedPackages = getGitDiff()
  packages = changedPackages.length > 0 ? changedPackages : cli.args;
}

if (deps) {
  const dependencies = uniq(
    packages.flatMap(pkg => getPackageLGDependencies(pkg)),
  );
  packages.splice(0, 0, ...dependencies);
}

const packageArgs = [...packages.map(pkg => `packages/${pkg}`), ...t]
console.log(`Testing ${packageArgs.length || 'all'} packages`)
const cmdArgs = ['--env', 'jsdom', '--config', ssr ? 'jest.config.js' : 'ssr.jest.config.js']

if (watch) {cmdArgs.push('--watch')}

spawnSync('jest', [...cmdArgs, ...packageArgs],  { stdio: 'inherit' })