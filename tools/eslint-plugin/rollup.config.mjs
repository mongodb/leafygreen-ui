import { umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const config = {
  ...umdConfig,
  external: ['jsx-ast-utils', ...umdConfig.external],
};

export default [config];
