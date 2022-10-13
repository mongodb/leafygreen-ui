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
    const changedPackages = getGitDiff();

    if (changedPackages.length > 0) {
      console.log(
        chalk.bold(
          `\nUsing changed packages against ${chalk.bgWhite.black('main')}`,
        ),
      );
      packages.length > 0 &&
        console.log(chalk.yellow(`\tIgnoring package names provided`));
      console.log(
        `\t${changedPackages.length} diffs found:`,
        chalk.blue(changedPackages),
      );
      packages = changedPackages;
    } else {
      // no diffs found
      packages = packages.length > 0 ? packages : getAllPackageNames();
      console.log(`\tNo diffs found. Using ${packages.length} packages`);
      process.exit(0);
    }
  } else {
    // `diff` is false
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
