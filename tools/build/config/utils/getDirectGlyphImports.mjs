import fs from 'fs';
import path from 'path';

/**
 * @returns An array of all glyph import paths
 */
export function getDirectGlyphImports(allDependencies) {
  const pkgHasIconDependency = allDependencies['@leafygreen-ui/icon'];
  const glyphsDir = path.resolve(process.cwd(), '../icon/src/glyphs');

  if (pkgHasIconDependency && fs.existsSync(glyphsDir)) {
    return fs
      .readdirSync(glyphsDir)
      .filter(filePath => /.svg/.test(filePath))
      .map(
        fileName =>
          `@leafygreen-ui/icon/dist/${path.basename(fileName, '.svg')}`,
      );
  }

  return [];
}
