import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { CardSkeleton } from './CardSkeleton';

describe('packages/skeleton-loader/CardSkeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<CardSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
