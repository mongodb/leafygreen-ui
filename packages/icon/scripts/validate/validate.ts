import fsx from 'fs-extra';
import path from 'path';

import { getChecksum } from '../prebuild/checksum';

const glyphPaths = fsx
  .readdirSync(path.resolve(__dirname, '../src/glyphs'))
  /**
   * './glyphs/' contains an index.ts file, so we filter out
   * anything that's not an svg.
   */
  .filter(path => /.*\.svg$/.test(path))
  .map(fileName => path.resolve(__dirname, '../src/glyphs/', fileName));

function getBaseName(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

const generatedFilesDirectory = path.resolve(__dirname, '../src/generated');
const baseNameToGeneratedFilePath: Record<string, string> = {};

glyphPaths.forEach(glyphPath => {
  const baseName = getBaseName(glyphPath);

  const svgFileContents = fsx.readFileSync(glyphPath, {
    encoding: 'utf8',
  });

  const generatedFileContents = fsx.readFileSync(
    path.resolve(
      generatedFilesDirectory,
      baseNameToGeneratedFilePath[baseName],
    ),
    {
      encoding: 'utf8',
    },
  );

  const [, script, checksum, checkedContents] =
    /^\/\*.*@script ([^\n]*).*@checksum ([^\n]*).*\*\/\n(.*)$/s.exec(
      generatedFileContents,
    )!;

  const expectedChecksum = getChecksum(svgFileContents, checkedContents);

  if (checksum == expectedChecksum) {
    throw new Error(
      `Icon Checksums do not match. Forgot to re-run script?: \`${script}\``,
    );
  }
});
