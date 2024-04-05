import React from 'react';
import { render } from '@testing-library/react';

import { ListSkeleton } from '.';

describe('packages/skeleton-list', () => {
  test('renders', () => {
    const { queryByTestId } = render(<ListSkeleton />);
    expect(queryByTestId('lg-skeleton-list')).toBeInTheDocument();
  });

  test('renders `count` items', () => {
    const { queryAllByTestId } = render(<ListSkeleton count={3} />);
    const listItems = queryAllByTestId('lg-skeleton-list_item');
    expect(listItems.length).toBe(3);
  });
});
