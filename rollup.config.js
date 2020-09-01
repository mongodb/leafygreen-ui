import fs from 'fs';
import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';
import urlPlugin from '@rollup/plugin-url';

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);

  return dirList
    .map(subDir => `${path.resolve(dir, subDir)}/package.json`)
    .filter(packageJsonPath => fs.existsSync(packageJsonPath))
    .map(packageJsonPath => require(packageJsonPath).name);
}

function getDirectGlyphImports() {
  const glyphsDir = path.resolve(__dirname, './packages/icon/src/glyphs');

  return fs
    .readdirSync(glyphsDir)
    .filter(path => /.svg/.test(path))
    .map(
      fileName => `@leafygreen-ui/icon/dist/${path.basename(fileName, '.svg')}`,
    );
}

const extensions = ['.ts', '.tsx'];

const { name } = require(path.resolve(process.cwd(), 'package.json'));

const allPackages = getAllPackages('../../packages');
const directGlyphImports = getDirectGlyphImports();

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
  /**
   * External dependencies that must be loaded by a module loader
   *   - lodash/*
   *   - highlight.js
   *   - create-emotion
   *   - create-emotion-server
   *   - react-transition-group
   **/
};

allPackages.forEach(packageName => {
  globals[packageName] = packageName;
});

directGlyphImports.forEach(glyphImport => {
  // e.g. "@leafygreen-ui/icon/dist/Checkmark" -> "Checkmark"
  globals[glyphImport] = /[^/]+$/.exec(glyphImport)[0];
});

const config = ['esm', 'umd'].map(format => ({
  input: 'src/index.ts',
  output: {
    dir: `dist/${format}`,
    name,
    // exports: 'named',

    format,
    sourcemap: true,
    globals,
  },
  plugins: [
    resolve({ extensions }),

    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      extensions,
      configFile: path.resolve(__dirname, 'babel.config.js'),
      sourceMaps: 'inline',
      envName: 'production',
    }),

    commonjs({
      include: /node_modules/,
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
  external: id =>
    [
      'clipboard',
      'highlight.js',
      'highlightjs-graphql',
      'react',
      'react-dom',
      'emotion',
      'lodash',
      'create-emotion',
      'create-emotion-server',
      'polished',
      'prop-types',
      'react-transition-group',
      '@testing-library/react',
      ...allPackages,
      ...directGlyphImports,
    ].includes(id) ||
    // We test if an import includes lodash to avoid having
    // to whitelist every nested lodash module individually
    /^lodash\//.test(id) ||
    /^highlight\.js\//.test(id),
}));

export default config;
