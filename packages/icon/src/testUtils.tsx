import React from 'react';

import { SVGR } from './types';

/**
 * Creates a mock SVGR component for testing purposes
 * @param testId - The data-testid to apply to the SVG element
 */
export const createTestSVGRComponent = (testId: string): SVGR.Component => {
  const TestComponent: SVGR.Component = ({ children, ...props }) => (
    <svg data-testid={testId} {...props}>
      {children}
    </svg>
  );
  return TestComponent;
};

// Pre-built mock components for common test scenarios
export const TestSVGRGlyph = createTestSVGRComponent('mock-glyph');
export const TestSVGRGlyphWithChildren = createTestSVGRComponent(
  'mock-glyph-with-children',
);
export const CustomSVGRGlyph = createTestSVGRComponent('custom-svgr-glyph');
export const AnotherCustomGlyph = createTestSVGRComponent(
  'another-custom-glyph',
);

// /**
//  * Asserts that an element has the expected height and width attributes
//  */
// export const expectSize = (element: HTMLElement, size: string) => {
//   expect(element).toHaveAttribute('height', size);
//   expect(element).toHaveAttribute('width', size);
// };

// /**
//  * Asserts that an element has the expected fill color applied via CSS
//  */
// export const expectFillColor = (element: HTMLElement, color: string) => {
//   const computedStyle = window.getComputedStyle(element);
//   expect(computedStyle.color).toBe(color);
// };
