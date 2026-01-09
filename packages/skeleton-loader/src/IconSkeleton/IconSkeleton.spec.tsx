import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../testing/getTestUtils';

import { IconSkeleton } from './IconSkeleton';

describe('packages/skeleton-loader/IconSkeleton', () => {
  test('renders', () => {
    render(<IconSkeleton />);
    const { getSkeletonLoader } = getTestUtils();
    expect(getSkeletonLoader()).toBeInTheDocument();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<IconSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
