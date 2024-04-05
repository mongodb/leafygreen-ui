import React from 'react';
import { render } from '@testing-library/react';

import { ListSkeleton } from '.';

describe('packages/skeleton-list', () => {
  test('condition', () => {
    const { queryByTestId } = render(<ListSkeleton />);
    expect(queryByTestId('lg-skeleton-list')).toBeInTheDocument();
  });
});
