/* eslint-disable no-console */
import depcheck from 'depcheck';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk';
import { Command } from 'commander';
import packageJson from '../package.json';
import { SpawnOptions, spawnSync } from 'child_process';
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
    // '*.spec.tsx',
    // '*.story.tsx',
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

    const missing = Object.entries(missingLocal)
      .filter(([dep]) => !devDependencies.includes(dep))
      .reduce((_missing, [name, usedIn]) => {
        // If a dependency is only used in tests or storybook, then we add it as a dev dependency
        if (usedIn.every(file => file.includes('.story.tsx') || file.includes('.spec.tsx'))) {
          _missing.devDependencies.push(name)
        } else {
          _missing.dependencies.push(name)
        }

        return _missing
    }, {
      dependencies: [] as Array<string>,
      devDependencies: [] as Array<string>
    })

    const countMissing = Object.keys(missing.dependencies).length
    const countMissingDev = Object.keys(missing.devDependencies).length

    if (countMissing > 0 || countMissingDev > 0 || unused.length > 0) {

      countMissing > 0 &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} is missing: ${chalk.redBright(
            missing.dependencies.join(', '),
          )}`
        );

      countMissingDev > 0 &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} is missing devDependencies: ${chalk.redBright(
            missing.devDependencies.join(', '),
          )}`
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
  missing: {
    dependencies: Array<string>;
    devDependencies: Array<string>;
} ,
  unused: Array<string>,
): void {

  const cmdOpts: SpawnOptions = { stdio: 'inherit', cwd: `packages/${pkg}` };
  // Using yarn 1.19.0 https://stackoverflow.com/questions/62254089/expected-workspace-package-to-exist-for-sane
  missing.dependencies.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'add', '-W', ...missing.dependencies], cmdOpts);
  missing.devDependencies.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'add', '-W', '-D', ...missing.devDependencies], cmdOpts);
  unused.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'remove', ...unused], cmdOpts);
}

/**
 * Reads the tsconfig file and rewrites the references array based on the package.json
 */
function fixTSconfig(pkg: string) {
  const tsConfigFileName = `packages/${pkg}/tsconfig.json`;
  const dependencies = getPackageLGDependencies(pkg);

  try {
    const tsconfig = JSON.parse(readFileSync(tsConfigFileName, 'utf-8'));
    tsconfig.references = dependencies
      .filter(dep => dep !== 'mongo-nav')
      .map(dep => ({
        path: `../${dep}`,
      }));
    writeFileSync(tsConfigFileName, JSON.stringify(tsconfig, null, 2) + '\n');
  } catch (error) {
    throw new Error(`Error in ${pkg}: ${error}`);
  }
}
