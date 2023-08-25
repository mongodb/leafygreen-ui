import React from 'react';
import { render } from '@testing-library/react';

import { SearchResult } from './SearchResult';

describe('packages/search-input/search-result', () => {
  test('Basic rendering', () => {
    const { container } = render(<SearchResult>Content</SearchResult>);
    expect(container.textContent).toBe('Content');
  });
});
