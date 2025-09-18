import fs from 'fs';
import path from 'path';

import { getDirectGlyphImports } from './getDirectGlyphImports.mjs';
import { constructUMDGlobalName } from './constructUMDGlobalName.mjs';

export function getUMDGlobals() {
  // Read from the current package's package.json
  // to get the package name and dependencies
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
  } = JSON.parse(packageJsonContent);

  const allDependencies = {
    ...dependencies,
    ...devDependencies,
    ...peerDependencies,
  };

  const lgGlobals = Object.entries(allDependencies).reduce(
    (acc, [pkg, version]) => {
      // Only include packages in this monorepo
      if (version.includes('workspace:')) {
        acc[pkg] = constructUMDGlobalName(pkg);
      }
      return acc;
    },
    {},
  );

  const iconGlobals = getDirectGlyphImports(allDependencies).reduce(
    (acc, glyph) => {
      const iconName = /[^/]+$/.exec(glyph)[0]; // Get the part after the last slash
      acc[glyph] = constructUMDGlobalName('icon', iconName);
      return acc;
    },
    {},
  );

  // Mapping of packages to the `window` property they'd be
  // bound to if used in the browser without a module loader.
  // This is defined on a best effort basis since not all
  // modules are compatible with being loaded directly.
  const globalsMap = {
    clipboard: 'ClipboardJS',
    'cross-spawn': 'crossSpawn',
    '@emotion/server/create-instance': 'createEmotionServer',
    '@emotion/css/create-instance': 'createEmotion',
    'highlight.js/lib/core': 'hljs',
    'highlightjs-graphql': 'hljsDefineGraphQL',
    'fs-extra': 'fse',
    polished: 'polished',
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_',
    ...lgGlobals,
    ...iconGlobals,
  };

  /**
   * Returns a function that specifies {`id`: `variableName`} pairs
   * necessary for external imports in umd/iife bundles
   *
   * See https://rollupjs.org/configuration-options/#output-globals
   */
  function globals(id) {
    if (globalsMap[id]) return globalsMap[id];
    if (/lodash/.test(id)) return id.replace(/lodash/, '');

    if (/highlight\.js\/lib\/languages/.test(id)) {
      return id.replace(/highlight\.js\/lib\/languages/, '');
    }
  }

  return globals;
}
