import React from 'react';
import path from 'path';
import fs from 'fs';
import { toJson } from 'xml2json';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import { createIconComponent } from '.';

afterAll(cleanup);

describe('packages/Icon/glyphs/', () => {
  const glyphPaths = fs
    .readdirSync(path.resolve(__dirname, './glyphs'))
    /**
     * './glyphs/' contains an index.ts file, so we filter out
     * anything that's not an svg.
     */
    .filter(path => /.*\.svg$/.test(path));

  glyphPaths.forEach(glyphPath => {
    describe(`${glyphPath}`, () => {
      const { svg } = require(path.resolve(__dirname, `./glyphs/${glyphPath}`));

      if (!svg) {
        return;
      }

      type SVGNodeObject = { readonly [K in string]: string | SVGNodeObject };

      const rootGlyphObject: SVGNodeObject = toJson(svg, { object: true });

      let isValid = true;

      function processGlyphObject(obj: SVGNodeObject) {
        Object.keys(obj).forEach(key => {
          const currentValue = obj[key];

          if (typeof currentValue === 'object') {
            processGlyphObject(currentValue);
          } else {
            if (key === 'fill') {
              const validFills = ['#000', '#000000', 'none'];

              if (!validFills.includes(currentValue)) {
                isValid = false;
              }
            }
          }
        });
      }

      processGlyphObject(rootGlyphObject);

      test('all fills used in SVG files are "none", "#000", or "#000000"', () => {
        expect(isValid).toBe(true);
      });
    });
  });
});

const text = 'Hello world';

// eslint-disable-next-line react/display-name
const MyGlyph: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <div>{text}</div>
);

const glyphs = { MyGlyph };

describe('packages/Icon/createIconComponent', () => {
  const IconComponent = createIconComponent(glyphs);

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
