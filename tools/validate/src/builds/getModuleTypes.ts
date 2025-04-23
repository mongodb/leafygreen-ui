import fse from 'fs-extra';
import vm from 'vm';

import { ModuleType } from './modules.types';

/**
 * Adapted from https://github.com/formatjs/js-module-formats
 *
 * Analyze JavaScript source, collecting the module or modules information when possible.
 * @method extract
 * @default
 * @param {string} path The JavaScript source path to be analyzed
 * @return {object|array} an object or a collection of object with the info gathered from the analysis, it usually includes objects with `type` and `name` per module.
 **/
export function getModuleTypes(path: string): Array<ModuleType> {
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
  } catch (_e) {
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
