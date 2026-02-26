import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../testing/getTestUtils';

import { CardSkeleton } from './CardSkeleton';

describe('packages/skeleton-loader/CardSkeleton', () => {
  test('renders', () => {
    render(<CardSkeleton />);
    const { getSkeletonLoader } = getTestUtils();
    expect(getSkeletonLoader()).toBeInTheDocument();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<CardSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
