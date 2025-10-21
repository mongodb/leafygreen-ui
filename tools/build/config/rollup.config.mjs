import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import svgr from '@svgr/rollup';
import { glob } from 'glob';
import path from 'path';
import { nodeExternals } from 'rollup-plugin-node-externals';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import {
  createConfigForFormat,
  getUMDGlobals,
  moduleFormatToDirectory,
  storyGlob,
  testUtilsFilename,
} from './utils/index.mjs';
import { defaultsDeep } from 'lodash-es';

const esmConfig = createConfigForFormat('esm');
const umdConfig = createConfigForFormat('umd');
const esmTestingConfig = createConfigForFormat('esm', {
  input: testUtilsFilename,
  output: {
    dir: `${moduleFormatToDirectory['esm']}/testing`,
  },
});
const umdTestingConfig = createConfigForFormat('umd', {
  input: testUtilsFilename,
  output: {
    dir: `${moduleFormatToDirectory['umd']}/testing`,
  },
});
const storiesConfig = createConfigForFormat('esm', {
  input: glob.sync(storyGlob)[0],
  output: {
    file: 'stories.js',
    sourcemap: false,
  },
});

const defaultConfig = [esmConfig, umdConfig];

// Add additional entry point to UMD build for test-utils if they exist
const doTestUtilsExist = glob.sync(testUtilsFilename).length > 0;
doTestUtilsExist && defaultConfig.push(esmTestingConfig, umdTestingConfig);

// FIXME: Figure out a way to get rid of this.
// Creates a super-hacky `stories` bundle
const storiesExist = glob.sync(storyGlob).length > 0;
storiesExist && defaultConfig.push(storiesConfig);

export {
  esmConfig,
  esmTestingConfig,
  storiesConfig,
  umdTestingConfig,
  umdConfig,
};

export default defaultConfig;
