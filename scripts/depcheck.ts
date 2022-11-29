/* eslint-disable no-console */
import depcheck from 'depcheck';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk';
import { Command } from 'commander';
import { SpawnOptions, spawnSync } from 'child_process';
import { getPackageLGDependencies } from './utils/getPackageDependencies';
import packageJson from '../package.json';
const lgPackages = readdirSync('packages/');
const globalDevDependencies = Object.keys(packageJson.devDependencies);

const cli = new Command('depcheck')
  .arguments('[...packages]')
  .option('-v, --verbose', 'Verbose mode', false)
  .option('-f, --fix', 'Option to fix any errors found', false)
  .option(
    '--fix-tsconfig',
    'Optionally overwrite the tsconfig.json based on package.json',
  )
  .parse(process.argv);

const fix: boolean = cli.opts()['fix'];
const fixTS = cli.opts()['fixTsconfig'];
const verbose = cli.opts()['verbose'];

const depcheckOptions: depcheck.Options = {
  ignoreMatches: [
    // ignore dependencies that matches these globs
    '@leafygreen-ui/mongo-nav',
  ],
};

checkDependencies();

async function checkDependencies() {
  let issuesFound = false;

  const packages = cli.args.length > 0 ? cli.args : lgPackages;

  for (const pkg of packages) {
    const check = await depcheck(
      resolve(__dirname, `../packages/${pkg}`),
      depcheckOptions,
    );
    const {
      dependencies: _unused,
      devDependencies: unusedDev,
      missing: missingLocal,
    } = check;

    // Compile all unused dependencies
    const unused = { ..._unused, unusedDev };

    // Decide which missing dependencies should just be devDependencies
    const missing = sortMissingDependencies(missingLocal, pkg);

    const countMissing = Object.keys(missing.dependencies).length;
    const countMissingDev = Object.keys(missing.devDependencies).length;

    if (countMissing > 0 || countMissingDev > 0 || unused.length > 0) {
      countMissing > 0 &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} is missing: ${chalk.redBright(
            missing.dependencies.join(', '),
          )}`,
        );

      countMissingDev > 0 &&
        console.log(
          `${chalk.green(
            `packages/${pkg}`,
          )} is missing devDependencies: ${chalk.redBright(
            missing.devDependencies.join(', '),
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
  missing: {
    dependencies: Array<string>;
    devDependencies: Array<string>;
  },
  unused: Array<string>,
): void {
  const cmdOpts: SpawnOptions = { stdio: 'inherit', cwd: `packages/${pkg}` };
  // Using yarn 1.19.0 https://stackoverflow.com/questions/62254089/expected-workspace-package-to-exist-for-sane
  missing.dependencies.length > 0 &&
    spawnSync(
      'npx',
      ['yarn@1.19.0', 'add', '-W', ...missing.dependencies],
      cmdOpts,
    );
  missing.devDependencies.length > 0 &&
    spawnSync(
      'npx',
      ['yarn@1.19.0', 'add', '-W', '-D', ...missing.devDependencies],
      cmdOpts,
    );
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
    console.log(`Fixing ${pkg}/tsconfig`);
    writeFileSync(tsConfigFileName, JSON.stringify(tsconfig, null, 2) + '\n');
  } catch (error) {
    throw new Error(`Error in ${pkg}: ${error}`);
  }
}

function sortMissingDependencies(
  missingLocal: Record<string, Array<string>>,
  pkg: string,
): {
  dependencies: Array<string>;
  devDependencies: Array<string>;
} {
  return (
    Object.entries(missingLocal)
      // If the package in provided globally, ignore it
      .filter(([dep]) => !globalDevDependencies.includes(dep))
      // If a dependency is only used in tests or storybook,
      // then we add it as a dev dependency
      .reduce(
        (_missing, [name, usedIn]) => {
          if (
            usedIn.every(
              file => file.includes('.story.tsx') || file.includes('.spec.tsx'),
            )
          ) {
            verbose && console.log(`${pkg} uses ${name} in a test file`);
            _missing.devDependencies.push(name);
          } else {
            verbose && console.log(`${pkg} missing ${name}`);
            _missing.dependencies.push(name);
          }

          return _missing;
        },
        {
          dependencies: [] as Array<string>,
          devDependencies: [] as Array<string>,
        },
      )
  );
}
