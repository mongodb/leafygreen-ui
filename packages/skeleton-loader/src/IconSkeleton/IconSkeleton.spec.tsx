import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { IconSkeleton } from './IconSkeleton';

describe('packages/skeleton-loader/IconSkeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<IconSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
