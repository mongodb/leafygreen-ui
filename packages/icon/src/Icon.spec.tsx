import React from 'react';
import { render, screen } from '@testing-library/react';
import { createHash } from 'crypto';
import fs from 'fs';
import { axe } from 'jest-axe';
import path from 'path';
import { toJson } from 'xml2json';

import { typeIs } from '@leafygreen-ui/lib';

import EditIcon from './generated/Edit';
import { Size } from './glyphCommon';
import { isComponentGlyph } from './isComponentGlyph';
import { SVGR } from './types';
import { createGlyphComponent, createIconComponent, glyphs } from '.';

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

const MyTestSVGRGlyph: SVGR.Component = props => (
  <svg data-testid="my-glyph" {...props}></svg>
);

const customTestGlyphs = {
  MyTestSVGRGlyph: createGlyphComponent('MyTestSVGRGlyph', MyTestSVGRGlyph),
};

describe('packages/Icon/isComponentGlyph', () => {
  test('returns `true` for a rendered component', () => {
    const TestNode: React.ComponentType<any> & {
      isGlyph?: boolean;
    } = () => <div />;
    TestNode.isGlyph = true;
    const renderedTestNode = <TestNode />;
    expect(isComponentGlyph(renderedTestNode)).toBeTruthy();
  });

  test('returns `true` for a component function', () => {
    const TestNode: React.ComponentType<any> & {
      isGlyph?: boolean;
    } = () => <div />;
    TestNode.isGlyph = true;
    expect(isComponentGlyph(TestNode)).toBeTruthy();
  });

  test('returns `false` if isGlyph is false', () => {
    const TestNode: React.ComponentType<any> & {
      isGlyph?: boolean;
    } = () => <div />;
    TestNode.isGlyph = false;
    const renderedTestNode = <TestNode />;
    expect(isComponentGlyph(TestNode)).toBeFalsy();
    expect(isComponentGlyph(renderedTestNode)).toBeFalsy();
  });

  test('returns `false` if isGlyph is not set', () => {
    const TestNode: React.ComponentType<any> = () => <div />;
    const renderedTestNode = <TestNode />;
    expect(isComponentGlyph(TestNode)).toBeFalsy();
    expect(isComponentGlyph(renderedTestNode)).toBeFalsy();
  });
});

describe('packages/Icon/glyphs/', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<EditIcon />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

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
    describe(`${getBaseName(glyphPath)}`, () => {
      const { svg } = require(glyphPath);

      type SVGNodeObject = {
        readonly [K in string]: string | SVGNodeObject;
      };

      //@ts-expect-error
      const rootGlyphObject: SVGNodeObject = toJson(svg, { object: true });

      function validateGlyphObject(obj: SVGNodeObject) {
        Object.keys(obj).forEach(key => {
          const currentValue = obj[key];

          if (typeof currentValue === 'object') {
            validateGlyphObject(currentValue);
          } else if (key === 'fill') {
            const validFills = ['#000', '#000000', 'black', 'none'];

            expect(validFills.includes(currentValue)).toBeTruthy();
          }
        });
      }

      // eslint-disable-next-line jest/expect-expect
      test('all fills used in SVG files are "none", "black", "#000", or "#000000"', () => {
        validateGlyphObject(rootGlyphObject);
      });
    });
  });
});

describe('packages/Icon/createGlyphComponent', () => {
  const GlyphComponent = createGlyphComponent(
    'MyTestSVGRGlyph',
    MyTestSVGRGlyph,
  );

  test('returns a LGGlyph component', () => {
    expect(typeof GlyphComponent).toBe('function');
    expect(isComponentGlyph(GlyphComponent)).toBeTruthy();
  });

  test('returned component has correct display name', () => {
    expect(GlyphComponent.displayName).toBe('MyTestSVGRGlyph');
  });

  test('returned component has the property `isGlyph`', () => {
    expect(GlyphComponent).toHaveProperty('isGlyph');
    expect(GlyphComponent.isGlyph).toBeTruthy();
  });

  test('returned function passes `isComponentGlyph`', () => {
    expect(isComponentGlyph(GlyphComponent)).toBeTruthy();
  });

  test('returned function renders the glyph specified', () => {
    const { getByTestId } = render(<GlyphComponent />);
    const glyph = getByTestId('my-glyph');

    if (!typeIs.element(glyph)) {
      throw new Error('Glyph was not rendered');
    }
    expect(glyph.nodeName.toLowerCase()).toBe('svg');
  });

  describe('returned funcion passes through props', () => {
    test('`size` prop as number', () => {
      const { getByTestId } = render(<GlyphComponent size={20} />);
      const glyph = getByTestId('my-glyph');
      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
    });

    test('`size` prop as Size', () => {
      const { getByTestId } = render(<GlyphComponent size={Size.Large} />);
      const glyph = getByTestId('my-glyph');
      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
    });

    test('`role`', () => {
      const { getByTestId } = render(<GlyphComponent role="presentation" />);
      const glyph = getByTestId('my-glyph');
      expect(glyph).toHaveAttribute('role', 'presentation');
    });
  });
});

describe('packages/Icon/createIconComponent', () => {
  const IconComponent = createIconComponent(customTestGlyphs);

  test('returns a function', () => {
    expect(typeof IconComponent).toBe('function');
  });

  test('returned function has the displayName: "Icon"', () => {
    expect(IconComponent.displayName).toBe('Icon');
  });

  test('returned function has the property: `isGlyph`', () => {
    expect(IconComponent).toHaveProperty('isGlyph');
    expect(IconComponent.isGlyph).toBeTruthy();
  });

  test('returned function passes `isComponentGlyph`', () => {
    expect(isComponentGlyph(IconComponent)).toBeTruthy();
  });

  test('returned funciton renders the glyph specified', () => {
    const { getByTestId } = render(<IconComponent glyph="MyTestSVGRGlyph" />);
    const glyph = getByTestId('my-glyph');

    if (!typeIs.element(glyph)) {
      throw new Error('Glyph was not rendered');
    }
    expect(glyph.nodeName.toLowerCase()).toBe('svg');
  });

  describe('returned funcion passes through props', () => {
    test('`size` prop as number', () => {
      const { getByTestId } = render(
        <IconComponent glyph="MyTestSVGRGlyph" size={20} />,
      );
      const glyph = getByTestId('my-glyph');
      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
    });

    test('`size` prop as Size', () => {
      const { getByTestId } = render(
        <IconComponent glyph="MyTestSVGRGlyph" size={Size.Large} />,
      );
      const glyph = getByTestId('my-glyph');
      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
    });

    test('`role`', () => {
      const { getByTestId } = render(
        <IconComponent glyph="MyTestSVGRGlyph" role="presentation" />,
      );
      const glyph = getByTestId('my-glyph');
      expect(glyph).toHaveAttribute('role', 'presentation');
    });
  });

  test('returned Icon function logs an error when glyph does not exist', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(<IconComponent glyph="error" />);
    expect(consoleSpy).toHaveBeenCalled();
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

      test(`${baseName}`, () => {
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

        const [, script, checksum, checkedContents] =
          /^\/\*.*@script ([^\n]*).*@checksum ([^\n]*).*\*\/\n(.*)$/s.exec(
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

  describe('accessible props handled correctly', () => {
    test('when no prop is supplied, aria-label is genereated', () => {
      render(<EditIcon />);
      const editIcon = screen.getByRole('img');
      expect(editIcon.getAttribute('aria-label')).toBe('Edit Icon');
    });

    test('when aria-label is supplied it overrides default label', () => {
      render(<EditIcon aria-label="Test label" />);
      const editIcon = screen.getByRole('img');
      expect(editIcon.getAttribute('aria-label')).toBe('Test label');
    });

    test('when aria-labelledby is supplied it overrides default label', () => {
      render(<EditIcon aria-labelledby="Test label" />);
      const editIcon = screen.getByRole('img');
      expect(editIcon.getAttribute('aria-label')).toBe(null);
      expect(editIcon.getAttribute('aria-labelledby')).toBe('Test label');
    });

    test('when title is supplied it overrides default label', () => {
      render(<EditIcon title="Test title" />);
      const editIcon = screen.getByRole('img');
      expect(editIcon.getAttribute('aria-label')).toBe(null);
      expect(editIcon.getAttribute('title')).toBe('Test title');
    });

    test('when role="presentation", aria-hidden is true', () => {
      render(<EditIcon role="presentation" />);
      const editIcon = screen.getByRole('presentation', { hidden: true });
      expect(editIcon.getAttribute('aria-label')).toBe(null);
      expect(editIcon.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
