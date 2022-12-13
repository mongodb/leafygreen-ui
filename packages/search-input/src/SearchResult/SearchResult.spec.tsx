import React from 'react';
import { render } from '@testing-library/react';

import { SearchResult } from './SearchResult';

describe('packages/search-input/search-result', () => {
  test('isPolymorphic', () => {
    expect(SearchResult).toBePolymorphic();
  });
});
