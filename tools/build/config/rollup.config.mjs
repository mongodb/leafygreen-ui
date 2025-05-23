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
  esm: 'dist/esm/',
  umd: 'dist/umd',
};

const doTestUtilsExist = glob.sync(testUtilsFilename).length > 0;

const createConfigForFormat = format => {
  const formatConfig = {
    input: ['src/index.ts'],
    output: {
      dir: moduleFormatToDirectory[format],
      name,
      format,
      sourcemap: true,
      globals: format === 'umd' ? getUMDGlobals() : {},
      validate: true,
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

      svgr(),

      terser(),
    ],
    external,
    strictDeprecations: true,
    treeshake: {
      preset: 'recommended',
      moduleSideEffects: false,
    },
  };

  // Add code-splitting for test utils to ESM build if they exist
  if (format === 'esm' && doTestUtilsExist) {
    formatConfig.input.push(testUtilsFilename);
  }

  return {
    ...formatConfig,
  };
};

const esmConfig = createConfigForFormat('esm');
const umdConfig = createConfigForFormat('umd');

const defaultConfig = [esmConfig, umdConfig];

// Add additional entry point to UMD build for test-utils if they exist
doTestUtilsExist &&
  defaultConfig.push({
    ...umdConfig,
    input: testUtilsFilename,
    output: {
      ...umdConfig.output,
      dir: 'dist/testing',
    },
  });

// FIXME: Figure out a way to get rid of this.
// Creates a super-hacky `stories` bundle
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

storiesExist && defaultConfig.push(storiesConfig);

export { esmConfig, storiesConfig, umdConfig };

export default defaultConfig;
