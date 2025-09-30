/* eslint-disable no-console */
import { formatLG } from '@lg-tools/lint';
import { transform } from '@svgr/core';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

import { getChecksum } from './checksum';
import { indexTemplate } from './indexTemplate';
import { FileObject, PrebuildOptions } from './prebuild.types';

const SRC_PATH = path.resolve(__dirname, '..', '..', 'src');

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
  const glyphsDir = path.resolve(SRC_PATH, 'glyphs');
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
    : path.resolve(SRC_PATH, 'generated');

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
  const indexPath = path.resolve(SRC_PATH, 'glyphs', 'index.ts');
  options?.verbose && console.log('Writing index file...', indexPath);
  const indexContent = await indexTemplate(svgFiles);
  const formattedIndexContent = await formatLG(indexContent, indexPath);
  fs.writeFileSync(indexPath, formattedIndexContent, { encoding: 'utf8' });
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

    // Generate basic React component first
    const processedSVGR = await transform(
      svgContent,
      {
        plugins: ['@svgr/plugin-jsx'],
        typescript: true,
        jsx: {
          babelConfig: {
            plugins: [
              [
                '@svgr/babel-plugin-replace-jsx-attribute-value',
                {
                  values: [
                    { value: '#000', newValue: 'currentColor' },
                    { value: '#000000', newValue: 'currentColor' },
                    { value: 'black', newValue: 'currentColor' },
                  ],
                },
              ],
            ],
          },
        },
      },
      { componentName: file.name },
    );

    // Post-process to add custom LeafyGreen wrapper
    const customizedSVGR = processedSVGR.replace(
      /import \* as React from "react";\nimport type \{ SVGProps \} from "react";\nconst (\w+) = \(props: SVGProps<SVGSVGElement>\) => (.*?);\nexport default \1;/s,
      `import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface $1Props extends LGGlyph.ComponentProps {}

const $1 = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: $1Props) => {
  const fillStyle = css\`
    color: \${fill};
  \`;

  const noFlexShrink = css\`
    flex-shrink: 0;
  \`;

  const accessibleProps = generateAccessibleProps(role, '$1', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = $2;

  return React.cloneElement(svgElement, {
    className: cx(
      {
        [fillStyle]: fill != null,
      },
      noFlexShrink,
      className,
    ),
    height: typeof size === 'number' ? size : sizeMap[size],
    width: typeof size === 'number' ? size : sizeMap[size],
    role,
    ...accessibleProps,
    ...props,
  });
};

$1.displayName = '$1';
$1.isGlyph = true;

export default $1;`,
    );

    const scriptPath =
      'packages/icon/' +
      path.relative(path.resolve(__dirname, process.cwd()), __filename);

    if (customizedSVGR === null) {
      throw new Error(
        `Regex replacement failed for file "${file.name}.svg". The SVGR output could not be customized and would result in a broken icon component.`,
      );
    }

    const finalContent = customizedSVGR;
    const checksum = getChecksum(svgContent, finalContent);

    const outfilePath = path.resolve(outputDir, `${file.name}.tsx`);
    const annotatedFileContent = annotateFileContent(
      scriptPath,
      checksum,
      finalContent,
    );

    if (options?.verbose) {
      console.log(`Processed ${file.name}.svg`);
      console.log(`Checksum: ${checksum}`);
      console.log(`Writing to ${outfilePath}\n`);
    }

    // We intentionally don't format the generated .tsx files
    fs.writeFileSync(outfilePath, annotatedFileContent);
  };
}

buildSvgFiles(options);
