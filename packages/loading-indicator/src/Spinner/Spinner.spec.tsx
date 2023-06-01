import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Spinner from './Spinner';

describe('packages/loading-indicator/spinner', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Spinner />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe('description prop', () => {
    test('renders description', async () => {
      const descriptionText = 'test description';
      const { getByText } = render(<Spinner description={descriptionText} />);
      expect(getByText(descriptionText)).toBeInTheDocument();
    });
  });
});
