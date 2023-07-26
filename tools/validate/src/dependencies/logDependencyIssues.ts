/* eslint-disable no-console */
import chalk from 'chalk';

import { DependencyIssues } from './config';
import { lgProvider } from './validatePeerDependencies';

export function logDependencyIssues(
  pkg: string,
  {
    missingDependencies,
    missingDevDependencies,
    unusedDependencies,
    unusedDevDependencies,
    listedDevButUsedAsDependency,
    listedButOnlyUsedAsDev,
    isMissingPeers,
  }: DependencyIssues,
  verbose?: boolean,
) {
  unusedDependencies.length > 0 &&
    console.log(
      `${chalk.green(pkg)} does not use ${chalk.blueBright(
        unusedDependencies.join(', '),
      )}`,
    );

  unusedDevDependencies.length > 0 &&
    console.log(
      `${chalk.green(pkg)} does not use ${chalk.blueBright(
        unusedDevDependencies.join(', '),
      )} as devDependencies`,
    );

  missingDependencies.length > 0 &&
    console.log(
      `${chalk.green(pkg)} is missing dependencies: ${chalk.redBright(
        missingDependencies.join(', '),
      )}`,
    );

  missingDevDependencies.length > 0 &&
    console.log(
      `${chalk.green(pkg)} is missing devDependencies: ${chalk.yellowBright(
        missingDevDependencies.join(', '),
      )}`,
    );

  listedDevButUsedAsDependency.length > 0 &&
    console.log(
      `${chalk.green(
        pkg,
      )} lists these as devDependencies, but are used in source files: ${chalk.yellowBright(
        listedDevButUsedAsDependency.join(', '),
      )}`,
    );

  listedButOnlyUsedAsDev.length > 0 &&
    console.log(
      `${chalk.green(
        pkg,
      )} lists these as dependencies, but are only used in test files: ${chalk.yellowBright(
        listedButOnlyUsedAsDev.join(', '),
      )}`,
    );

  isMissingPeers &&
    console.log(
      `${chalk.green(pkg)} does not list ${chalk.greenBright(
        lgProvider,
      )} as a peer dependency.\n  Please fix this manually in ${chalk.gray(
        `${pkg}/package.json`,
      )}`,
    );
}
