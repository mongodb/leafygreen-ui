const { createHash } = require('crypto');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { default: svgr } = require('@svgr/core');
const meow = require('meow');
const template = require('./template');
const svgrrc = require('../.svgrrc');

interface Flags {
  outDir?: string;
}

interface FileObject {
  name: string;
  path: string;
}

const usageString = `
Usage
  $ ts-node ./build.ts <filename(s)>

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
};

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
        template,
      },
      {
        componentName: file.name,
      },
    );

    const script = './node_modules/.bin/ts-node packages/icon/scripts/build.ts';

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
