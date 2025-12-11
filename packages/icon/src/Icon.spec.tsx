import React from 'react';
import { render, screen } from '@testing-library/react';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { axe } from 'jest-axe';
import path from 'path';

import { typeIs } from '@leafygreen-ui/lib';

import EditIcon from './generated/Edit';
import { Size } from './glyphCommon';
import { Icon } from './Icon';
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

fs.readdirSync(generatedFilesDirectory)
  .filter(filePath => /.*\.tsx$/.test(filePath))
  .forEach(filePath => {
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

      const parser = new XMLParser({ ignoreAttributes: false });
      const rootGlyphObject: SVGNodeObject = parser.parse(svg);

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

    test('`fill` prop applies CSS color correctly', () => {
      const { container } = render(<Icon glyph="Edit" fill="red" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      // The fill prop should be applied as a CSS color via emotion
      // We check that the SVG has a className (from emotion) and the computed style
      const computedStyle = window.getComputedStyle(svg!);
      expect(computedStyle.color).toBe('red');
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

  describe('accessible props handled correctly', () => {
    test('when no prop is supplied, aria-label is generated', () => {
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

    test('when title is supplied it renders a title element and aria-labelledby', () => {
      render(<EditIcon title="Test title" />);
      const editIcon = screen.getByRole('img');
      expect(editIcon.getAttribute('aria-label')).toBe(null);
      // Should have aria-labelledby instead of title attribute
      const ariaLabelledBy = editIcon.getAttribute('aria-labelledby');
      expect(ariaLabelledBy).not.toBe(null);
      // Should find a title element with matching ID containing the text
      const titleElement = editIcon.querySelector('title');
      expect(titleElement).not.toBe(null);
      expect(titleElement?.textContent).toBe('Test title');
      expect(titleElement?.id).toBe(ariaLabelledBy);
    });

    test('when both title and aria-labelledby are supplied they are combined', () => {
      render(<EditIcon title="Test title" aria-labelledby="external-label" />);
      const editIcon = screen.getByRole('img');
      expect(editIcon.getAttribute('aria-label')).toBe(null);
      const ariaLabelledBy = editIcon.getAttribute('aria-labelledby');
      // Should contain both the title ID and the external label
      expect(ariaLabelledBy).toContain('external-label');
      const titleElement = editIcon.querySelector('title');
      expect(titleElement).not.toBe(null);
      expect(titleElement?.textContent).toBe('Test title');
      // The aria-labelledby should reference both
      expect(ariaLabelledBy).toBe(`${titleElement?.id} external-label`);
    });

    test('when role="presentation", aria-hidden is true', () => {
      render(<EditIcon role="presentation" />);
      const editIcon = screen.getByRole('presentation', { hidden: true });
      expect(editIcon.getAttribute('aria-label')).toBe(null);
      expect(editIcon.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
