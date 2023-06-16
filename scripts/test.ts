/* eslint-disable no-console */
import { spawn } from 'child_process';
import { Command } from 'commander';
import { uniq } from 'lodash';
import { exit } from 'process';

import { getAllPackageNames } from './utils/getAllPackageNames';
import { getGitDiff } from './utils/getGitDiff';
import {
  getPackageDependents,
  getPackageLGDependencies,
} from './utils/getPackageDependencies';

interface Opts {
  diff: boolean;
  deps: boolean;
  watch: boolean;
  ssr: boolean;
  t: Array<string>;
  [key: string]: any;
}

const cli = new Command('test')
  .description('Tests leafygreen-ui packages.')
  .argument('[packages...]')
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
  .option('-t <t...>', 'passes into jest -t option', [])
  .allowUnknownOption()
  .parse(process.argv);

const { diff, deps, ssr, watch, t } = cli.opts() as Opts;

// The packages
let packages: Array<string> = cli.args.filter((arg: string) =>
  getAllPackageNames().includes(arg),
);
// Other unrecognized args that will be passed through
const args: Array<string> = cli.args.filter(
  (arg: string) => !getAllPackageNames().includes(arg),
);

if (diff) {
  const changedPackages = getGitDiff();
  packages = changedPackages.length > 0 ? changedPackages : packages;
}

if (deps) {
  const dependencies = uniq(
    packages.flatMap(pkg => getPackageLGDependencies(pkg)),
  );
  const dependents = uniq(packages.flatMap(pkg => getPackageDependents(pkg)));
  packages.splice(0, 0, ...dependencies, ...dependents);
}

const packageArgs = [...packages.map(pkg => `packages/${pkg}`), ...t];
console.log(`Testing ${packageArgs.length || 'all'} packages`);
const cmdArgs = [
  '--env',
  'jsdom',
  '--config',
  ssr ? 'jest.config.js' : 'ssr.jest.config.js',
  ...args,
];

if (watch) {
  cmdArgs.push('--watch');
}

spawn('jest', [...cmdArgs, ...packageArgs], {
  env: {
    ...process.env,
    JEST_ENV: ssr ? 'ssr' : 'client',
  },
  stdio: 'inherit',
}).on('exit', code => exit(code || 0));
