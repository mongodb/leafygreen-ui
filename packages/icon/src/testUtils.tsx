import React from 'react';

import { SVGR } from './types';

/**
 * Creates a mock SVGR component for testing purposes.
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
