import React from 'react';
import { render, screen } from '@testing-library/react';

import { CollectionToolbarActions } from '.';

describe('packages/collection-toolbar-actions', () => {
  test('renders correctly', () => {
    render(
      <CollectionToolbarActions>
        <button>Primary Action</button>
        <button>Secondary Action</button>
      </CollectionToolbarActions>,
    );
    expect(screen.getByText('Collection Toolbar Actions')).toBeInTheDocument();
  });
});
