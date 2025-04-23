import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

export default [
  esmConfig,
  umdConfig,
  // Build `renderHookServer` and `renderHookServerV17` for both ESM and UMD
  ...[esmConfig, umdConfig].flatMap(config =>
    ['./src/renderHookServer.tsx', './src/renderHookServerV17.tsx'].map(
      input => ({
        ...config,
        input,
        output: {
          ...config.output,
          preserveModules: true,
          exports: 'auto',
        },
      }),
    ),
  ),
];
