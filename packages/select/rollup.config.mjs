import {
  esmConfig,
  umdConfig,
  storiesConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

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
    dir: 'dist/testing',
  },
};

export default [
  esmConfig,
  umdConfig,
  esmTestUtilsConfig,
  umdTestUtilsConfig,
  storiesConfig,
];
