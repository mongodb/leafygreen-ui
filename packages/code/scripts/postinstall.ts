/* eslint-disable no-console */
import packageConfig from '@lg-tools/build/config/package.tsconfig.json';
import fs from 'fs';
import path from 'path';

const highlightJsPath = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'highlight.js',
);

const tsConfigPath = path.join(highlightJsPath, 'tsconfig.json');

/**
 * This script adds a tsconfig.json file to the highlight.js module in node_modules,
 * to ensure TypeScript can properly resolve types when importing highlight.js
 *
 * Hopefully this will be removed in the future.
 */
async function main() {
  try {
    if (fs.existsSync(highlightJsPath)) {
      if (fs.existsSync(tsConfigPath)) {
        // If the tsconfig.json file already exists, skip creating it
        return;
      }

      console.log('📦 Adding tsconfig.json to highlight.js module...');

      // Define the tsconfig.json content
      const tsconfig = {
        ...packageConfig,
        compilerOptions: {
          ...packageConfig.compilerOptions,
          baseUrl: './types',
        },
      };

      // Write the tsconfig.json file to the highlight.js directory
      fs.writeFileSync(tsConfigPath, JSON.stringify(tsconfig, null, 2));

      console.log(`✅ Successfully wrote file ${tsConfigPath}`);
    } else {
      console.log(
        '⚠️ highlight.js module not found in node_modules. Skipping tsconfig.json creation.',
      );
    }
  } catch (error) {
    console.error(
      '❌ Error adding tsconfig.json to highlight.js module:',
      error,
    );
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});
