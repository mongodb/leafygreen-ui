import { fileURLToPath } from 'node:url';

import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import svgr from '@svgr/rollup';
import { glob } from 'glob';
import path from 'path';
import { nodeExternals } from 'rollup-plugin-node-externals';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import { extensions } from './constants.mjs';

export const getRollupPluginsArray = () => {
  const babelConfigPath = fileURLToPath(
    new URL('../babel.config.js', import.meta.url),
  );

  return [
    nodePolyfills(),
    nodeExternals({ deps: true }),
    nodeResolve({ extensions }),

    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      extensions,
      configFile: babelConfigPath,
      sourceMaps: 'inline',
      envName: 'production',
    }),

    svgr(),

    terser(),
  ];
};
