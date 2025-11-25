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
const testBundleGlob = 'src/testing/index.ts';
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

/**
 * @param {{ format: import('rollup').OutputOptions['format'], useTerser?: boolean, outputFile?: string, outputName?: string, outputDir?: string }} options
 * @returns {import('rollup').OutputOptions}
 */
const createOutput = ({
  format,
  useTerser = false,
  outputFile = undefined,
  outputName = '[name].js',
  outputDir = moduleFormatToDirectory[format],
}) => {
  return {
    dir: outputDir,
    file: outputFile,
    name,
    format,
    sourcemap: true,
    globals: format === 'umd' ? getUMDGlobals() : {},
    validate: true,
    interop: 'compat', // https://rollupjs.org/configuration-options/#output-interop
    entryFileNames: outputName,
    plugins: useTerser ? [terser()] : [],
  };
};

/**
 * @param {import('rollup').RollupOptions['output']} output
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

// 1. Create the default esm/umd bundles configs
const esmConfig = createConfigForFormat(
  createOutput({ format: 'esm', useTerser: true }),
);
const umdConfig = createConfigForFormat(
  createOutput({ format: 'umd', useTerser: true }),
);

const defaultConfig = [esmConfig, umdConfig];

// 1.1. Create the modern dev/prod bundle configs
const modernDevProdConfig = createConfigForFormat([
  createOutput({ format: 'esm' }),
  createOutput({ format: 'umd' }),
  createOutput({
    format: 'esm',
    useTerser: true,
    outputName: '[name]-min.js',
  }),
  createOutput({
    format: 'umd',
    useTerser: true,
    outputName: '[name]-min.js',
  }),
]);

// 2. Create testing bundles (if applicable)
const testingBundleEntryPoints = glob.sync(testBundleGlob);

if (testingBundleEntryPoints.length > 0) {
  defaultConfig.push(
    createConfigForFormat(
      createOutput({
        format: 'esm',
        useTerser: true,
        outputDir: `${moduleFormatToDirectory['esm']}/testing`,
      }),
      {
        input: testingBundleEntryPoints,
      },
    ),
    createConfigForFormat(
      createOutput({
        format: 'umd',
        useTerser: true,
        outputDir: `${moduleFormatToDirectory['umd']}/testing`,
      }),
      {
        input: testingBundleEntryPoints,
      },
    ),
  );
}

// 3. Create stories bundles (if applicable)

const storiesEntryPoints = glob.sync(storyGlob);

// FIXME: Figure out a way to get rid of this.
// Creates a super-hacky `stories` bundle
const storiesConfig = createConfigForFormat(
  {
    ...createOutput({
      format: 'esm',
      useTerser: true,
      outputDir: null,
      outputFile: 'stories.js',
    }),
    sourcemap: false,
  },
  {
    input: storiesEntryPoints[0],
  },
);

if (storiesEntryPoints.length > 0) {
  defaultConfig.push(storiesConfig);
}

export { modernDevProdConfig, esmConfig, storiesConfig, umdConfig };

export default defaultConfig;
