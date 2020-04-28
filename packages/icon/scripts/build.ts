import svgr from '@svgr/core';
import fs from 'fs';
import template from '../src/template';
import path from 'path';
import meow from 'meow';

const cli = meow(
  `
	Usage
		$ node ./build.js <filename(s)>

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

function buildSvgFiles(input: Array<string>, flags: Flags) {
  let svgFiles: Array<FileObject>;

  if (input && input.length) {
    svgFiles = input.filter(filterSvgFiles).map(filePath => {
      const splitPath = filePath.split('/');
      const fileName = splitPath[splitPath.length - 1].replace('.svg', '');

      return {
        name: fileName,
        path: path.resolve(process.cwd(), filePath),
      };
    });
  } else {
    const glyphsDir = path.resolve(__dirname, '../src/glyphs');

    svgFiles = fs
      .readdirSync(glyphsDir)
      .filter(filterSvgFiles)
      .map(fileName => ({
        name: fileName.replace('.svg', ''),
        path: path.resolve(glyphsDir, fileName),
      }));
  }

  svgFiles.forEach(file => {
    svgr(
      fs.readFileSync(file.path, { encoding: 'utf8' }),
      {
        titleProp: true,
        svgProps: {
          role: 'img',
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
    )
      .then((moduleCode: string) => {
        let outputDir = path.resolve(__dirname, '../dist');

        if (flags.outDir) {
          outputDir = path.resolve(process.cwd(), flags.outDir);
        }

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(
          path.resolve(outputDir, `${file.name}.js`),
          moduleCode,
        );
      })
      .catch(console.error);
  });
}

buildSvgFiles(cli.input, cli.flags);
