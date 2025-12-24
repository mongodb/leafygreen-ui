import React from 'react';
import { render, screen } from '@testing-library/react';

import { CollectionToolbar } from '.';

describe('packages/collection-toolbar', () => {
  test('renders correctly', () => {
    render(<CollectionToolbar>Collection Toolbar</CollectionToolbar>);
    expect(screen.getByText('Collection Toolbar')).toBeInTheDocument();
  });
});
