import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  esmConfig,
  umdConfig,
  {
    ...esmConfig,
    input: './src/main/index.ts',
    output: {
      ...esmConfig.output,
      dir: null,
      file: 'dist/esm/main.js',
    },
  },
  {
    ...umdConfig,
    input: './src/main/index.ts',
    output: {
      ...umdConfig.output,
      dir: null,
      file: 'dist/umd/main.js',
    },
  },
  {
    ...esmConfig,
    input: './src/manager/index.ts',
    output: {
      ...esmConfig.output,
      dir: null,
      file: 'dist/esm/manager.js',
    },
  },
  {
    ...umdConfig,
    input: './src/manager/index.ts',
    output: {
      ...umdConfig.output,
      dir: null,
      file: 'dist/umd/manager.js',
    },
  },
  {
    ...esmConfig,
    input: './src/preview/index.ts',
    output: {
      ...esmConfig.output,
      dir: null,
      file: 'dist/esm/preview.js',
    },
  },
  {
    ...umdConfig,
    input: './src/preview/index.ts',
    output: {
      ...umdConfig.output,
      dir: null,
      file: 'dist/umd/preview.js',
    },
  },
];
