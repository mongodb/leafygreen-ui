/**
 * Runs checks to ensure all modules have the appropriate exports
 */

/* eslint-disable no-console */
import chalk from 'chalk';
import { spawnSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import vm from 'vm';

import { getRelevantPackages } from './utils/getRelevantPackages';

const ModuleType = {
  esm: 'esm',
  umd: 'umd',
  cjs: 'cjs',
  yui: 'yui',
  amd: 'amd',
  steal: 'steal',
} as const;
type ModuleType = typeof ModuleType[keyof typeof ModuleType];

const cli = new Command('test')
  .description('Tests leafygreen-ui build integrity')
  .option(
    '--diff',
    'Builds packages that you have been working on, based on the current git diff',
    false,
  )
  .option(
    '--deps',
    'Builds packages that you have been working on, and their leafygreen-ui dependencies.',
    false,
  )
  .argument('[packages...]')
  .parse(process.argv);

const { diff, deps } = cli.opts();
const packages = getRelevantPackages(cli.args, { diff, deps });

// Check if each package is built. If not, build them
if (
  !packages.every(pkg =>
    fs.existsSync(path.resolve(__dirname, `../packages/${pkg}/dist`)),
  )
) {
  console.log('Builds not found. Building...');
  spawnSync('yarn', ['build', ...packages], { stdio: 'inherit' });
}

// Check that every package's /dist folder has a valid UMD, ESM & TS files
for (const pkg of packages) {
  const rootPath = path.resolve(__dirname, `../packages/${pkg}/dist/index.js`);
  const esmPath = path.resolve(
    __dirname,
    `../packages/${pkg}/dist/esm/index.js`,
  );
  const tsPath = path.resolve(__dirname, `../packages/${pkg}/dist/index.d.ts`);

  const rootExists = fs.existsSync(rootPath);
  const esmExists = fs.existsSync(esmPath);
  const tsExists = fs.existsSync(tsPath);
  const isCJSValid = getModuleTypes(rootPath).includes('cjs');
  const isESMValid = getModuleTypes(esmPath).includes('esm');

  if (
    ![rootExists, esmExists, tsExists, isCJSValid, isESMValid].every(
      x => x == true,
    )
  ) {
    const errorMsg: Array<string> = [
      chalk.red.bold(`Error in \`${pkg}\` build:`),
    ];
    if (!rootExists) errorMsg.push(chalk.red('`dist/index.js` not found'));
    if (!esmExists) errorMsg.push(chalk.red('`dist/esm/index.js` not found'));
    if (!tsExists) errorMsg.push(chalk.red('Typescript build not found'));
    if (!isCJSValid)
      errorMsg.push(
        chalk.red(`UMD module not valid`),
        chalk.gray(`(${rootPath})`),
      );
    if (!isESMValid)
      errorMsg.push(
        chalk.red(`ESM module not valid`),
        chalk.gray(`(${esmPath})`),
      );

    console.log(errorMsg.join(' '));
    process.exit(1);
  }
}

process.exit(0);

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

  const src = fs.readFileSync(path, 'utf-8');

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
