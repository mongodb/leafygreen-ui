import { esmConfig, umdConfig } from './config/rollup.config.mjs';

const cli = {
  ...umdConfig,
  input: ['./src/cli.ts'],
};

export default [esmConfig, umdConfig, cli];
