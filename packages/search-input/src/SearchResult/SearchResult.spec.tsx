import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { SearchResult } from './SearchResult';

describe('packages/search-input/search-result', () => {
  test('No a11y issues', async () => {
    const { container } = render(
      <SearchResult aria-label="Label">title</SearchResult>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('isPolymorphic', () => {
    expect(SearchResult).toBePolymorphic();
  });
});
