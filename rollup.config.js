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

const moduleFormatToSubExtension = {
  esm: '.esm',
  umd: '',
};

const config = Object.keys(moduleFormatToSubExtension).map(format => ({
  input: 'src/index.ts',
  output: {
    file: `dist/index${moduleFormatToSubExtension[format]}.js`,
    name: `dist/index${moduleFormatToSubExtension[format]}.js`,

    format,
    sourcemap: true,
    globals: {
      clipboard: 'ClipboardJS',
      'highlightjs-graphql': 'hljsDefineGraphQL',
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      '@leafygreen-ui/leafygreen-provider': 'LeafyGreenProvider',
    },
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
  external: [
    'clipboard',
    'highlightjs-graphql',
    'react',
    'react-dom',
    'emotion',
    'lodash',
    'lodash/debounce',
    'lodash/defaultsDeep',
    'lodash/findLast',
    'lodash/flatMap',
    'lodash/omit',
    'react-emotion',
    'create-emotion',
    'create-emotion-server',
    'polished',
    'prop-types',
    'react-transition-group',
    '@testing-library/react',
    ...getAllPackages('../../packages'),
    ...getDirectGlyphImports(),
  ],
}));

export default config;
