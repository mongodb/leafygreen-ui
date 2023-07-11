import { umdConfig } from './config/rollup.config.mjs';

const config = {
  ...umdConfig,
  input: 'src/tsdoc/tsdoc.ts',
};

export default config;
