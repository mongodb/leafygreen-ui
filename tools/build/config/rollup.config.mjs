import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import urlPlugin from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { nodeExternals } from 'rollup-plugin-node-externals';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const require = createRequire(import.meta.url);

const storyGlob = 'src/*.stor{y,ies}.tsx';

const extensions = ['.ts', '.tsx'];

const {
  name,
  dependencies,
  devDependencies,
  peerDependencies,
} = require(path.resolve(process.cwd(), 'package.json'));

const babelConfigPath = fileURLToPath(
  new URL('babel.config.js', import.meta.url),
);

const allDependencies = {
  ...dependencies,
  ...devDependencies,
  ...peerDependencies,
};

/**
 *
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
  'prop-types': 'PropTypes',
  lodash: '_',
  ...lgGlobals,
  ...iconGlobals,
};

const globals = id => {
  if (globalsMap[id]) return globalsMap[id];
  if (/lodash/.test(id)) return id.replace(/lodash/, '');
  if (/highlight\.js\/lib\/languages/.test(id)) {
    return id.replace(/highlight\.js\/lib\/languages/, '');
  }
};

const external = [
  '@faker-js/faker',
  '@testing-library/react',
  'chalk',
  'clipboard',
  'cross-spawn',
  'focus-trap-react',
  'fs-extra',
  'highlightjs-graphql',
  'polished',
  'prop-types',
  'typescript',
  /^@emotion\//,
  /^@leafygreen-ui\//,
  /^@lg-tools\//,
  /^@storybook\//,
  /^highlight/,
  /^lodash\//,
  /^react/,
];

const moduleFormatToDirectory = {
  esm: 'dist/esm/',
  umd: 'dist',
};

const configForFormat = format => ({
  input: 'src/index.ts',
  output: {
    dir: moduleFormatToDirectory[format],
    name,
    format,
    sourcemap: true,
    globals,
    interop: 'compat', // https://rollupjs.org/configuration-options/#output-interop
  },
  plugins: [
    nodePolyfills(),
    nodeExternals({ deps: true }),
    nodeResolve({ extensions }),

    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      extensions,
      configFile: babelConfigPath,
      sourceMaps: 'inline',
      envName: 'production',
    }),

    urlPlugin({
      limit: 50000,
      include: ['**/*.png'],
    }),

    urlPlugin({
      limit: 0,
      include: ['**/*.less'],
      fileName: '[name][extname]',
    }),

    svgr(),

    terser(),
  ],
  external,
  strictDeprecations: true,
});

const esmConfig = configForFormat('esm');
const umdConfig = configForFormat('umd');

const storiesExist = glob.sync(storyGlob).length > 0;
const storiesConfig = {
  ...esmConfig,
  input: glob.sync(storyGlob)[0],
  output: {
    format: 'esm',
    file: 'stories.js',
    sourcemap: false,
    globals: esmConfig.output.globals,
  },
};

const defaultConfig = [esmConfig, umdConfig];
storiesExist && defaultConfig.push(storiesConfig);

export { esmConfig, storiesConfig, umdConfig };

export default defaultConfig;
