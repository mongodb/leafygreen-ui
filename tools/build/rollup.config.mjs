import { umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const config = {
  ...umdConfig,
  input: 'src/tsdoc/tsdoc.ts',
};

export default config;
