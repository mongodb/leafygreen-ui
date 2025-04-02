/* eslint-disable no-console */
// @ts-expect-error - no types in svgr v5.5
import { default as svgr } from '@svgr/core';
import { Command } from 'commander';
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

import svgrrc from '../.svgrrc';

import { indexTemplate } from './indexTemplate';
import { FileObject, PrebuildOptions } from './prebuild.types';
import { svgrTemplate } from './svgrTemplate';

const program = new Command()
  .description('Process SVG files and generate React components')
  .option('-o, --outDir <path>', 'Output directory for built SVG components')
  .option('-v, --verbose', 'Enable verbose output', false)
  .parse();

const options = program.opts() as PrebuildOptions;

async function buildSvgFiles(options: PrebuildOptions): Promise<void> {
  const svgFiles: Array<FileObject> = await getSVGFiles(options);
  const outputDir = await createOutputDirectory(options);
  const processFile = makeFileProcessor(outputDir, options);
  options?.verbose && console.log('Processing SVG files...\n');
  await Promise.all(svgFiles.map(processFile));
  await createIndexFile(svgFiles, options);
}

/**
 * Get all SVG files from the glyphs directory
 */
async function getSVGFiles(
  options?: PrebuildOptions,
): Promise<Array<FileObject>> {
  const glyphsDir = path.resolve(__dirname, '..', 'src', 'glyphs');
  const filePaths = fs.readdirSync(glyphsDir);
  const svgFilePaths = filePaths.filter(filterSvgFiles);

  options?.verbose &&
    console.log(svgFilePaths.length, `SVG files found in ${glyphsDir}`);

  const svgFiles = svgFilePaths.map((fileName: string) => ({
    name: fileName.replace('.svg', ''),
    path: path.resolve(glyphsDir, fileName),
  }));

  return svgFiles;
}

/**
 * Filter function to check if a string contains '.svg'
 */
function filterSvgFiles(str: string): boolean {
  return str.includes('.svg');
}

/**
 * Create the output directory if it doesn't exist
 */
async function createOutputDirectory(options: PrebuildOptions) {
  const outputDir = options.outDir
    ? path.resolve(process.cwd(), options.outDir)
    : path.resolve(__dirname, '..', 'src/generated');

  const outputDirectoryExists = fs.existsSync(outputDir);

  if (!outputDirectoryExists) {
    options.verbose && console.log(`Creating directory: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  }

  options.verbose && console.log(`Using output directory: ${outputDir}`);
  return outputDir;
}

/**
 * Create the index file for the generated components
 */
async function createIndexFile(
  svgFiles: Array<FileObject>,
  options?: PrebuildOptions,
) {
  const indexPath = path.resolve(__dirname, '..', 'src/glyphs', 'index.ts');
  options?.verbose && console.log('Writing index file...', indexPath);
  const indexContent = await indexTemplate(svgFiles);
  fs.writeFileSync(indexPath, indexContent, { encoding: 'utf8' });
}

/**
 * Annotate the generated file with script and checksum information
 */
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

/**
 * Returns an async function that processes a single SVG file
 */
function makeFileProcessor(outputDir: string, options?: PrebuildOptions) {
  return async (file: FileObject) => {
    const svgContent = fs.readFileSync(file.path, {
      encoding: 'utf8',
    });

    const processedSVGR = await svgr(
      svgContent,
      {
        ...svgrrc,
        template: svgrTemplate,
      },
      {
        componentName: file.name,
      },
    );

    const scriptPath = path.relative(
      path.resolve(__dirname, '../../..'),
      __filename,
    );

    const checksum = createHash('md5')
      .update(scriptPath)
      .update(svgContent)
      .update(processedSVGR)
      .digest('hex');

    const outfileContent = annotateFileContent(
      scriptPath,
      checksum,
      processedSVGR,
    );
    const outfilePath = path.resolve(outputDir, `${file.name}.tsx`);

    if (options?.verbose) {
      console.log(`Processed ${file.name}.svg`);
      console.log(`Checksum: ${checksum}`);
      console.log(`Writing to ${outfilePath}\n`);
    }

    fs.writeFileSync(outfilePath, outfileContent);
  };
}

buildSvgFiles(options);
