import React from 'react';
import { render } from '@testing-library/react';

import BlobLoader from './BlobLoader';

describe('packages/loading-indicator/blob-loader', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const results = render(<BlobLoader />);
      expect(results).toHaveNoViolations();
    });
  });
});
