// Credit to [Polaris](https://github.com/Shopify/polaris/blob/995079cc7c5c5087d662609c75c11eea58920f6d/polaris-migrator/src/utilities/check.ts)

/* eslint-disable jest/no-export */
import fs from 'fs';
import jscodeshift, { type FileInfo } from 'jscodeshift';
import path from 'path';
// @ts-expect-error - no prettier types
import prettier from 'prettier';

interface ParserExtensionMap {
  [key: string]: prettier.BuiltInParserName;
}

const parserExtensionMap: ParserExtensionMap = {
  tsx: 'typescript',
};

interface TestArgs {
  fixture: string;
  transform: string;
  extension?: string;
  level?: 1 | 2;
  options?: { [option: string]: any };
}

/**
 * Util that runs a file through jscodeshift and returns the modified code.
 */
async function applyTransform(
  transform: any,
  input: FileInfo,
  options?: { [option: string]: any },
) {
  // This get the default export from transform.ts
  // Handle ES6 modules using default export for the transform
  const transformer = transform.default ? transform.default : transform;
  const output = await transformer(
    input,
    {
      jscodeshift: jscodeshift.withParser('tsx'),
      stats: () => {},
    },
    options || {},
  );

  return (output || '').trim();
}

/**
 * Util to test migrations in Jest.
 * The input file within the fixture undergoes the appropriate transformation. The results are then compared to the output file.
 */
export function transformTest(
  dirName: string,
  { fixture, transform, extension = 'tsx', options = {}, level = 2 }: TestArgs,
) {
  describe(transform, () => {
    test(fixture, async () => {
      const fixtureDir = path.join(dirName);
      const inputPath = path.join(fixtureDir, `${fixture}.input.${extension}`);
      const parser = parserExtensionMap[extension];
      const source = fs.readFileSync(inputPath, 'utf8');
      const expected = fs.readFileSync(
        path.join(fixtureDir, `${fixture}.output.${extension}`),
        'utf8',
      );

      // How many levels to go up from the test directory to find transform.ts
      const levelsUp = level === 2 ? '../..' : '..';
      const module = await import(path.join(dirName, levelsUp, 'transform.ts'));
      const output = await applyTransform(
        { ...module },
        { source, path: inputPath },
        options,
      );

      const formattedOutput = prettier.format(output, { parser });
      const formattedExpected = prettier.format(expected, { parser });

      // Format output and expected with prettier for white spaces and line breaks consistency
      expect(formattedOutput).toBe(formattedExpected);
    });
  });
}
