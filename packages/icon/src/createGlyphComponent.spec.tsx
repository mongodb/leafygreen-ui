import React from 'react';
import { render, screen } from '@testing-library/react';

import { createGlyphComponent } from './createGlyphComponent';
import { Size } from './glyphCommon';
import { isComponentGlyph } from './isComponentGlyph';
import { TestSVGRGlyph, TestSVGRGlyphWithChildren } from './testUtils';

describe('packages/Icon/createGlyphComponent', () => {
  describe('basic functionality', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('returns a function', () => {
      expect(typeof GlyphComponent).toBe('function');
    });

    test('returned component has the correct displayName', () => {
      expect(GlyphComponent.displayName).toBe('TestGlyph');
    });

    test('returned component has the property `isGlyph`', () => {
      expect(GlyphComponent).toHaveProperty('isGlyph');
      expect(GlyphComponent.isGlyph).toBe(true);
    });

    test('returned component passes `isComponentGlyph`', () => {
      expect(isComponentGlyph(GlyphComponent)).toBe(true);
    });
  });

  describe('rendering', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('renders an SVG element', () => {
      render(<GlyphComponent />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toBeInTheDocument();
      expect(glyph.nodeName.toLowerCase()).toBe('svg');
    });

    test('passes through additional props to the SVG element', () => {
      render(<GlyphComponent data-custom="custom-value" />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('data-custom', 'custom-value');
    });
  });

  describe('size prop', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('applies numeric size to height and width', () => {
      render(<GlyphComponent size={24} />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('height', '24');
      expect(glyph).toHaveAttribute('width', '24');
    });

    test('applies Size.Small correctly (14px)', () => {
      render(<GlyphComponent size={Size.Small} />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('height', '14');
      expect(glyph).toHaveAttribute('width', '14');
    });

    test('applies Size.Default correctly (16px)', () => {
      render(<GlyphComponent size={Size.Default} />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('height', '16');
      expect(glyph).toHaveAttribute('width', '16');
    });

    test('applies Size.Large correctly (20px)', () => {
      render(<GlyphComponent size={Size.Large} />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
    });

    test('applies Size.XLarge correctly (24px)', () => {
      render(<GlyphComponent size={Size.XLarge} />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('height', '24');
      expect(glyph).toHaveAttribute('width', '24');
    });

    test('uses Size.Default (16px) when size prop is not provided', () => {
      render(<GlyphComponent />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('height', '16');
      expect(glyph).toHaveAttribute('width', '16');
    });
  });

  describe('fill prop', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('applies fill as CSS color via className', () => {
      render(<GlyphComponent fill="red" />);
      const glyph = screen.getByTestId('mock-glyph');
      // Fill is applied as a CSS color via an emotion-generated class
      expect(glyph).toHaveAttribute('class');
      expect(glyph.className).not.toBe('');
    });

    test('does not apply fill style class when fill is not provided', () => {
      render(<GlyphComponent />);
      const glyph = screen.getByTestId('mock-glyph');
      // When no fill is provided, no emotion class should be applied
      expect(glyph.classList.length).toBe(0);
    });

    test('applies fill alongside other props', () => {
      render(<GlyphComponent fill="blue" className="custom-class" size={32} />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveClass('custom-class');
      expect(glyph).toHaveAttribute('height', '32');
      expect(glyph).toHaveAttribute('width', '32');
      // Fill adds an emotion class in addition to custom-class
      expect(glyph.classList.length).toBeGreaterThan(1);
    });
  });

  describe('className prop', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('applies className to the SVG element', () => {
      render(<GlyphComponent className="my-custom-class" />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveClass('my-custom-class');
    });
  });

  describe('role prop', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('applies role="img" by default', () => {
      render(<GlyphComponent />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('role', 'img');
    });

    test('applies role="presentation" when specified', () => {
      render(<GlyphComponent role="presentation" />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('role', 'presentation');
      expect(glyph).toHaveAttribute('aria-hidden', 'true');
    });

    test('logs a warning when an invalid role is provided', () => {
      const consoleSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      // @ts-expect-error - intentionally passing invalid role for testing
      // eslint-disable-next-line jsx-a11y/aria-role
      render(<GlyphComponent role="invalid" />);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Please provide a valid role to this component. Valid options are 'img' and 'presentation'. If you'd like the Icon to be accessible to screen readers please use 'img', otherwise set the role to 'presentation'.",
      );

      consoleSpy.mockRestore();
    });
  });

  describe('accessibility props', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('generates default aria-label from glyph name when no accessibility props provided', () => {
      render(<GlyphComponent />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('aria-label', 'Test Glyph Icon');
    });

    test('applies custom aria-label when provided', () => {
      render(<GlyphComponent aria-label="My Custom Label" />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('aria-label', 'My Custom Label');
    });

    test('applies aria-labelledby when provided', () => {
      render(<GlyphComponent aria-labelledby="my-label-id" />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('aria-labelledby', 'my-label-id');
    });

    test('sets aria-labelledby when title is provided', () => {
      render(<GlyphComponent title="Test Title" />);
      const glyph = screen.getByTestId('mock-glyph');
      const ariaLabelledBy = glyph.getAttribute('aria-labelledby');
      expect(ariaLabelledBy).not.toBeNull();
      expect(ariaLabelledBy).toContain('icon-title');
    });

    test('combines title ID with aria-labelledby when both are provided', () => {
      render(
        <GlyphComponent title="Test Title" aria-labelledby="external-label" />,
      );
      const glyph = screen.getByTestId('mock-glyph');

      const ariaLabelledBy = glyph.getAttribute('aria-labelledby');
      expect(ariaLabelledBy).toContain('external-label');
      expect(ariaLabelledBy).toContain('icon-title');
    });

    test('sets the title ID when title is provided', () => {
      render(<GlyphComponent title="Test Title" />);
      const glyph = screen.getByTestId('mock-glyph');
      const titleId = glyph.getAttribute('aria-labelledby');
      expect(titleId).not.toBeNull();
      expect(titleId).toContain('icon-title');
    });

    test('sets aria-hidden to true when role is presentation', () => {
      render(<GlyphComponent role="presentation" />);
      const glyph = screen.getByTestId('mock-glyph');
      expect(glyph).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('title prop', () => {
    const GlyphComponent = createGlyphComponent(
      'TestGlyph',
      TestSVGRGlyphWithChildren,
    );

    test('does not include title in children when title is not provided', () => {
      render(<GlyphComponent />);
      const glyph = screen.getByTestId('mock-glyph-with-children');
      const titleElement = glyph.querySelector('title');
      expect(titleElement).not.toBeInTheDocument();
    });
  });

  describe('combined props', () => {
    const GlyphComponent = createGlyphComponent('TestGlyph', TestSVGRGlyph);

    test('applies all props correctly together', () => {
      render(
        <GlyphComponent
          size={32}
          className="combined-class"
          fill="purple"
          aria-label="Combined Icon"
        />,
      );
      const glyph = screen.getByTestId('mock-glyph');

      expect(glyph).toHaveAttribute('height', '32');
      expect(glyph).toHaveAttribute('width', '32');
      expect(glyph).toHaveClass('combined-class');
      expect(glyph).toHaveAttribute('aria-label', 'Combined Icon');
      // Fill adds an emotion class in addition to combined-class
      expect(glyph.classList.length).toBeGreaterThan(1);
    });

    test('applies size enum with className and role', () => {
      render(
        <GlyphComponent
          size={Size.Large}
          className="accessible-class"
          role="presentation"
        />,
      );
      const glyph = screen.getByTestId('mock-glyph');

      expect(glyph).toHaveAttribute('height', '20');
      expect(glyph).toHaveAttribute('width', '20');
      expect(glyph).toHaveClass('accessible-class');
      expect(glyph).toHaveAttribute('role', 'presentation');
      expect(glyph).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
