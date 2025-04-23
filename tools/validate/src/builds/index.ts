/**
 * Runs checks to ensure all modules have the appropriate exports
 */

/* eslint-disable no-console */
import { getAllPackages, getPackageJson } from '@lg-tools/meta';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { ValidateCommandOptions } from '../validate.types';

import { getModuleTypes } from './getModuleTypes';

// A list of packages to ignore
const ignorePackages = ['@lg-tools/storybook'];

/**
 * Validates `umd`, `esm` and TS build integrity for all packages in the repository.
 */
export const validateBuilds = ({
  verbose,
}: Partial<ValidateCommandOptions>) => {
  const packagePaths = getAllPackages();

  verbose && console.log(chalk.gray('Validating builds...'));

  return new Promise<void>((resolve, reject) => {
    console.log(`Validating builds for ${packagePaths.length} packages...`);

    // Check that every package's /dist folder has a valid UMD, ESM & TS files
    for (const pkgPath of packagePaths) {
      const pkgJson = getPackageJson(pkgPath);

      if (!pkgJson) {
        exit1('Invalid package path: ' + pkgPath);
        return;
      }

      // extract the name and output paths from the package.json
      const {
        name: pkgName,
        main: umdPath,
        module: esmPath,
        types: typesPath,
      } = pkgJson;

      // Skip some packages
      if (ignorePackages.includes(pkgName)) {
        continue;
      }

      const distDir = path.resolve(pkgPath, 'dist');
      const buildExists = fse.existsSync(distDir);

      if (!buildExists) {
        exit1(`No build found for package ${chalk.bold(pkgName)}`);
        return;
      }

      const umdIndex = path.resolve(pkgPath, umdPath);
      const umdExists = fse.existsSync(umdIndex);
      const isUMDValid = umdExists && getModuleTypes(umdIndex).includes('cjs');

      const esmIndex = path.resolve(pkgPath, esmPath);
      const esmExists = fse.existsSync(esmIndex);
      const isESMValid = esmExists && getModuleTypes(esmIndex).includes('esm');

      const tsIndex = path.resolve(pkgPath, typesPath);
      const tsExists = fse.existsSync(tsIndex);

      if (verbose) {
        console.log(chalk.blue(pkgName));
        console.log(chalk.gray('UMD: '));
        console.log(
          chalk.gray(
            JSON.stringify(
              {
                index: path.relative(pkgPath, umdIndex),
                exists: umdExists,
                valid: isUMDValid,
              },
              null,
              2,
            ),
          ),
        );
        console.log(chalk.gray('ESM: '));
        console.log(
          chalk.gray(
            JSON.stringify(
              {
                index: path.relative(pkgPath, umdIndex),
                exists: umdExists,
                valid: isUMDValid,
              },
              null,
              2,
            ),
          ),
        );
        console.log(chalk.gray('Types '));
        console.log(
          chalk.gray(
            JSON.stringify(
              {
                index: path.relative(pkgPath, umdIndex),
                exists: umdExists,
                valid: isUMDValid,
              },
              null,
              2,
            ),
          ),
        );
      }

      if (
        ![umdExists, esmExists, tsExists, isUMDValid, isESMValid].every(Boolean)
      ) {
        const errorMsg: Array<string> = [
          chalk.red.bold(`Error in package \`${pkgName}\`:`),
        ];
        if (!umdExists) errorMsg.push(chalk.red('`dist/index.js` not found'));
        if (!esmExists)
          errorMsg.push(chalk.red('`dist/esm/index.js` not found'));
        if (!tsExists) errorMsg.push(chalk.red('Typescript build not found'));
        if (!isUMDValid)
          errorMsg.push(
            chalk.red(`UMD module not valid`),
            chalk.gray(`(${umdIndex})`),
          );
        if (!isESMValid)
          errorMsg.push(
            chalk.red(`ESM module not valid`),
            chalk.gray(`(${esmIndex})`),
          );

        if (errorMsg.length > 0) {
          exit1(errorMsg.join('\n'));
          return;
        }
      }
    }

    console.log('Builds OK ✅');
    resolve();
    return;

    function exit1(msg: string) {
      console.log(chalk.red(msg));
      reject(msg);
    }
  });
};
