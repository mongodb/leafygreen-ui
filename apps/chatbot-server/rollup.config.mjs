import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const ingestUMDConfig = {
  ...umdConfig,
  input: './src/ingest/ingest.config.ts',
  output: {
    ...umdConfig.output,
    file: './dist/ingest.config.js',
  },
};

export default [esmConfig, umdConfig, ingestUMDConfig];
