import React from 'react';
import { render, screen } from '@testing-library/react';

import { Variant } from '../shared.types';
import { getTestUtils } from '../testing/getTestUtils';

import { CollectionToolbar } from '.';

describe('packages/collection-toolbar', () => {
  test('renders correctly', () => {
    render(<CollectionToolbar />);
    const utils = getTestUtils();
    expect(utils.getCollectionToolbar()).toBeInTheDocument();
  });

  test('applies className to the root element', () => {
    render(<CollectionToolbar className="test-class" />);
    const utils = getTestUtils();
    expect(utils.getCollectionToolbar()?.className).toContain('test-class');
  });

  describe('variant: collapsible', () => {
    test('renders title when variant is collapsible', () => {
      render(
        <CollectionToolbar variant={Variant.Collapsible}>
          <CollectionToolbar.Title>Test Title</CollectionToolbar.Title>
        </CollectionToolbar>,
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('does not render title when variant is not collapsible', () => {
      render(
        <CollectionToolbar variant={Variant.Default}>
          <CollectionToolbar.Title>Test Title</CollectionToolbar.Title>
        </CollectionToolbar>,
      );
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });
  });
});
