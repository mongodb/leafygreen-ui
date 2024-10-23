import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  esmConfig,
  umdConfig,
  {
    ...esmConfig,
    input: ['./src/renderHookServer.tsx', './src/renderHookServerV17.tsx'],
    output: {
      // cjs is fully supported in node.js
      format: 'cjs', // overrides esm format from esmConfig.output
      entryFileNames: '[name].js',
      dir: 'dist',
      preserveModules: true,
      exports: 'auto',
    },
  },
];
