import {
  esmConfig,
  umdConfig,
  storiesConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

const esmConstantsConfig = {
  ...esmConfig,
  input: 'src/constants.ts',
};
const umdConstantsConfig = {
  ...umdConfig,
  input: 'src/constants.ts',
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
  esmConstantsConfig,
  umdConstantsConfig,
  esmTestUtilsConfig,
  umdTestUtilsConfig,
  storiesConfig,
];
