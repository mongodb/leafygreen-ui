import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const ingestESMConfig = {
  ...esmConfig,
  input: './src/ingest/ingest.config.ts',
};

export default [esmConfig, umdConfig, ingestESMConfig];
