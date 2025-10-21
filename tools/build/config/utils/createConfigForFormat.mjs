import { createRequire } from 'node:module';
import path from 'path';
import { defaultsDeep } from 'lodash-es';

import { getUMDGlobals } from './getUMDGlobals.mjs';
import { getRollupPluginsArray } from './getRollupPluginsArray.mjs';

export const moduleFormatToDirectory = {
  esm: 'dist/esm',
  umd: 'dist/umd',
};

/**
 *
 * @param {'esm' | 'umd'} format
 * @param {*} overrides
 * @returns
 */
export const createConfigForFormat = (format, overrides) => {
  // Read `name` from the current package's package.json
  const { name } = createRequire(import.meta.url)(
    path.resolve(process.cwd(), 'package.json'),
  );

  const formatConfig = {
    input: ['src/index.ts'],
    output: {
      dir: moduleFormatToDirectory[format],
      name,
      format,
      sourcemap: true,
      globals: format === 'umd' ? getUMDGlobals() : {},
      validate: true,
      interop: 'compat', // https://rollupjs.org/configuration-options/#output-interop
    },
    plugins: getRollupPluginsArray(),
    external: [/node_modules/],
    strictDeprecations: true,
    treeshake: {
      preset: 'recommended',
      moduleSideEffects: false,
    },
  };

  const finalConfig = defaultsDeep({}, overrides, formatConfig);
  return finalConfig;
};
