/* eslint-disable no-console */
import depcheck from 'depcheck';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk';
import { Command } from 'commander';
import { SpawnOptions, spawnSync } from 'child_process';
import { getPackageLGDependencies } from './utils/getPackageDependencies';
import globalPackageJson from '../package.json';
import fetch from 'node-fetch';
import { isEqual, pick } from 'lodash';

const lgPackages = readdirSync('packages/');
const globalDevDependencies = Object.keys(globalPackageJson.devDependencies);

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

const testFilePatterns = [
  // files matching these patterns will be ignored
  /.*.spec.tsx?/,
  /.*.story.tsx?/,
  /.*.example.tsx?/,
  /.*.utils.tsx?/,
];

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
      dependencies: unusedDeps,
      devDependencies: unusedDev,
      missing: missingLocal,
      using,
    } = check;

    const pkgJson = readPackageJson(pkg);

    // Decide which missing dependencies should just be devDependencies
    const missing = sortDependenciesByUsage(missingLocal, pkg);

    // Ensure used dependencies are listed correctly per their usage
    // i.e. every listed devDep should _only_ be used in .story or .spec files
    // If it's used in other files, we remove it and re-install it as a regular dependency
    {
      const usedAsDev = sortDependenciesByUsage(using, pkg).devDependencies;
      const listed = pick(pkgJson, ['devDependencies']).devDependencies;
      const listedDev = listed ? Object.keys(listed) : [];

      if (
        listedDev.length &&
        // Check if every usage of every listed devDep is in some test file
        !listedDev.every(depName =>
          using[depName].every(file =>
            testFilePatterns.some(pattern => pattern.test(file)),
          ),
        )
      ) {
        // add the dependencies that are listed as dev but not used as dev to the unused array to uninstall them
        const listedButNotUsedAsDev = listedDev.filter(
          dep => !usedAsDev.includes(dep),
        );
        unusedDev.push(...listedButNotUsedAsDev);
        missing.dependencies.push(...listedButNotUsedAsDev);
      }
    }

    // Do the inverse of above
    // Ensure dependencies listed as `dependencies` are used in files other than .story or .spec files
    // i.e. Every listed dependency should be used in at leas one file that is not .story or .spec
    {
      const usedAsDependency = sortDependenciesByUsage(using, pkg).dependencies;
      const listed = pick(pkgJson, ['dependencies']).dependencies;
      const listedDeps = listed ? Object.keys(listed) : [];

      if (
        usedAsDependency &&
        listedDeps &&
        // Check if at least one usage of every listed dep is not in any test file
        !listedDeps.every(depName =>
          using[depName].some(
            file => !testFilePatterns.some(pattern => pattern.test(file)),
          ),
        )
      ) {
        const listedButOnlyUsedAsDev = listedDeps.filter(
          dep => !usedAsDependency.includes(dep),
        );
        unusedDeps.push(...listedButOnlyUsedAsDev);
      }
    }

    const countMissing = Object.keys(missing.dependencies).length;
    const countMissingDev = Object.keys(missing.devDependencies).length;

    if (
      countMissing > 0 ||
      countMissingDev > 0 ||
      unusedDeps.length > 0 ||
      unusedDev.length > 0
    ) {
      unusedDeps.length > 0 &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} does not use ${chalk.blueBright(
            unusedDeps.join(', '),
          )}`,
        );

      unusedDev.length > 0 &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} does not use ${chalk.blueBright(
            unusedDev.join(', '),
          )} as devDependencies`,
        );

      countMissing > 0 &&
        console.log(
          `${chalk.green(
            `packages/${pkg}`,
          )} is missing dependencies: ${chalk.redBright(
            missing.dependencies.join(', '),
          )}`,
        );

      countMissingDev > 0 &&
        console.log(
          `${chalk.green(
            `packages/${pkg}`,
          )} is missing devDependencies: ${chalk.yellowBright(
            missing.devDependencies.join(', '),
          )}`,
        );

      if (fix) {
        await fixDependencies(pkg, missing, [...unusedDeps, ...unusedDev]);
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

async function fixDependencies(
  pkg: string,
  missing: {
    dependencies: Array<string>;
    devDependencies: Array<string>;
  },
  unused: Array<string>,
) {
  const cmdOpts: SpawnOptions = { stdio: 'inherit', cwd: `packages/${pkg}` };
  // Using yarn 1.19.0 https://stackoverflow.com/questions/62254089/expected-workspace-package-to-exist-for-sane
  unused.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'remove', ...unused], cmdOpts);

  missing.dependencies.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'add', ...missing.dependencies], cmdOpts);

  // There's a bug in yarn@1.19.0 where some packages don't install as devDependencies
  // even if the `-D` flag is provided.
  // So we have to install devDependencies manually
  if (missing.devDependencies.length > 0) {
    const pkgJson = readPackageJson(pkg);

    const missingDevDepsObject = {} as { [key: string]: string };

    for (const depName of missing.devDependencies) {
      const searchUrl = `https://registry.npmjs.com/-/v1/search?text=${depName}`;
      const { objects }: any = await fetch(searchUrl).then(data => data.json());
      const pkgRef = objects
        ? objects.find((obj: any) => obj.package.name === depName)
        : null;

      if (!pkgRef) {
        console.error(chalk.red(`Could not find ${depName} on npm`));
        break;
      }

      const { version } = pkgRef.package;
      missingDevDepsObject[depName] = `^${version}`;
    }
    pkgJson.devDependencies = {
      ...pkgJson?.devDependencies,
      ...missingDevDepsObject,
    };

    if (pkgJson.devDependencies.length <= 0) {
      delete pkgJson.devDependencies;
    }

    const pkgJsonPath = resolve(__dirname, `../packages/${pkg}/package.json`);
    writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
    spawnSync(`yarn`, ['install'], cmdOpts);
  }
}

/**
 * Reads the tsconfig file and rewrites the references array based on the package.json
 */
function fixTSconfig(pkg: string) {
  const tsConfigFileName = `packages/${pkg}/tsconfig.json`;
  // Including devDependencies in tsconfig can introduce circular dependencies
  const dependencies = getPackageLGDependencies(pkg, { dev: false });

  try {
    const tsconfig = JSON.parse(readFileSync(tsConfigFileName, 'utf-8'));
    const refs = dependencies
      .filter(dep => dep !== 'mongo-nav')
      .map(dep => ({
        path: `../${dep}`,
      }));

    if (!isEqual(tsconfig.references, refs)) {
      tsconfig.references = refs;
      console.log(chalk.gray(`Fixing ${pkg}/tsconfig.json`));
      writeFileSync(tsConfigFileName, JSON.stringify(tsconfig, null, 2) + '\n');
    }
  } catch (error) {
    throw new Error(`Error in ${pkg}/tsconfig.json: ${error}`);
  }
}

function sortDependenciesByUsage(
  localDeps: Record<string, Array<string>>,
  pkg: string,
): {
  dependencies: Array<string>;
  devDependencies: Array<string>;
} {
  return (
    Object.entries(localDeps)
      // If the package in provided globally, ignore it
      .filter(([dep]) => !globalDevDependencies.includes(dep))
      // If a dependency is only used in tests or storybook,
      // then we add it as a dev dependency
      .reduce(
        (_missing, [name, fileUsedIn]) => {
          if (
            // If every file used in is a test file...
            fileUsedIn.every(file =>
              testFilePatterns.some(pattern => pattern.test(file)),
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

function readPackageJson(pkg: string): { [key: string]: any } {
  const pkgJsonPath = resolve(__dirname, `../packages/${pkg}/package.json`);
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
  return pkgJson;
}
