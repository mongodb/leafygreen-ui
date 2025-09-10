import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  esmConfig,
  umdConfig,
  ...[
    './src/ReactTestingLibrary/renderHookServer/renderHookServer18.tsx',
    './src/ReactTestingLibrary/renderHookServer/renderHookServer17.tsx',
  ].map(input => ({
    ...umdConfig,
    input,
  })),
];
