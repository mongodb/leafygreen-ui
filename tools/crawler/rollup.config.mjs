import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const cli = {
  ...umdConfig,
  input: ['./src/cli.ts'],
};

const lambda = {
  ...umdConfig,
  input: ['./src/lambda.ts'],
  external: [],
};

export default [esmConfig, umdConfig, cli, lambda];
