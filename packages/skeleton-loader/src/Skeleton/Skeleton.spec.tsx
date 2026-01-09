import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Skeleton } from './Skeleton';
import { getTestUtils } from '../testing/getTestUtils';

describe('packages/skeleton-loader/Skeleton', () => {
  test('renders', () => {
    render(<Skeleton />);
    const { getSkeletonLoader } = getTestUtils();
    expect(getSkeletonLoader()).toBeInTheDocument();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Skeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
