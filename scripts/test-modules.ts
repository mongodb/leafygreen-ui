/**
 * Runs checks to ensure all modules have the appropriate exports
 */

/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { spawnSync } from 'child_process';
import { Command } from 'commander';
import chalk from 'chalk';
import { getAllPackageNames } from './utils/getAllPackageNames';

const ModuleType = {
  esm: 'esm',
  umd: 'umd',
  cjs: 'cjs',
  yui: 'yui',
  amd: 'amd',
  steal: 'steal'
} as const
type ModuleType = typeof ModuleType[keyof typeof ModuleType]

const cli = new Command('test')
  .description('Tests leafygreen-ui build integrity')
  .argument('[packages...]')
  .parse(process.argv);

const allPackages = getAllPackageNames();
const packages =
  cli.args.length > 0
    ? cli.args.filter((arg: string) => allPackages.includes(arg))
    : allPackages;

// Check if each package is built. If not, build them
if (
  !packages.every(pkg =>
    fs.existsSync(path.resolve(__dirname, `../packages/${pkg}/dist`)),
  )
) {
  console.log('Builds not found. Building...');
  spawnSync('yarn', ['build', ...packages]);
}

// Check that every package's /dist folder has a valid UMD, ESM & TS files
for (const pkg of packages) {
  const rootPath = path.resolve(__dirname, `../packages/${pkg}/dist/index.js`);
  const esmPath = path.resolve(__dirname, `../packages/${pkg}/dist/esm/index.js`);

  console.log(getModuleTypes(path.resolve(__dirname, `../packages/${pkg}/dist`)))

  const rootExists = fs.existsSync(rootPath)
  const esmExists = fs.existsSync(esmPath)
  const isCJS = getModuleTypes(rootPath) === 'cjs'
  const isESM = getModuleTypes(esmPath) === 'esm'

  console.log({
    pkg,
    rootExists,
    esmExists,
    isCJS,
    isESM
  });


  if (![ rootExists, esmExists, isCJS, isESM].every(x => x == true)) {
    const errorMsg: Array<string> = [chalk.red.bold(`Error in \`${pkg}\`:`)]
    if (!rootExists) errorMsg.push(chalk.red('`dist/index.js` not found'))
    if (!esmExists) errorMsg.push(chalk.red('`dist/esm/index.js` not found'))
    if (!isCJS) errorMsg.push(chalk.red(`UMD module not valid`), chalk.gray(`(${rootPath})`))
    if (!isESM) errorMsg.push(chalk.red(`ESM module not valid`), chalk.gray(`(${esmPath})`))

    console.log(errorMsg.join(' '))
    process.exit(1)
  }
}

process.exit(0)

/**
 * Adapted from https://github.com/formatjs/js-module-formats
 *
 * Analyze JavaScript source, collecting the module or modules information when possible.
 * @method extract
 * @default
 * @param {string} path The JavaScript source path to be analyzed
 * @return {object|array} an object or a collection of object with the info gathered from the analysis, it usually includes objects with `type` and `name` per module.
 **/
function getModuleTypes(path: string): ModuleType | Array<ModuleType> | undefined {
  // Essentially we're looking for import/export statements
  const ES6ImportExportRegExp = /(?:^\s*|[}{();,\n]\s*)(import\s*['"][a-zA-Z]+['"]|(import|module)\s*[^"'()\n;]+\s*from\s*['"]|export\s+(\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))/;
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
    mods.push(ModuleType.amd)
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
    throw new Error("CJS Package. Stop Execution");
  };
  context.exports = Object.create(null);
  context.module = context;

  const src = fs.readFileSync(path, 'utf-8')

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

  // returning an array when more than one module is defined in the source
  return mods.length > 1 ? mods : mods[0];
}
