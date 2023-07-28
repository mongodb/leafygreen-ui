/**
 * Runs checks to ensure all modules have the appropriate exports
 */

/* eslint-disable no-console */
import { getAllPackages, getPackageName } from '@lg-tools/meta';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';
import vm from 'vm';

import { ValidateCommandOptions } from '../validate.types';

import { ModuleType } from './modules.types';

// A list of
const ignorePackages = ['@lg-tools/storybook'];

/**
 * Validates `umd`, `esm` and TS build integrity for all packages in the repository.
 */
export const validateBuilds = ({
  verbose,
}: Partial<ValidateCommandOptions>) => {
  const packagePaths = getAllPackages();

  return new Promise<void>((resolve, reject) => {
    console.log(`Validating builds for ${packagePaths.length} packages...`);

    // Check that every package's /dist folder has a valid UMD, ESM & TS files
    for (const pkgPath of packagePaths) {
      const pkgName = getPackageName(pkgPath);

      if (!pkgName) {
        exit1('Invalid package path: ' + pkgPath);
        return;
      }

      // Skip packages
      if (ignorePackages.includes(pkgName)) {
        continue;
      }

      const distDir = path.resolve(pkgPath, 'dist');
      const buildExists = fse.existsSync(distDir);

      if (!buildExists) {
        exit1(`No build found for package ${chalk.bold(pkgName)}`);
        return;
      }

      const umdPath = path.resolve(distDir, `index.js`);
      const esmPath = path.resolve(distDir, `esm/index.js`);
      const tsPath = path.resolve(distDir, `index.d.ts`);

      const umdExists = fse.existsSync(umdPath);
      const esmExists = fse.existsSync(esmPath);
      const tsExists = fse.existsSync(tsPath);
      const isCJSValid = getModuleTypes(umdPath).includes('cjs');
      const isESMValid = getModuleTypes(esmPath).includes('esm');

      verbose &&
        console.log({
          pkgName,
          umdExists,
          esmExists,
          tsExists,
          isCJSValid,
          isESMValid,
        });

      if (
        ![umdExists, esmExists, tsExists, isCJSValid, isESMValid].every(
          x => x == true,
        )
      ) {
        const errorMsg: Array<string> = [
          chalk.red.bold(`Error in \`${pkgName}\` build:`),
        ];
        if (!umdExists) errorMsg.push(chalk.red('`dist/index.js` not found'));
        if (!esmExists)
          errorMsg.push(chalk.red('`dist/esm/index.js` not found'));
        if (!tsExists) errorMsg.push(chalk.red('Typescript build not found'));
        if (!isCJSValid)
          errorMsg.push(
            chalk.red(`UMD module not valid`),
            chalk.gray(`(${umdPath})`),
          );
        if (!isESMValid)
          errorMsg.push(
            chalk.red(`ESM module not valid`),
            chalk.gray(`(${esmPath})`),
          );

        if (errorMsg.length > 0) {
          exit1('Error in builds' + errorMsg.join(' '));
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

/**
 * Adapted from https://github.com/formatjs/js-module-formats
 *
 * Analyze JavaScript source, collecting the module or modules information when possible.
 * @method extract
 * @default
 * @param {string} path The JavaScript source path to be analyzed
 * @return {object|array} an object or a collection of object with the info gathered from the analysis, it usually includes objects with `type` and `name` per module.
 **/
function getModuleTypes(path: string): Array<ModuleType> {
  // Essentially we're looking for import/export statements
  const ES6ImportExportRegExp =
    /(?:^\s*|[}{();,\n]\s*)(import\s*['"][a-zA-Z]+['"]|(import|module)\s*[^"'()\n;]+\s*from\s*['"]|export\s*((\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF])[\s_$a-zA-Z0-9\xA0-\uFFFF]*))/;
  const ES6AliasRegExp =
    /(?:^\s*|[}{();,\n]\s*)(export\s*\*\s*from\s*(?:'([^']+)'|"([^"]+)"))/;
  const context = vm.createContext({});
  const mods: Array<ModuleType> = [];

  /**
   * YUI detection is based on a simple rule:
   * - if `YUI.add()` is called
   **/
  context.YUI = {
    add: function () {
      mods.push(ModuleType.yui);
    },
  };

  /**
  AMD detection is based on a simple rule:
  - if `define()` is called
  **/
  context.define = function () {
    mods.push(ModuleType.amd);
  };

  /**
  Steal detection is based on a simple rule:
  - if `steal()` is called
  **/
  context.steal = function () {
    mods.push(ModuleType.steal);
  };

  /**
  CommonJS detection is based on simple rules:
  -    if the script calls `require()`
  - or if the script tries to export a function thru `module.exports`
  - or if the script tries to export an object thru `module.exports`
  - or if the script tries to export a function thru `exports`
  - or if the script tries to export an object thru `exports`
  - or if the script tries to add a new member to `module.exports`
  **/
  context.require = function () {
    mods.push(ModuleType.cjs);
    throw new Error('Confirmed CJS Package. Stop Execution');
  };
  context.exports = Object.create(null);
  context.module = context;

  const src = fse.readFileSync(path, 'utf-8');

  // executing the JavaScript source into a new context to avoid leaking
  // globals during the detection process.
  try {
    vm.runInContext(src, context);
  } catch (e) {
    if (ES6ImportExportRegExp.test(src) || ES6AliasRegExp.test(src)) {
      mods.push(ModuleType.esm);
    }
  } finally {
    // very dummy detection process for CommonJS modules
    if (
      typeof context.exports === 'function' ||
      typeof context.exports === 'string' ||
      typeof context.exports === 'number' ||
      Object.keys(context.exports).length > 0 ||
      Object.getPrototypeOf(context.exports)
    ) {
      mods.push(ModuleType.cjs);
    }
  }

  return mods;
}
