import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const cli = {
  ...umdConfig,
  input: ['./src/cli.ts'],
};

export default [esmConfig, umdConfig, cli];
