import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../testing/getTestUtils';

import { CodeSkeleton } from './CodeSkeleton';

describe('packages/skeleton-loader/CodeSkeleton', () => {
  test('renders', () => {
    render(<CodeSkeleton />);
    const { getSkeletonLoader } = getTestUtils();
    expect(getSkeletonLoader()).toBeInTheDocument();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<CodeSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
