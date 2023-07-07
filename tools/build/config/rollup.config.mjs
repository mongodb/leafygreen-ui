import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import urlPlugin from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { nodeExternals } from 'rollup-plugin-node-externals';

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
  if (allDependencies['@leafygreen-ui/icon']) {
    const glyphsDir = path.resolve(process.cwd(), '../icon/src/glyphs');

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
const globals = {
  clipboard: 'ClipboardJS',
  'highlightjs-graphql': 'hljsDefineGraphQL',
  polished: 'polished',
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  lodash: '_',
  ...lgGlobals,
  ...iconGlobals,
  /**
   * External dependencies that must be loaded by a module loader
   *   - lodash/*
   *   - highlight.js
   *   - create-emotion
   *   - create-emotion-server
   *   - react-transition-group
   **/
};

const external = [
  '@emotion/server',
  '@emotion/css',
  '@emotion/css/create-instance',
  '@emotion/server/create-instance',
  '@faker-js/faker',
  '@testing-library/react',
  '@storybook/testing-library',
  'clipboard',
  'focus-trap-react',
  'highlight.js',
  'highlightjs-graphql',
  'lodash',
  'polished',
  'prop-types',
  'react',
  'react-dom',
  'react-is',
  'react-keyed-flatten-children',
  'react-lottie-player',
  'react-transition-group',
  /^lodash\//,
  /^highlight\.js\//,
  /^@leafygreen-ui\//,
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
    nodeExternals({ deps: true }),
    resolve({ extensions }),

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
