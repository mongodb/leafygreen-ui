// TODO: copied from polaris

/* eslint-disable jest/no-export, jest/valid-title */
import fs from 'fs';
import jscodeshift, { type FileInfo } from 'jscodeshift';
import path from 'path';
// @ts-expect-error - no prettier types
import prettier from 'prettier';

async function applyTransform(
  transform: any,
  input: FileInfo,
  options?: { [option: string]: any },
) {
  // This get the default export from inside transform.ts
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
//TODO: rename me
export function transformCheck(
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
