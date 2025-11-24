import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import svgr from '@svgr/rollup';
import { glob } from 'glob';
import path from 'path';
import { nodeExternals } from 'rollup-plugin-node-externals';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import { getUMDGlobals } from './utils/getUMDGlobals.mjs';
import { defaultsDeep } from 'lodash-es';

const extensions = ['.ts', '.tsx'];
const testUtilsFilename = 'src/testing/index.ts';
const storyGlob = 'src/*.stor{y,ies}.tsx';

const babelConfigPath = fileURLToPath(
  new URL('babel.config.js', import.meta.url),
);

// Read `name` from the current package's package.json
const { name } = createRequire(import.meta.url)(
  path.resolve(process.cwd(), 'package.json'),
);

const external = [/node_modules/];

const moduleFormatToDirectory = {
  esm: 'dist/esm',
  umd: 'dist/umd',
};

const doTestUtilsExist = glob.sync(testUtilsFilename).length > 0;

/**
 * @param {{ format: import('rollup').OutputOptions['format'], useTerser?: boolean, outputNameSuffix?: string }} options
 * @returns {import('rollup').OutputOptions}
 */
const createOutput = ({ format, useTerser = false, outputNameSuffix = '' }) => {
  return {
    dir: moduleFormatToDirectory[format],
    name,
    format,
    sourcemap: true,
    globals: format === 'umd' ? getUMDGlobals() : {},
    validate: true,
    interop: 'compat', // https://rollupjs.org/configuration-options/#output-interop
    entryFileNames: `[name]${outputNameSuffix}.js`,
    plugins: useTerser ? [terser()] : [],
  };
};

/**
 * @param {import('rollup').OutputOptions} output
 * @param {Partial<import('rollup').RollupOptions>} [overrides]
 * @returns {import('rollup').RollupOptions}
 */
const createConfigForFormat = (output, overrides = {}) => {
  /** @type {import('@rollup/plugin-babel').RollupBabelInputPluginOptions} */
  const babelOptions = {
    babelrc: false,
    babelHelpers: 'bundled',
    extensions,
    configFile: babelConfigPath,
    sourceMaps: true,
    envName: 'production',
  };

  /** @type {import('rollup').RollupOptions} */
  const formatConfig = {
    input: ['src/index.ts'],
    output,
    plugins: [
      nodePolyfills(),
      nodeExternals({ deps: true }),
      nodeResolve({ extensions }),
      babel(babelOptions),
      svgr(),
    ],
    external,
    strictDeprecations: true,
    treeshake: {
      preset: 'recommended',
      moduleSideEffects: false,
    },
  };

  const finalConfig = defaultsDeep({}, overrides, formatConfig);
  return finalConfig;
};

const esmConfig = createConfigForFormat(
  createOutput({ format: 'esm', useTerser: true }),
);
const umdConfig = createConfigForFormat(
  createOutput({ format: 'umd', useTerser: true }),
);

const defaultConfig = [esmConfig, umdConfig];

// configurations for modern dev/prod bundle publishing
// to be used by packages that are included in the experiment
const modernDevProdConfig = createConfigForFormat([
  createOutput({ format: 'esm' }),
  createOutput({ format: 'umd' }),
  createOutput({
    format: 'esm',
    useTerser: true,
    outputNameSuffix: '-min',
  }),
  createOutput({
    format: 'umd',
    useTerser: true,
    outputNameSuffix: '-min',
  }),
]);

// Add additional entry point to UMD build for test-utils if they exist
doTestUtilsExist &&
  defaultConfig.push(
    createConfigForFormat('esm', {
      input: testUtilsFilename,
      output: {
        dir: `${moduleFormatToDirectory['esm']}/testing`,
      },
    }),
    createConfigForFormat('umd', {
      input: testUtilsFilename,
      output: {
        dir: `${moduleFormatToDirectory['umd']}/testing`,
      },
    }),
  );

// FIXME: Figure out a way to get rid of this.
// Creates a super-hacky `stories` bundle
const storiesExist = glob.sync(storyGlob).length > 0;

/** @type {import('rollup').RollupOptions} */
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

storiesExist && defaultConfig.push(storiesConfig);

export { modernDevProdConfig, esmConfig, storiesConfig, umdConfig };

export default defaultConfig;
