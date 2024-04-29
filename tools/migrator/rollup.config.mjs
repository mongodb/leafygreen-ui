import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

const migratorGlob = glob.sync('./src/migrations/*!(tests)/*.ts');

console.log('🛑🛑🛑🛑', {
  migratorGlob,
  dir: __dirname,
});

export default [
  esmConfig,
  umdConfig,
  {
    ...esmConfig,
    input: [...migratorGlob],
    // This updates the /migration dir to include .js files
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
    input: [...migratorGlob],
    // This updates the /esm dir to include the /migration dir which includes .mjs files
    output: {
      ...esmConfig.output,
      // esm is supported in node.js with the .mjs extension
      entryFileNames: '[name].mjs',
      preserveModules: true,
      exports: 'auto',
    },
  },
];
