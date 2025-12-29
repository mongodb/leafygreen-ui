import React from 'react';
import { render, screen } from '@testing-library/react';

import { CollectionToolbar, Variant } from '.';

describe('packages/collection-toolbar', () => {
  test('renders correctly', () => {
    render(<CollectionToolbar />);
    expect(screen.getByTestId('lg-collection_toolbar')).toBeInTheDocument();
  });

  test('applies className to the root element', () => {
    render(<CollectionToolbar className="test-class" />);
    expect(screen.getByTestId('lg-collection_toolbar')).toHaveClass(
      'test-class',
    );
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
