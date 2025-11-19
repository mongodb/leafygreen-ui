/* eslint-disable no-console */
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { minify_sync } from 'terser';

interface MinifyOptions {
  verbose: boolean;
  glob: Array<string>;
}

export function minifyPackage({ verbose, glob: globPatterns }: MinifyOptions) {
  // Find all compiled JavaScript files in dist directories for this package
  // Exclude already minified files (e.g., `*-min.js`)
  const [include, exclude] = [
    globPatterns.filter(g => !g.startsWith('!')),
    globPatterns.filter(g => g.startsWith('!')).map(g => g.slice(1)),
  ];

  const jsFiles = glob.sync(include, {
    ignore: exclude,
  });

  if (verbose) {
    console.log('Found JavaScript files to minify:', jsFiles);
  }

  for (const jsFile of jsFiles) {
    const dir = path.dirname(jsFile);
    const ext = path.extname(jsFile);
    const name = path.basename(jsFile, ext);
    const existingSourceMapFile = path.join(dir, `${name}${ext}.map`);
    const minifiedFile = path.join(dir, `${name}-min${ext}`);
    const minifiedFileMap = path.join(dir, `${name}-min${ext}.map`);

    try {
      if (verbose) {
        console.log(`Minifying ${jsFile} -> ${minifiedFile}`);
      }

      const fileContent = fs.readFileSync(jsFile, 'utf8');
      const existingSourceMapContent = fs.readFileSync(
        existingSourceMapFile,
        'utf8',
      );

      const isEsm = ext === '.mjs' || jsFile.includes('/esm/') || undefined;

      const minified = minify_sync(fileContent, {
        sourceMap: {
          filename: path.basename(minifiedFile),
          content: existingSourceMapContent,
          url: path.basename(minifiedFileMap),
        },
        module: isEsm,
        compress: true,
        mangle: true,
      });

      fs.writeFileSync(minifiedFile, minified.code!);
      fs.writeFileSync(minifiedFileMap, minified.map! as string);

      if (verbose) {
        console.log(`✓ Minified ${jsFile}`);
      }
    } catch (error) {
      console.error(`✗ Failed to minify ${jsFile}:`, error);
      throw error;
    }
  }

  console.log(`✓ Minified ${jsFiles.length} javascript files.`);
}
