import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import urlPlugin from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.ts', '.tsx'];

const { name } = require(path.resolve(process.cwd(), 'package.json'));

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);

  return dirList
    .map(subDir => `${path.resolve(dir, subDir)}/package.json`)
    .filter(packageJsonPath => fs.existsSync(packageJsonPath))
    .map(packageJsonPath => require(packageJsonPath).name);
}

function getLodashExternals() {
  return fs
    .readdirSync(path.resolve(__dirname, 'node_modules', 'lodash'))
    .filter(fileName => {
      const splitName = fileName.split('.');
      const extension = splitName[splitName.length - 1];

      return extension === 'js';
    })
    .map(fileName => 'lodash/' + fileName.split('.')[0]);
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

function getGeneratedFiles() {
  const directory = path.resolve(process.cwd(), 'src/generated');

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter(file => /\.tsx?$/.test(file))
    .map(file => path.resolve(directory, file));
}

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

const allPackages = getAllPackages(path.resolve(__dirname, 'packages'));
const directGlyphImports = getDirectGlyphImports();

allPackages.forEach(packageName => {
  globals[packageName] = packageName;
});

directGlyphImports.forEach(glyphImport => {
  // e.g. "@leafygreen-ui/icon/dist/Checkmark" -> "Checkmark"
  globals[glyphImport] = /[^/]+$/.exec(glyphImport)[0];
});

const moduleFormatToDirectory = {
  esm: 'dist/esm/',
  umd: 'dist',
};

const baseConfigForFormat = format => ({
  input: 'src/index.ts',
  output: {
    dir: moduleFormatToDirectory[format],
    name,
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
      'react-transition-group',
      ...getLodashExternals(),
      ...allPackages,
      ...directGlyphImports,
    ].includes(id) ||
    // We test if an import includes lodash to avoid having
    // to whitelist every nested lodash module individually
    /^lodash\//.test(id) ||
    /^highlight\.js\//.test(id),
});

const config = ['esm', 'umd'].flatMap(format => {
  const baseConfig = baseConfigForFormat(format);

  const iconsConfig = getGeneratedFiles().map(input => ({
    ...baseConfig,
    input: `src/generated/${path.basename(input)}`,
    output: {
      ...baseConfig.output,
      name: `${path.basename(input, path.extname(input))}.js`,
    },
  }));

  const config = [baseConfig, ...iconsConfig];
  const storyGlob = 'src/*.stor{y,ies}.tsx';

  if (format === 'esm' && glob.sync(storyGlob).length > 0) {
    // Story config
    config.push({
      ...baseConfig,
      input: glob.sync(storyGlob)[0],
      output: {
        format,
        file: 'stories.js',
        sourcemap: false,
        globals: baseConfig.output.globals,
      },
    });
  }

  return config;
});

export default config;
