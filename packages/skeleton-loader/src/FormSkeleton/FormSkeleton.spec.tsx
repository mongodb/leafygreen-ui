import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FormSkeleton } from './FormSkeleton';

describe('packages/skeleton-loader/FormSkeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<FormSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
