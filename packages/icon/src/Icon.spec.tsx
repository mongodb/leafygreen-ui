import React from 'react';
import path from 'path';
import fs from 'fs';
import { createHash } from 'crypto';
import { toJson } from 'xml2json';
import { render } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import { SVGR } from './types';
import { createIconComponent, glyphs } from '.';
import { getGlyphTitle } from './glyphCommon';
import createGlyphComponent from './createGlyphComponent';
import EditIcon from '@leafygreen-ui/icon/dist/Edit';

function getBaseName(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

const glyphPaths = fs
  .readdirSync(path.resolve(__dirname, './glyphs'))
  /**
   * './glyphs/' contains an index.ts file, so we filter out
   * anything that's not an svg.
   */
  .filter(path => /.*\.svg$/.test(path))
  .map(fileName => path.resolve(__dirname, './glyphs/', fileName));

const generatedFilesDirectory = path.resolve(__dirname, './generated');
const baseNameToGeneratedFilePath: Record<string, string> = {};

fs.readdirSync(generatedFilesDirectory).forEach(filePath => {
  baseNameToGeneratedFilePath[getBaseName(filePath)] = filePath;
});

describe('packages/Icon/glyphs/', () => {
  test('exported glyphs match files in glyphs directory', () => {
    // Test that any export in the glyphs directory has a corresponding file,
    // and return an array of SVG files not exported.
    const extraGlyphs = Object.keys(glyphs).reduce((glyphsInDir, glyph) => {
      expect(glyphsInDir.find(el => el === glyph)).toBe(glyph);

      return glyphsInDir.filter(el => el !== glyph);
    }, glyphPaths.map(getBaseName));

    expect(extraGlyphs.length).toBe(0);
  });

  glyphPaths.forEach(glyphPath => {
    describe(getBaseName(glyphPath), () => {
      const { svg } = require(glyphPath);

      type SVGNodeObject = {
        readonly [K in string]: string | SVGNodeObject;
      };

      const rootGlyphObject: SVGNodeObject = toJson(svg, { object: true });

      function validateGlyphObject(obj: SVGNodeObject) {
        Object.keys(obj).forEach(key => {
          const currentValue = obj[key];

          if (typeof currentValue === 'object') {
            validateGlyphObject(currentValue);
          } else if (key === 'fill') {
            const validFills = ['#000', '#000000', 'none'];

            expect(validFills.includes(currentValue)).toBeTruthy();
          }
        });
      }

      // eslint-disable-next-line jest/expect-expect
      test('all fills used in SVG files are "none", "#000", or "#000000"', () => {
        validateGlyphObject(rootGlyphObject);
      });
    });
  });
});

const text = 'Hello world';

// eslint-disable-next-line react/display-name
const MyGlyph: SVGR.Component = () => <div>{text}</div>;

describe('packages/Icon/createGlyphComponent createGlyphComponent()', () => {
  const GlyphComponent = createGlyphComponent('MyGlyph', MyGlyph);

  test('createGlyphComponent returns a function', () => {
    expect(typeof GlyphComponent).toBe('function');
  });

  test('The function returned by createGlyphComponent has the displayName: "MyGlyph"', () => {
    expect(GlyphComponent.displayName).toBe('MyGlyph');
  });

  const { container } = render(<GlyphComponent />);
  const glyph = container.firstChild;

  test('The function returned by createGlyphComponent renders the glyph specified', () => {
    if (!typeIs.element(glyph)) {
      throw new Error('Glyph was not rendered');
    }

    expect(glyph.nodeName.toLowerCase()).toBe('div');
    expect(glyph.textContent).toBe(text);
  });
});

describe('packages/Icon/createGlyphComponent getGlyphTitle()', () => {
  const glyphName = 'MyCustomGlyph';

  test('When the title is "false", getGlyphTitle returns `null`', () => {
    expect(getGlyphTitle(glyphName, false)).toBeNull();
  });

  const generatedTitle = 'My Custom Glyph Icon';

  test(`When the title is "undefined", getGlyphTitle returns "${generatedTitle}"`, () => {
    expect(getGlyphTitle(glyphName)).toBe(generatedTitle);
  });

  test(`When the title is "null", getGlyphTitle returns "${generatedTitle}"`, () => {
    expect(getGlyphTitle(glyphName, null)).toBe(generatedTitle);
  });

  test(`When the title is "true", getGlyphTitle returns "${generatedTitle}"`, () => {
    expect(getGlyphTitle(glyphName, true)).toBe(generatedTitle);
  });

  const testTitle = 'This is a test';

  test(`When the title is the string "${testTitle}", getGlyphTitle returns "${testTitle}"`, () => {
    expect(getGlyphTitle(glyphName, testTitle)).toBe(testTitle);
  });
});

const customGlyphs = { MyGlyph };

describe('packages/Icon/createIconComponent', () => {
  const IconComponent = createIconComponent(customGlyphs);

  test('createIconComponent returns a function', () => {
    expect(typeof IconComponent).toBe('function');
  });

  test('The function returned by createIconComponent has the displayName: "Icon"', () => {
    expect(IconComponent.displayName).toBe('Icon');
  });

  const renderedIcon = render(<IconComponent glyph="MyGlyph" />);
  const glyph = renderedIcon.container.firstChild;

  test('The function returned by createIconComponent renders the glyph specified', () => {
    if (!typeIs.element(glyph)) {
      throw new Error('Glyph was not rendered');
    }

    expect(glyph.nodeName.toLowerCase()).toBe('div');
    expect(glyph.textContent).toBe(text);
  });
});

describe('Generated glyphs', () => {
  test('Edit icon has displayName: "Edit"', () => {
    expect(EditIcon.displayName).toBe('Edit');
  });

  test('have all been generated', () => {
    const validGlyphBaseNames: Record<string, true> = {};

    glyphPaths.forEach(filePath => {
      const baseName = getBaseName(filePath);
      expect(baseNameToGeneratedFilePath).toHaveProperty(baseName);

      validGlyphBaseNames[baseName] = true;
    });

    Object.keys(baseNameToGeneratedFilePath).forEach(baseName => {
      // Make sure there aren't any generated files that don't have a corresponding glyph
      expect(validGlyphBaseNames).toHaveProperty(baseName);
    });
  });

  describe('are up-to-date and not been modified', () => {
    glyphPaths.forEach(glyphPath => {
      const baseName = getBaseName(glyphPath);

      test(baseName, () => {
        const svgFileContents = fs.readFileSync(glyphPath, {
          encoding: 'utf8',
        });

        const generatedFileContents = fs.readFileSync(
          path.resolve(
            generatedFilesDirectory,
            baseNameToGeneratedFilePath[baseName],
          ),
          {
            encoding: 'utf8',
          },
        );

        const [
          ,
          script,
          checksum,
          checkedContents,
        ] = /^\/\*.*@script ([^\n]*).*@checksum ([^\n]*).*\*\/\n(.*)$/s.exec(
          generatedFileContents,
        )!;

        const expectedChecksum = createHash('md5')
          .update(script)
          .update(svgFileContents)
          .update(checkedContents)
          .digest('hex');

        try {
          expect(checksum).toEqual(expectedChecksum);
        } catch (error) {
          throw new Error(
            `${error}\n\nForgot to re-run script?: \`${script}\``,
          );
        }
      });
    });
  });
});
