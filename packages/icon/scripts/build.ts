const { createHash } = require('crypto');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const { default: svgr } = require('@svgr/core');
const { CLIEngine } = require('eslint');
const meow = require('meow');
const prettier = require('prettier');

const template = require('./template');

const cli = meow(
  `
	Usage
		$ ts-node ./build.ts <filename(s)>

	Options
		--outDir, -o  Output directory for built SVG components
`,
  {
    flags: {
      outDir: {
        type: 'string',
        alias: 'o',
      },
    },
  },
);

const repoPath = path.resolve(__dirname, '../../..');

interface Flags {
  outDir?: string;
}

interface FileObject {
  name: string;
  path: string;
}

function filterSvgFiles(str: string): boolean {
  return str.includes('.svg');
}

async function buildSvgFiles(
  input: Array<string>,
  flags: Flags,
): Promise<void> {
  let svgFiles: Array<FileObject>;

  if (input?.length) {
    svgFiles = input.filter(filterSvgFiles).map(filePath => {
      return {
        name: path.basename(filePath, '.svg'),
        path: path.resolve(process.cwd(), filePath),
      };
    });
  } else {
    const glyphsDir: string = path.resolve(__dirname, '..', 'src', 'glyphs');

    svgFiles = (await promisify(fs.readdir)(glyphsDir))
      .filter(filterSvgFiles)
      .map((fileName: string) => ({
        name: fileName.replace('.svg', ''),
        path: path.resolve(glyphsDir, fileName),
      }));
  }

  let outputDir = path.resolve(__dirname, '..', 'src/generated');

  if (flags.outDir) {
    outputDir = path.resolve(process.cwd(), flags.outDir);
  }

  if (!(await promisify(fs.exists)(outputDir))) {
    await promisify(fs.mkdir)(outputDir, { recursive: true });
  }

  await Promise.all(
    svgFiles.map(async file => {
      const fileContent = await promisify(fs.readFile)(file.path, {
        encoding: 'utf8',
      });

      const moduleCode = await svgr(
        fileContent,
        {
          expandProps: 'end',
          svgProps: {
            viewBox: '0 0 16 16',
          },
          jsx: {
            babelConfig: {
              plugins: [
                [
                  // This plugin lets us transform the JSX output to change instances of
                  // #000000 and #000 (the fill for our SVG glyphs) to use `this.props.fill` instead.
                  '@svgr/babel-plugin-replace-jsx-attribute-value',
                  {
                    values: [
                      {
                        value: '#000',
                        newValue: "'currentColor'",
                        literal: true,
                      },
                      {
                        value: '#000000',
                        newValue: "'currentColor'",
                        literal: true,
                      },
                      {
                        value: 'black',
                        newValue: "'currentColor'",
                        literal: true,
                      },
                    ],
                  },
                ],
              ],
            },
          },
          template,
        },
        {
          componentName: file.name,
        },
      );

      const options = await prettier.resolveConfig(
        path.resolve(repoPath, '.prettierrc'),
      );
      const formattedCode = prettier.format(moduleCode, {
        ...options,
        parser: 'babel',
      });

      const {
        results: [{ output: lintedCode = formattedCode }],
      } = new CLIEngine({
        cwd: repoPath,
        fix: true,
      }).executeOnText(formattedCode);

      const script =
        './node_modules/.bin/ts-node packages/icon/scripts/build.ts';

      const checksum = createHash('md5')
        .update(script)
        .update(fileContent)
        .update(lintedCode)
        .digest('hex');

      const finalCode = `/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ${script}
 * @checksum ${checksum}
 */
${lintedCode}`;

      await promisify(fs.writeFile)(
        path.resolve(outputDir, `${file.name}.tsx`),
        finalCode,
      );
    }),
  );
}

buildSvgFiles(cli.input, cli.flags);
