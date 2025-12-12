import React from 'react';

import { SVGR } from './types';

/**
 * Creates a mock SVGR component for testing purposes
 * @param testId - The data-testid to apply to the SVG element
 */
export const createMockSVGRComponent = (testId: string): SVGR.Component => {
  const MockComponent: SVGR.Component = ({ children, ...props }) => (
    <svg data-testid={testId} {...props}>
      {children}
    </svg>
  );
  return MockComponent;
};

// Pre-built mock components for common test scenarios
export const MockSVGRGlyph = createMockSVGRComponent('mock-glyph');
export const MockSVGRGlyphWithChildren = createMockSVGRComponent(
  'mock-glyph-with-children',
);
export const CustomSVGRGlyph = createMockSVGRComponent('custom-svgr-glyph');
export const AnotherCustomGlyph = createMockSVGRComponent(
  'another-custom-glyph',
);

/**
 * Size enum values and their expected pixel values for testing
 */
export const sizeTestCases = [
  { size: 'small', enumValue: 'Small', expected: '14' },
  { size: 'default', enumValue: 'Default', expected: '16' },
  { size: 'large', enumValue: 'Large', expected: '20' },
  { size: 'xlarge', enumValue: 'XLarge', expected: '24' },
] as const;

/**
 * Asserts that an element has the expected height and width attributes
 */
export const expectSize = (element: HTMLElement, size: string) => {
  expect(element).toHaveAttribute('height', size);
  expect(element).toHaveAttribute('width', size);
};

/**
 * Asserts that an element has the expected fill color applied via CSS
 */
export const expectFillColor = (element: HTMLElement, color: string) => {
  const computedStyle = window.getComputedStyle(element);
  expect(computedStyle.color).toBe(color);
};
