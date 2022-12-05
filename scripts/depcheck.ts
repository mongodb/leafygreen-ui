/* eslint-disable no-console */
import chalk from 'chalk';
import { SpawnOptions, spawnSync } from 'child_process';
import { Command } from 'commander';
import depcheck from 'depcheck';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';

import packageJson from '../package.json';

import { getPackageLGDependencies } from './utils/getPackageDependencies';
const lgPackages = readdirSync('packages/');
const devDependencies = Object.keys(packageJson.devDependencies);

const cli = new Command('depcheck')
  .option('-f, --fix', 'Option to fix any errors found', false)
  .option(
    '--fix-tsconfig',
    'Optionally overwrite the tsconfig.json based on package.json',
  )
  .parse(process.argv);
const fix: boolean = cli.opts()['fix'];
const fixTS = cli.opts()['fixTsconfig'];

const depcheckOptions: depcheck.Options = {
  ignorePatterns: [
    // files matching these patterns will be ignored
    '*.spec.tsx',
    '*.story.tsx',
  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    '@leafygreen-ui/mongo-nav',
  ],
};

checkDependencies();

async function checkDependencies() {
  let issuesFound = false;

  for (const pkg of lgPackages) {
    const check = await depcheck(
      resolve(__dirname, `../packages/${pkg}`),
      depcheckOptions,
    );
    const { dependencies: unused, missing: missingLocal } = check;

    const missing = Object.keys(missingLocal).filter(
      dep => !devDependencies.includes(dep),
    );

    if (missing.length > 0 || unused.length > 0) {
      missing.length > 0 &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} is missing: ${chalk.redBright(
            missing.join(', '),
          )}`,
        );
      unused.length > 0 &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} doesn't use ${chalk.blueBright(
            unused.join(', '),
          )}`,
        );

      if (fix) {
        fixDependencies(pkg, missing, unused);
      } else {
        issuesFound = true;
      }

      console.log('');
    }

    if (fixTS) {
      fixTSconfig(pkg);
    }
  }

  if (issuesFound) {
    exit(1);
  } else {
    exit(0);
  }
}

function fixDependencies(
  pkg: string,
  missing: Array<string>,
  unused: Array<string>,
): void {
  const cmdOpts: SpawnOptions = { stdio: 'inherit', cwd: `packages/${pkg}` };
  // Using yarn 1.19.0 https://stackoverflow.com/questions/62254089/expected-workspace-package-to-exist-for-sane
  missing.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'add', '-W', ...missing], cmdOpts);
  unused.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'remove', ...unused], cmdOpts);
}

/**
 * Reads the tsconfig file and rewrites the references array based on the package.json
 */
function fixTSconfig(pkg: string) {
  const tsConfigFileName = `packages/${pkg}/tsconfig.json`;
  const dependencies = getPackageLGDependencies(pkg);
  const tsconfig = JSON.parse(readFileSync(tsConfigFileName, 'utf-8'));
  tsconfig.references = dependencies
    .filter(dep => dep !== 'mongo-nav')
    .map(dep => ({
      path: `../${dep}`,
    }));
  writeFileSync(tsConfigFileName, JSON.stringify(tsconfig, null, 2) + '\n');
}
