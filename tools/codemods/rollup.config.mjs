import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

const codemodGlobs = glob.sync('./src/codemods/*!(tests)/*.ts');

console.log('🛑🛑🛑🛑', {
  codemodGlobs,
  dir: __dirname,
});

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
  // {
  //   ...esmConfig,
  //   input: [...codemodGlobs],
  //   // This creates the dist/cjs dir. It includes the /codemods dir which includes .js files
  //   output: {
  //     ...esmConfig.output,
  //     format: 'cjs', // overrides esm format from esmConfig.output
  //     entryFileNames: '[name].js',
  //     preserveModules: true,
  //     exports: 'auto',
  //     dir: 'dist/cjs/',
  //   },
  // },
];
