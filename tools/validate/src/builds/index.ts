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

      const checks = {
        umdExists: true,
        isUMDValid: true,
        esmExists: true,
        isESMValid: true,
        tsExists: true,
      };

      const distDir = path.resolve(pkgPath, 'dist');
      const buildExists = fse.existsSync(distDir);

      if (!buildExists) {
        exit1(`No build found for package ${chalk.bold(pkgName)}`);
        return;
      }

      if (umdPath) {
        const umdIndex = path.resolve(pkgPath, umdPath);
        checks.umdExists = fse.existsSync(umdIndex);
        checks.isUMDValid =
          checks.umdExists && getModuleTypes(umdIndex).includes('cjs');
        verbose &&
          console.log(chalk.gray('UMD:'), checks.isUMDValid ? '✅' : '❌');
      }

      if (esmPath) {
        const esmIndex = path.resolve(pkgPath, esmPath);
        checks.esmExists = fse.existsSync(esmIndex);
        checks.isESMValid =
          checks.esmExists && getModuleTypes(esmIndex).includes('esm');
        verbose &&
          console.log(chalk.gray('ESM:'), checks.isESMValid ? '✅' : '❌');
      }

      if (typesPath) {
        const tsIndex = path.resolve(pkgPath, typesPath);
        checks.tsExists = fse.existsSync(tsIndex);
        verbose &&
          console.log(chalk.gray('Types:'), checks.tsExists ? '✅' : '❌');
      }

      if (!Object.values(checks).every(Boolean)) {
        const errorMsg: Array<string> = [
          chalk.red.bold(`Error in package \`${pkgName}\`:`),
        ];

        if (!checks.umdExists) {
          errorMsg.push(chalk.red(umdPath, 'not found'));
        }

        if (!checks.esmExists) {
          errorMsg.push(chalk.red(esmPath, 'not found'));
        }

        if (!checks.tsExists) {
          errorMsg.push(chalk.red('Typescript build not found'));
        }

        if (!checks.isUMDValid) {
          errorMsg.push(
            chalk.red(`UMD module not valid`),
            chalk.gray(`(${umdPath})`),
          );
        }

        if (!checks.isESMValid) {
          errorMsg.push(
            chalk.red(`ESM module not valid`),
            chalk.gray(`(${esmPath})`),
          );
        }

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
