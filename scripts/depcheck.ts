/* eslint-disable no-console */
import chalk from 'chalk';
import { SpawnOptions, spawnSync } from 'child_process';
import { Command } from 'commander';
import depcheck from 'depcheck';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { isEqual, pick } from 'lodash';
import fetch from 'node-fetch';
import { join, resolve } from 'path';
import { exit } from 'process';

import globalPackageJson from '../package.json';

import { getPackageLGDependencies } from './utils/getPackageDependencies';

const lgPackages = readdirSync('packages/');
const globalDevDependencies = Object.keys(globalPackageJson.devDependencies);
const lgProvider = '@leafygreen-ui/leafygreen-provider';

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

// files matching these patterns will be ignored
const ignoreFilePatterns: Array<RegExp> = [
  /.*.spec.tsx?/,
  /.*.?stor(y|ies).(t|j)sx?/,
  /.*.stories.tsx?/,
  /.*.example.tsx?/,
  /.*.testutils.tsx?/,
  /.*\/dist\/.*/,
];

// these dependencies will be ignored when listed in a package.json
const ignoreMatches = ['@leafygreen-ui/mongo-nav', 'prop-types'];

const depcheckOptions: depcheck.Options = {
  ignoreMatches,
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
      const { devDependencies: usedAsDev } = sortDependenciesByUsage(
        using,
        pkg,
      );
      const { devDependencies: _listedDevObj } = pick(pkgJson, [
        'devDependencies',
      ]);
      const listedDev = _listedDevObj ? Object.keys(_listedDevObj) : [];

      // Check if every usage of every listed devDep is in some test file
      const isDependencyUsedInTestFileOnly = (depName: string) =>
        using?.[depName]?.every(file =>
          ignoreFilePatterns.some(pattern => pattern.test(file)),
        );
      const everyListedDevDepUsedInTestFileOnly = listedDev.every(
        isDependencyUsedInTestFileOnly,
      );

      if (listedDev.length && !everyListedDevDepUsedInTestFileOnly) {
        // add the dependencies that are listed as dev but not used as dev to the unused array to uninstall them
        const listedButNotUsedAsDev = listedDev.filter(
          dep => !usedAsDev.includes(dep),
        );

        verbose &&
          console.log(
            `${chalk.blue(
              pkg,
            )}: lists packages as devDependencies, but uses them in package files`,
          );
        verbose &&
          console.log(
            listedButNotUsedAsDev
              .map(
                devDepName =>
                  `\t${chalk.bold(devDepName)} used in: \n\t\t${using?.[
                    devDepName
                  ]
                    ?.map(file => file.replace(join(__dirname, '..'), ''))
                    .join('\n\t\t')}`,
              )
              .join('\n'),
          );

        unusedDev.push(...listedButNotUsedAsDev);
        missing.dependencies.push(...listedButNotUsedAsDev);
      }
    }

    // Do the inverse of above
    // Ensure dependencies listed as `dependencies` are used in files other than .story or .spec files
    // i.e. Every listed dependency should be used in at leas one file that is not .story or .spec
    {
      const { dependencies: usedAsDependency } = sortDependenciesByUsage(
        using,
        pkg,
      );
      const { dependencies: listedDepObj } = pick(pkgJson, ['dependencies']);
      const listedDeps = listedDepObj ? Object.keys(listedDepObj) : [];

      // Check if at least one usage of every listed dep is not in any test file

      const isDependencyUsedInPackageFile = (depName: string) => {
        // consider a dependency used in a package file if
        // its in `ignoreMatches`
        const isIgnored = ignoreMatches.includes(depName);
        const usedInPackageFile = using?.[depName]?.some(
          // is used in at least one...
          // file that is not ignored
          file => !ignoreFilePatterns.some(pattern => pattern.test(file)),
        );

        return isIgnored || usedInPackageFile;
      };

      const everyListedDependencyUsedInPackageFile = listedDeps.every(
        isDependencyUsedInPackageFile,
      );

      if (
        usedAsDependency &&
        listedDeps &&
        !everyListedDependencyUsedInPackageFile
      ) {
        const listedButOnlyUsedAsDev = listedDeps.filter(
          listedDepName =>
            !usedAsDependency.includes(listedDepName) &&
            !ignoreMatches.includes(listedDepName),
        );

        verbose &&
          console.log(
            `${chalk.blue(
              pkg,
            )}: lists packages as dependency, but only uses them in test files`,
          );
        verbose &&
          console.log(
            listedButOnlyUsedAsDev
              .map(
                depName =>
                  `\t${depName}: \n\t\t${using?.[depName]
                    ?.map(file => file.replace(join(__dirname, '..'), ''))
                    .join('\n\t\t')}`,
              )
              .join('\n'),
          );

        unusedDeps.push(...listedButOnlyUsedAsDev);
      }
    }

    const usesProvider = Boolean(using[lgProvider]);
    const isMissingProviderPeer =
      usesProvider && !pkgJson?.peerDependencies?.[lgProvider];

    const countMissing = Object.keys(missing.dependencies).length;
    const countMissingDev = Object.keys(missing.devDependencies).length;

    if (
      countMissing > 0 ||
      countMissingDev > 0 ||
      unusedDeps.length > 0 ||
      unusedDev.length > 0 ||
      isMissingProviderPeer
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

      isMissingProviderPeer &&
        console.log(
          `${chalk.green(`packages/${pkg}`)} does not list ${chalk.greenBright(
            lgProvider,
          )} as a peer dependency.\n  Please fix this manually in ${chalk.gray(
            `packages/${pkg}/package.json`,
          )}`,
        );

      if (fix) {
        await fixDependencies(pkg, missing, [...unusedDeps, ...unusedDev]);
      } else {
        issuesFound = !isMissingProviderPeer; // missing peer deps is not auto-fixable
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

/**
 * Sorts DepsRecord into dependencies & devDependencies
 */
function sortDependenciesByUsage(
  depsRecord: Record<string, Array<string>>,
  pkgName: string,
): {
  dependencies: Array<string>;
  devDependencies: Array<string>;
} {
  return (
    Object.entries(depsRecord)
      // If the package in provided globally, ignore it
      .filter(([dep]) => !globalDevDependencies.includes(dep))
      // If a dependency is only used in tests or storybook,
      // then we add it as a dev dependency
      .reduce(
        (_missing, [name, fileUsedIn]) => {
          if (
            // If every file used in is a test file...
            fileUsedIn.every(file =>
              ignoreFilePatterns.some(pattern => pattern.test(file)),
            )
          ) {
            // Ignore when we import the package itself in a test file
            if (!name.includes(pkgName)) {
              _missing.devDependencies.push(name);
            }
          } else {
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

/**
 * @returns a parsed package.json
 */
function readPackageJson(pkg: string): { [key: string]: any } {
  const pkgJsonPath = resolve(__dirname, `../packages/${pkg}/package.json`);
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
  return pkgJson;
}
