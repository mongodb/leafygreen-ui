import React from 'react';
import { render } from '@testing-library/react';

import { TestDescendant, TestParent } from './test/testutils';

describe('packages/descendants', () => {
  test('renders a basic list of descendants', () => {
    const { getAllByTestId } = render(
      <TestParent>
        <TestDescendant data-testid="descendant">Apple</TestDescendant>
        <TestDescendant data-testid="descendant">Banana</TestDescendant>
        <TestDescendant data-testid="descendant">Carrot</TestDescendant>
      </TestParent>,
    );

    const descendantElements = getAllByTestId('descendant');

    // Test that each descendant knows what its index is
    descendantElements.forEach((el, i) => {
      const renderedIndex = el.dataset['index'];
      expect(renderedIndex).toEqual(i);
    });
  });

  test('renders a nested list of descendants', () => {
    const { getAllByTestId } = render(
      <TestParent>
        <TestDescendant data-testid="descendant">
          Peppers
          <TestDescendant data-testid="descendant">
            Bell
            <TestDescendant data-testid="descendant">Yellow</TestDescendant>
          </TestDescendant>
        </TestDescendant>
      </TestParent>,
    );

    const descendantElements = getAllByTestId('descendant');

    // Test that each descendant knows what its index is
    descendantElements.forEach((el, i) => {
      const renderedIndex = el.dataset['index'];
      expect(renderedIndex).toEqual(i);
    });
  });
});
