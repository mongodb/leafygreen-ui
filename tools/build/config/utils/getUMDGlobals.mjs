import path from 'path';

export function getUMDGlobals() {
  // Read from the current package's package.json
  // to get the package name and dependencies
  const { dependencies, devDependencies, peerDependencies } = import(
    path.resolve(process.cwd(), 'package.json'),
    { with: { type: 'json' } }
  );

  const allDependencies = {
    ...dependencies,
    ...devDependencies,
    ...peerDependencies,
  };

  const lgGlobals = Object.keys(allDependencies).reduce((acc, pkg) => {
    acc[pkg] = pkg;
    return acc;
  }, {});

  const iconGlobals = getDirectGlyphImports().reduce((acc, glyph) => {
    acc[glyph] = /[^/]+$/.exec(glyph)[0];
    return acc;
  }, {});

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

  /**
   * @returns An array of all glyph import paths
   */
  function getDirectGlyphImports() {
    const pkgHasIconDependency = allDependencies['@leafygreen-ui/icon'];
    const glyphsDir = path.resolve(process.cwd(), '../icon/src/glyphs');

    if (pkgHasIconDependency && fs.existsSync(glyphsDir)) {
      return fs
        .readdirSync(glyphsDir)
        .filter(path => /.svg/.test(path))
        .map(
          fileName =>
            `@leafygreen-ui/icon/dist/${path.basename(fileName, '.svg')}`,
        );
    }

    return [];
  }

  return globals;
}
