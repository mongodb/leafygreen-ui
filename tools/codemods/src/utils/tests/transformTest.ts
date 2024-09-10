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
  /**
   * The file name of the test. This name will be used to get the input and output file for the test.
   */
  fixture: string;

  /**
   * The name of the transformation to test
   */
  transform: string;

  /**
   * The extension of the file which is used as a parser for prettier.
   *
   * @default 'tsx'
   */
  extension?: string;

  /**
   * Options to pass to the transformer function
   *
   * @default {}
   */
  options?: { [option: string]: any };
}

/**
 * Test util that runs a file through jscodeshift and returns the modified code.
 *
 * @param tranform an import of the transform file e.g. transform.ts
 * @param input the file to run the transformation against
 * @param options options to pass to the transform function
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
    },
    options || {},
  );

  return (output || '').trim();
}

/**
 * Test util to test migrations in Jest.
 * The input file within the fixture undergoes the appropriate transformation. The results are then compared to the output file.
 *
 * @param dirName the current directory
 * @param options an object containing at least the fixture(test name) and transformation name
 */
export function transformTest(
  dirName: string,
  { fixture, transform, extension = 'tsx', options = {} }: TestArgs,
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
      const levelsUp = '..';
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
