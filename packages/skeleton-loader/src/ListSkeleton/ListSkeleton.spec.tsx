import React from 'react';
import { render, screen } from '@testing-library/react';

import { getTestUtils } from '../testing/getTestUtils';

import { ListSkeleton } from '.';

describe('packages/skeleton-list', () => {
  test('renders', () => {
    render(<ListSkeleton />);
    const { getSkeletonLoader } = getTestUtils();
    expect(getSkeletonLoader()).toBeInTheDocument();
  });

  test('renders `count` items', () => {
    render(<ListSkeleton count={3} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });
});
