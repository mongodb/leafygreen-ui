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

export default [
  esmConfig,
  umdConfig,
  esmConstantsConfig,
  umdConstantsConfig,
  storiesConfig,
];
