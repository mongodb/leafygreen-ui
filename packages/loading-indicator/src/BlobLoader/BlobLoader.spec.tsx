import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BlobLoader from './BlobLoader';

describe('packages/loading-indicator/blob-loader', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<BlobLoader />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe('description prop', () => {
    test('renders description', async () => {
      const descriptionText = 'test description';
      const { getByText } = render(
        <BlobLoader description={descriptionText} />,
      );
      expect(getByText(descriptionText)).toBeInTheDocument();
    });
  });
});
