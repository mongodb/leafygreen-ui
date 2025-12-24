import React from 'react';
import { render } from '@testing-library/react';

import { CollectionToolbar } from '.';

describe('packages/collection-toolbar', () => {
  test('renders the CollectionToolbar component', () => {
    render(<CollectionToolbar />);
  });
});
