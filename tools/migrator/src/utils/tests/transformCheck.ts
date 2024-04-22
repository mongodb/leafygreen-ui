// TODO: copied from polaris
/* eslint-disable no-console */
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
  // TODO: don't understand whats happening here
  // Handle ES6 modules using default export for the transform
  const transformer = transform.default ? transform.default : transform;
  console.log('🐥', { transformer, transform });
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

export function transformCheck(
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

      console.log('🚨', { dirName, fixtureDir, inputPath });
      // Assumes transform.ts is one level up from tests directory
      const module = await import(path.join(dirName, '../..', 'transform.ts'));
      console.log(
        '🚨🚨🚨',
        { module },
        path.join(dirName, '../..', 'transform.ts'),
      );
      const output = await applyTransform(
        { ...module },
        { source, path: inputPath },
        options,
      );

      const formattedOutput = prettier.format(output, { parser });
      const formattedExpected = prettier.format(expected, { parser });

      // console.log({ expected, formattedExpected, output, formattedOutput });

      // Format output and expected with prettier for white spaces and line breaks consistency
      expect(formattedOutput).toBe(formattedExpected);
    });
  });
}
