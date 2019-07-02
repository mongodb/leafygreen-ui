import React from 'react';
import path from 'path';
import fs from 'fs';
import { toJson } from 'xml2json';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import { createIconComponent, glyphs } from '.';

afterAll(cleanup);

describe('packages/Icon/glyphs/', () => {
  const glyphPaths = fs
    .readdirSync(path.resolve(__dirname, './glyphs'))
    /**
     * './glyphs/' contains an index.ts file, so we filter out
     * anything that's not an svg.
     */
    .filter(path => /.*\.svg$/.test(path));

  test('exported glyphs match files in glyphs directory', () => {
    // Test that any export in the glyphs directory has a corresponding file,
    // and return an array of SVG files not exported.
    const extraGlyphs = Object.keys(glyphs).reduce((glyphsInDir, glyph) => {
      expect(glyphsInDir.find(el => el === glyph)).toBe(glyph);

      return glyphsInDir.filter(el => el !== glyph);
    }, glyphPaths.map(path => path.replace('.svg', '')));

    expect(extraGlyphs.length).toBe(0);
  });

  glyphPaths.forEach(glyphPath => {
    describe(`${glyphPath}`, () => {
      const { svg } = require(path.resolve(__dirname, `./glyphs/${glyphPath}`));

      type SVGNodeObject = { readonly [K in string]: string | SVGNodeObject };

      const rootGlyphObject: SVGNodeObject = toJson(svg, { object: true });

      function validateGlyphObject(obj: SVGNodeObject) {
        Object.keys(obj).forEach(key => {
          const currentValue = obj[key];

          if (typeof currentValue === 'object') {
            validateGlyphObject(currentValue);
          } else {
            if (key === 'fill') {
              const validFills = ['#000', '#000000', 'none'];

              expect(validFills.includes(currentValue)).toBeTruthy();
            }
          }
        });
      }

      test('all fills used in SVG files are "none", "#000", or "#000000"', () => {
        validateGlyphObject(rootGlyphObject);
      });
    });
  });
});

const text = 'Hello world';

// eslint-disable-next-line react/display-name
const MyGlyph: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <div>{text}</div>
);

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
