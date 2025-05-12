import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  esmConfig,
  umdConfig,
  ...['./src/renderHookServer.tsx', './src/renderHookServerV17.tsx'].map(
    input => ({
      ...umdConfig,
      input,
    }),
  ),
];
