import { umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  {
    ...umdConfig,
    input: 'src/link.ts',
  },
  {
    ...umdConfig,
    input: 'src/unlink.ts',
  },
];
