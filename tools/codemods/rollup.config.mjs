import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';
import { glob } from 'glob';

const codemodGlobs = glob.sync('./src/codemods/*!(tests)/*.ts');

export default [
  esmConfig,
  umdConfig,
  {
    ...esmConfig,
    input: [...codemodGlobs],
    // This updates the dist/codemods dir to include .js files
    output: {
      ...esmConfig.output,
      // cjs is fully supported in node.js
      format: 'cjs', // overrides esm format from esmConfig.output
      entryFileNames: '[name].js',
      dir: 'dist',
      preserveModules: true,
      exports: 'auto',
    },
  },
  {
    ...esmConfig,
    input: [...codemodGlobs],
    // This updates the dist/esm dir to include the /codemods dir which includes .mjs files
    output: {
      ...esmConfig.output,
      // esm is supported in node.js with the .mjs extension
      entryFileNames: '[name].mjs',
      preserveModules: true,
      exports: 'auto',
    },
  },
];
