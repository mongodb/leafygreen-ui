/* eslint-disable no-console */
import chalk from 'chalk';
import { uniq } from 'lodash';
import { getAllPackageNames } from './getAllPackageNames';
import { getGitDiff } from './getGitDiff';
import {
  getPackageDependents,
  getPackageLGDependencies,
} from './getPackageDependencies';

/**
 *
 * Returns an array of package names based on the initial array
 * and the `diff`, `deps` and `exclude` options provided
 *
 * @param packages
 * @param options
 * @returns
 */
export function getRelevantPackages(
  packages: Array<string>,
  {
    deps,
    diff,
    exclude,
  }: {
    deps?: boolean;
    diff?: boolean;
    exclude?: Array<string>;
  },
) {
  // If we used the `diff` flag, we use packages based on the current git diff, regardless of what was passed in
  if (diff) {
    console.log(
      chalk.bold(`\nUsing changed packages against ${chalk.bgWhite('main')}`),
    );
    packages.length > 0 &&
      console.log(chalk.yellow(`\tIgnoring package names provided`));

    const changedPackages = getGitDiff();
    packages =
      changedPackages.length > 0 ? changedPackages : getAllPackageNames();

    if (changedPackages.length > 0) {
      console.log(
        `\t${changedPackages.length} diffs found:`,
        chalk.blue(changedPackages),
      );
      packages = changedPackages;
    } else {
      console.log('\tNo diffs found. Aborting.');
      process.exit(0);
    }
  } else {
    packages = packages.length > 0 ? packages : getAllPackageNames();
  }

  // If the `deps` flag was passed, get the dependencies of the packages
  if (deps) {
    const dependencies = uniq(
      packages.flatMap(pkg => getPackageLGDependencies(pkg)),
    );

    const dependents = uniq(packages.flatMap(pkg => getPackageDependents(pkg)));

    console.log(
      chalk.bold(`\nIncluding ${dependencies.length} dependencies:`),
      chalk.blue(dependencies.join(', ')),
    );
    console.log(
      chalk.bold(`Including ${dependents.length} dependents: `),
      chalk.blue(dependents.join(', ')),
    );

    packages.splice(0, 0, ...dependencies, ...dependents);
  }

  /**
   * `--exclude` - run all packages EXCEPT the ones following this flag (alias: `-e`)
   */
  if (exclude && exclude.length > 0) {
    console.log(`${chalk.bold.red(`Excluding: ${exclude.length} packages`)}`);

    // Look for the packages we should be excluding
    packages = packages.filter(pkg => !exclude.includes(pkg));
  }

  return uniq(packages);
}
