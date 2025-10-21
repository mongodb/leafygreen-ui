/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

/**
 * Validates that built icon files do not import @emotion packages directly.
 * Icons should only depend on @leafygreen-ui/emotion, not @emotion/* packages.
 */
function validateBuiltIcons(): void {
  const distDirs = ['dist/esm', 'dist/umd'];
  const emotionPattern = /@emotion\//g;
  let hasErrors = false;
  const errors: Array<{ file: string; matches: Array<string> }> = [];

  console.log('Validating built icons for @emotion imports...\n');

  for (const distDir of distDirs) {
    const fullPath = path.join(process.cwd(), distDir);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: ${distDir} directory does not exist. Skipping...`);
      continue;
    }

    const files = fs.readdirSync(fullPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));

    for (const file of jsFiles) {
      // Skip the main index file and glyphCommon as they may have different rules
      if (file === 'index.js' || file === 'glyphCommon.js') {
        continue;
      }

      const filePath = path.join(fullPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check for @emotion imports/requires
      const matches = content.match(emotionPattern);

      if (matches) {
        hasErrors = true;
        const uniqueMatches = Array.from(new Set(matches));
        errors.push({ file: `${distDir}/${file}`, matches: uniqueMatches });
      }
    }
  }

  console.log(''); // Empty line for readability

  if (hasErrors) {
    console.error('❌ ERROR: Found @emotion imports in built icon files!\n');
    console.error(
      'Icons should only depend on @leafygreen-ui/emotion, not @emotion/* packages directly.\n',
    );
    console.error('Files with @emotion imports:');
    for (const error of errors) {
      console.error(`  - ${error.file}`);
      for (const match of error.matches) {
        console.error(`    → ${match}`);
      }
    }
    console.error('\nThis indicates a build configuration issue.');
    console.error(
      'Check packages/icon/scripts/build/build-batch.ts for proper externalization rules.',
    );
    process.exit(1);
  } else {
    process.exit(0);
  }
}

validateBuiltIcons();
