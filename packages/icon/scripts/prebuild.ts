// @ts-expect-error - no types in svgr v5.5
import { default as svgr } from '@svgr/core';
import { createHash } from 'crypto';
import fs from 'fs';
import meow from 'meow';
import path from 'path';
import { promisify } from 'util';

import svgrrc from '../.svgrrc';

import { indexTemplate } from './indexTemplate';
import { FileObject, Flags } from './prebuild.types';
import { svgrTemplate } from './svgrTemplate';

const usageString = `
Usage
  $ ts-node ./prebuild.ts <filename(s)>

Options
  --outDir, -o  Output directory for built SVG components
`;

const cliConfig = {
  flags: {
    outDir: {
      type: 'string',
      alias: 'o',
    },
  },
} satisfies meow.Options<meow.AnyFlags>;

const cli = meow(usageString, cliConfig);

async function buildSvgFiles(
  input: Array<string>,
  flags: Flags,
): Promise<void> {
  const svgFiles: Array<FileObject> = await (async () => {
    if (input?.length) {
      const filteredSvgFiles = input.filter(filterSvgFiles);

      return filteredSvgFiles.map(filePath => ({
        name: path.basename(filePath, '.svg'),
        path: path.resolve(process.cwd(), filePath),
      }));
    }

    const glyphsDir: string = path.resolve(__dirname, '..', 'src', 'glyphs');
    const svgFiles = await promisify(fs.readdir)(glyphsDir);
    const filteredSvgFiles = svgFiles.filter(filterSvgFiles);

    return filteredSvgFiles.map((fileName: string) => ({
      name: fileName.replace('.svg', ''),
      path: path.resolve(glyphsDir, fileName),
    }));
  })();

  const outputDir = await createOutputDirectory(flags);

  await Promise.all(svgFiles.map(processFile(outputDir)));

  await createIndexFile(svgFiles);
}

function filterSvgFiles(str: string): boolean {
  return str.includes('.svg');
}

async function createOutputDirectory(flags: Flags) {
  let outputDir = path.resolve(__dirname, '..', 'src/generated');

  if (flags.outDir) {
    outputDir = path.resolve(process.cwd(), flags.outDir);
  }

  const outputDirectoryExists = await promisify(fs.exists)(outputDir);

  if (!outputDirectoryExists) {
    await promisify(fs.mkdir)(outputDir, { recursive: true });
  }

  return outputDir;
}

async function createIndexFile(svgFiles: Array<FileObject>) {
  const indexPath = path.resolve(__dirname, '..', 'src/glyphs', 'index.ts');

  const indexContent = await indexTemplate(svgFiles);

  await promisify(fs.writeFile)(indexPath, indexContent, { encoding: 'utf8' });
}

function annotateFileContent(
  script: string,
  checksum: string,
  moduleCode: string,
) {
  return `/**
* This is a generated file. Do not modify it manually.
*
* @script ${script}
* @checksum ${checksum}
*/
${moduleCode}`;
}

function processFile(outputDir: string) {
  return async (file: FileObject) => {
    const fileContent = await promisify(fs.readFile)(file.path, {
      encoding: 'utf8',
    });

    const moduleCode = await svgr(
      fileContent,
      {
        ...svgrrc,
        template: svgrTemplate,
      },
      {
        componentName: file.name,
      },
    );

    const script =
      './node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts';

    const checksum = createHash('md5')
      .update(script)
      .update(fileContent)
      .update(moduleCode)
      .digest('hex');

    await promisify(fs.writeFile)(
      path.resolve(outputDir, `${file.name}.tsx`),
      annotateFileContent(script, checksum, moduleCode),
    );
  };
}

buildSvgFiles(cli.input, cli.flags);
