import { umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  {
    ...umdConfig,
    input: 'src/legacy-create.ts',
  },
];
