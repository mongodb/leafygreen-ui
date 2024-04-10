/* eslint-disable jest/no-export, jest/valid-title */
import fs from 'fs';
// @ts-expect-error - no jscodeshift types
import jscodeshift, { type FileInfo } from 'jscodeshift';
import path from 'path';
// @ts-expect-error - no prettier types
import prettier from 'prettier';

async function applyTransform(
  transform: any,
  input: FileInfo,
  options?: { [option: string]: any },
) {
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
  options?: { [option: string]: any };
}

export function check(
  dirName: string,
  { fixture, transform, extension = 'tsx', options = {} }: TestArgs,
) {
  describe(transform, () => {
    it(fixture, async () => {
      const fixtureDir = path.join(dirName);
      const inputPath = path.join(fixtureDir, `${fixture}.input.${extension}`);
      console.log('🚨', { dirName, fixtureDir, inputPath });
      const parser = parserExtensionMap[extension];
      const source = fs.readFileSync(inputPath, 'utf8');
      const expected = fs.readFileSync(
        path.join(fixtureDir, `${fixture}.output.${extension}`),
        'utf8',
      );
      // Assumes transform is one level up from tests directory
      const module = await import(path.join(dirName, '..', 'transform'));
      console.log({ module });
      const output = await applyTransform(
        { ...module },
        { source, path: inputPath },
        options,
      );

      // Format output and expected with prettier for white spaces and line breaks consistency
      expect(prettier.format(output, { parser })).toBe(
        prettier.format(expected, { parser }),
      );
    });
  });
}
