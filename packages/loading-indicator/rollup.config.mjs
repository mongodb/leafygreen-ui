import {
  esmConfig,
  umdConfig,
  storiesConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

const esmSpinnerConfig = {
  ...esmConfig,
  input: 'src/Spinner/index.ts',
  output: {
    ...esmConfig.output,
    dir: 'dist/esm/spinner',
  },
};
const umdSpinnerConfig = {
  ...umdConfig,
  input: 'src/Spinner/index.ts',
  output: {
    ...umdConfig.output,
    dir: 'dist/esm/spinner',
  },
};

const esmPageLoaderConfig = {
  ...esmConfig,
  input: 'src/PageLoader/index.ts',
  output: {
    ...esmConfig.output,
    dir: 'dist/esm/page-loader',
  },
};
const umdPageLoaderConfig = {
  ...umdConfig,
  input: 'src/PageLoader/index.ts',
  output: {
    ...umdConfig.output,
    dir: 'dist/esm/page-loader',
  },
};

const esmTestUtilsConfig = {
  ...esmConfig,
  input: 'src/testing/index.ts',
  output: {
    ...esmConfig.output,
    dir: 'dist/esm/testing',
  },
};
const umdTestUtilsConfig = {
  ...umdConfig,
  input: 'src/testing/index.ts',
  output: {
    ...umdConfig.output,
    dir: 'dist/umd/testing',
  },
};

export default [
  esmConfig,
  umdConfig,
  esmSpinnerConfig,
  umdSpinnerConfig,
  esmPageLoaderConfig,
  umdPageLoaderConfig,
  esmTestUtilsConfig,
  umdTestUtilsConfig,
  storiesConfig,
];
