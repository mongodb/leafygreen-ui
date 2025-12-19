import React from 'react';
import { render, screen } from '@testing-library/react';

import { createGlyphComponent } from './createGlyphComponent';
import { createIconComponent } from './createIconComponent';
import * as generatedGlyphs from './generated';
import { Size } from './glyphCommon';
import { isComponentGlyph } from './isComponentGlyph';
import {
  AnotherCustomGlyph,
  createTestSVGRComponent,
  CustomSVGRGlyph,
} from './testUtils';

// Create glyph components from the SVGR components
const customGlyphs = {
  CustomGlyph: createGlyphComponent('CustomGlyph', CustomSVGRGlyph),
  AnotherGlyph: createGlyphComponent('AnotherGlyph', AnotherCustomGlyph),
};

describe('packages/Icon/createIconComponent', () => {
  describe('basic functionality', () => {
    const IconComponent = createIconComponent(customGlyphs);

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
  });

  describe('rendering glyphs', () => {
    const IconComponent = createIconComponent(customGlyphs);

    test('renders the correct glyph when passed a valid glyph name', () => {
      render(<IconComponent glyph="CustomGlyph" />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toBeInTheDocument();
      expect(glyph.nodeName.toLowerCase()).toBe('svg');
    });

    test('renders different glyphs based on glyph prop', () => {
      const { rerender } = render(<IconComponent glyph="CustomGlyph" />);
      expect(screen.getByTestId('custom-svgr-glyph')).toBeInTheDocument();

      rerender(<IconComponent glyph="AnotherGlyph" />);
      expect(screen.getByTestId('another-custom-glyph')).toBeInTheDocument();
    });

    test('logs an error and renders nothing when glyph does not exist', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const { container } = render(<IconComponent glyph="NonExistentGlyph" />);

      // Should log an error
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error in Icon',
        'Could not find glyph named "NonExistentGlyph" in the icon set.',
        undefined,
      );

      // Should not render an SVG
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    test('suggests near match when glyph name has incorrect casing', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<IconComponent glyph="custom-glyph" />);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error in Icon',
        'Could not find glyph named "custom-glyph" in the icon set.',
        'Did you mean "CustomGlyph?"',
      );

      consoleSpy.mockRestore();
    });
  });

  describe('custom SVG support', () => {
    const RawSVGGlyph = createTestSVGRComponent('raw-svg-glyph');

    const customSVGGlyphs = {
      RawSVG: createGlyphComponent('RawSVG', RawSVGGlyph),
    };

    const IconComponent = createIconComponent(customSVGGlyphs);

    test('renders custom SVG components correctly', () => {
      render(<IconComponent glyph="RawSVG" />);
      const glyph = screen.getByTestId('raw-svg-glyph');
      expect(glyph).toBeInTheDocument();
      expect(glyph.nodeName.toLowerCase()).toBe('svg');
    });

    test('applies size prop to custom SVGs', () => {
      render(<IconComponent glyph="RawSVG" size={32} />);
      const glyph = screen.getByTestId('raw-svg-glyph');
      expect(glyph).toHaveAttribute('height', '32');
      expect(glyph).toHaveAttribute('width', '32');
    });

    test('applies Size enum to custom SVGs', () => {
      render(<IconComponent glyph="RawSVG" size={Size.Large} />);
      const glyph = screen.getByTestId('raw-svg-glyph');
      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
    });
  });

  describe('raw SVGR component support (auto-wrapped)', () => {
    // Pass raw SVGR components directly without wrapping with createGlyphComponent
    const RawSVGRGlyph = createTestSVGRComponent('raw-svgr-glyph');

    const IconComponent = createIconComponent({ RawSVGR: RawSVGRGlyph });

    test('automatically wraps raw SVGR components with createGlyphComponent', () => {
      render(<IconComponent glyph="RawSVGR" />);
      const glyph = screen.getByTestId('raw-svgr-glyph');
      expect(glyph).toBeInTheDocument();
      expect(glyph.nodeName.toLowerCase()).toBe('svg');
    });

    test('applies size prop to auto-wrapped SVGR components', () => {
      render(<IconComponent glyph="RawSVGR" size={28} />);
      const glyph = screen.getByTestId('raw-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '28');
      expect(glyph).toHaveAttribute('width', '28');
    });

    test('applies Size enum to auto-wrapped SVGR components', () => {
      render(<IconComponent glyph="RawSVGR" size={Size.XLarge} />);
      const glyph = screen.getByTestId('raw-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '24');
      expect(glyph).toHaveAttribute('width', '24');
    });

    test('applies className to auto-wrapped SVGR components', () => {
      render(<IconComponent glyph="RawSVGR" className="my-raw-class" />);
      const glyph = screen.getByTestId('raw-svgr-glyph');
      expect(glyph).toHaveClass('my-raw-class');
    });

    test('applies fill to auto-wrapped SVGR components', () => {
      render(<IconComponent glyph="RawSVGR" fill="red" />);
      const glyph = screen.getByTestId('raw-svgr-glyph');
      // Fill is applied as a CSS color via an emotion-generated class
      expect(glyph.classList.length).toBeGreaterThan(0);
    });

    test('applies accessibility props to auto-wrapped SVGR components', () => {
      render(<IconComponent glyph="RawSVGR" />);
      const glyph = screen.getByTestId('raw-svgr-glyph');
      expect(glyph).toHaveAttribute('role', 'img');
      // Default aria-label is generated from glyph name
      expect(glyph).toHaveAttribute('aria-label', 'Raw SVGR Icon');
    });
  });

  describe('title prop with custom SVGR glyphs', () => {
    const CustomGlyphWithTitle = createTestSVGRComponent(
      'custom-glyph-with-title',
    );

    const customGlyphsWithTitle = {
      CustomWithTitle: createGlyphComponent(
        'CustomWithTitle',
        CustomGlyphWithTitle,
      ),
    };

    const IconComponent = createIconComponent(customGlyphsWithTitle);

    test('passes title through createGlyphComponent which sets aria-labelledby', () => {
      render(<IconComponent glyph="CustomWithTitle" title="Custom Title" />);
      const glyph = screen.getByTestId('custom-glyph-with-title');
      // createGlyphComponent sets aria-labelledby when title is provided
      const ariaLabelledBy = glyph.getAttribute('aria-labelledby');
      expect(ariaLabelledBy).not.toBeNull();
      expect(ariaLabelledBy).toContain('icon-title');
    });

    test('sets aria-label when no title or aria-labelledby provided', () => {
      render(<IconComponent glyph="CustomWithTitle" />);
      const glyph = screen.getByTestId('custom-glyph-with-title');
      // Default aria-label is generated from glyph name
      expect(glyph).toHaveAttribute('aria-label', 'Custom With Title Icon');
    });
  });

  describe('className prop', () => {
    const IconComponent = createIconComponent(customGlyphs);

    test('applies className to glyph SVG element', () => {
      render(<IconComponent glyph="CustomGlyph" className="custom-class" />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveClass('custom-class');
    });

    test('applies className alongside fill style', () => {
      render(
        <IconComponent
          glyph="CustomGlyph"
          className="custom-class"
          fill="red"
        />,
      );
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveClass('custom-class');
      // fill applies a CSS class for the color style
      const classList = Array.from(glyph.classList);
      expect(classList.length).toBeGreaterThan(1);
    });
  });

  describe('className prop with generated glyphs', () => {
    const IconComponent = createIconComponent(generatedGlyphs);

    test('applies className to generated glyph SVG element', () => {
      render(<IconComponent glyph="Edit" className="generated-glyph-class" />);
      const glyph = screen.getByRole('img');
      expect(glyph).toHaveClass('generated-glyph-class');
    });

    test('applies multiple classNames to generated glyph', () => {
      render(<IconComponent glyph="Edit" className="class-one class-two" />);
      const glyph = screen.getByRole('img');
      expect(glyph).toHaveClass('class-one');
      expect(glyph).toHaveClass('class-two');
    });
  });

  describe('className prop with custom SVGs', () => {
    const RawSVGGlyph = createTestSVGRComponent('raw-svg-for-class');

    const customSVGGlyphs = {
      RawSVG: createGlyphComponent('RawSVG', RawSVGGlyph),
    };

    const IconComponent = createIconComponent(customSVGGlyphs);

    test('applies className to custom SVG components', () => {
      render(<IconComponent glyph="RawSVG" className="my-custom-class" />);
      const glyph = screen.getByTestId('raw-svg-for-class');
      expect(glyph).toHaveClass('my-custom-class');
    });
  });

  describe('size prop', () => {
    const IconComponent = createIconComponent(customGlyphs);

    test('applies numeric size to glyph', () => {
      render(<IconComponent glyph="CustomGlyph" size={24} />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '24');
      expect(glyph).toHaveAttribute('width', '24');
    });

    test('applies Size.Small correctly', () => {
      render(<IconComponent glyph="CustomGlyph" size={Size.Small} />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '14');
      expect(glyph).toHaveAttribute('width', '14');
    });

    test('applies Size.Default correctly', () => {
      render(<IconComponent glyph="CustomGlyph" size={Size.Default} />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '16');
      expect(glyph).toHaveAttribute('width', '16');
    });

    test('applies Size.Large correctly', () => {
      render(<IconComponent glyph="CustomGlyph" size={Size.Large} />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
    });

    test('applies Size.XLarge correctly', () => {
      render(<IconComponent glyph="CustomGlyph" size={Size.XLarge} />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '24');
      expect(glyph).toHaveAttribute('width', '24');
    });

    test('uses default size when size prop is not provided', () => {
      render(<IconComponent glyph="CustomGlyph" />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('height', '16');
      expect(glyph).toHaveAttribute('width', '16');
    });
  });

  describe('accessibility props', () => {
    const IconComponent = createIconComponent(customGlyphs);

    test('applies role="img" by default', () => {
      render(<IconComponent glyph="CustomGlyph" />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('role', 'img');
    });

    test('applies role="presentation" when specified', () => {
      render(<IconComponent glyph="CustomGlyph" role="presentation" />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('role', 'presentation');
      expect(glyph).toHaveAttribute('aria-hidden', 'true');
    });

    test('generates default aria-label when no accessibility props provided', () => {
      render(<IconComponent glyph="CustomGlyph" />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('aria-label', 'Custom Glyph Icon');
    });

    test('applies custom aria-label when provided', () => {
      render(
        <IconComponent glyph="CustomGlyph" aria-label="My Custom Label" />,
      );
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('aria-label', 'My Custom Label');
    });

    test('applies aria-labelledby when provided', () => {
      render(
        <IconComponent glyph="CustomGlyph" aria-labelledby="my-label-id" />,
      );
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveAttribute('aria-labelledby', 'my-label-id');
    });
  });

  describe('fill prop', () => {
    const IconComponent = createIconComponent(customGlyphs);

    test('applies fill as CSS color via className', () => {
      render(<IconComponent glyph="CustomGlyph" fill="red" />);
      const glyph = screen.getByTestId('custom-svgr-glyph');
      // Fill is applied as a CSS color via an emotion-generated class
      expect(glyph).toHaveAttribute('class');
      expect(glyph.classList.length).toBeGreaterThan(0);
    });

    test('applies fill alongside className', () => {
      render(
        <IconComponent
          glyph="CustomGlyph"
          fill="blue"
          className="custom-class"
        />,
      );
      const glyph = screen.getByTestId('custom-svgr-glyph');
      expect(glyph).toHaveClass('custom-class');
      // Fill adds an emotion class in addition to custom-class
      expect(glyph.classList.length).toBeGreaterThan(1);
    });
  });

  describe('fill prop with generated glyphs', () => {
    const IconComponent = createIconComponent(generatedGlyphs);

    test('applies fill as CSS color to generated glyph', () => {
      render(<IconComponent glyph="Edit" fill="purple" />);
      const glyph = screen.getByRole('img');
      // Fill is applied as a CSS color via an emotion-generated class
      expect(glyph).toHaveAttribute('class');
      expect(glyph.classList.length).toBeGreaterThan(0);
    });
  });

  describe('combined props with generated glyphs', () => {
    const IconComponent = createIconComponent(generatedGlyphs);

    test('applies all props correctly together', () => {
      render(
        <IconComponent
          glyph="Edit"
          size={24}
          className="combined-class"
          title="Combined Title"
          fill="green"
        />,
      );
      const glyph = screen.getByRole('img');

      expect(glyph).toHaveAttribute('height', '24');
      expect(glyph).toHaveAttribute('width', '24');
      expect(glyph).toHaveClass('combined-class');

      // Check title
      const titleElement = glyph.querySelector('title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement?.textContent).toBe('Combined Title');

      // Check aria-labelledby points to title
      expect(glyph.getAttribute('aria-labelledby')).toBe(titleElement?.id);

      // Fill adds an emotion class in addition to combined-class
      expect(glyph.classList.length).toBeGreaterThan(1);
    });
  });

  describe('combined props with custom SVGR glyphs', () => {
    const IconComponent = createIconComponent(customGlyphs);

    test('applies size, className, and fill together', () => {
      render(
        <IconComponent
          glyph="CustomGlyph"
          size={32}
          className="combined-custom-class"
          fill="orange"
        />,
      );
      const glyph = screen.getByTestId('custom-svgr-glyph');

      expect(glyph).toHaveAttribute('height', '32');
      expect(glyph).toHaveAttribute('width', '32');
      expect(glyph).toHaveClass('combined-custom-class');
      // Fill adds an emotion class in addition to combined-custom-class
      expect(glyph.classList.length).toBeGreaterThan(1);
    });

    test('applies accessibility props with className', () => {
      render(
        <IconComponent
          glyph="CustomGlyph"
          className="accessible-class"
          aria-label="Accessible Custom Icon"
        />,
      );
      const glyph = screen.getByTestId('custom-svgr-glyph');

      expect(glyph).toHaveClass('accessible-class');
      expect(glyph).toHaveAttribute('aria-label', 'Accessible Custom Icon');
    });
  });
});
