import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../testing/getTestUtils';

import { FormSkeleton } from './FormSkeleton';

describe('packages/skeleton-loader/FormSkeleton', () => {
  test('renders', () => {
    render(<FormSkeleton />);
    const { getSkeletonLoader } = getTestUtils();
    expect(getSkeletonLoader()).toBeInTheDocument();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<FormSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
