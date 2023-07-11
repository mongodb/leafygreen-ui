import { umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  {
    ...umdConfig,
    input: 'src/builds.ts',
  },
  {
    ...umdConfig,
    input: 'src/deps.ts',
  },
];
