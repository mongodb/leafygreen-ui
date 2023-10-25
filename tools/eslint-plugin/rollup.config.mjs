import { umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const config = {
  ...umdConfig,
  external: [...umdConfig.external, /^@typescript-eslint\//],
};

export default [config];
