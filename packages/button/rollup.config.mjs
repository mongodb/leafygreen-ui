import {
  esmConfig,
  umdConfig,
  storiesConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

const esmConstantsConfig = {
  ...esmConfig,
  input: 'src/constants.ts',
  output: {
    ...esmConfig.output,
    dir: 'dist/esm/constants',
  },
};
const umdConstantsConfig = {
  ...umdConfig,
  input: 'src/constants.ts',
  output: {
    ...umdConfig.output,
    dir: 'dist/umd/constants',
  },
};

export default [
  esmConfig,
  umdConfig,
  esmConstantsConfig,
  umdConstantsConfig,
  storiesConfig,
];
