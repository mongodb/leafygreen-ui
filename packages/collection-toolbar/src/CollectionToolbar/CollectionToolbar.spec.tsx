import React from 'react';
import { render, screen } from '@testing-library/react';

<<<<<<< HEAD
import { Variant } from '../shared.types';
import { getTestUtils } from '../testing/getTestUtils';

import { CollectionToolbar } from '.';
=======
import { CollectionToolbar, Variant } from '.';
>>>>>>> d84c9e296 (updated tests, linitng cleanup)

describe('packages/collection-toolbar', () => {
  test('renders correctly', () => {
    render(<CollectionToolbar />);
<<<<<<< HEAD
    const utils = getTestUtils();
    expect(utils.getCollectionToolbar()).toBeInTheDocument();
=======
    expect(screen.getByTestId('lg-collection_toolbar')).toBeInTheDocument();
>>>>>>> d84c9e296 (updated tests, linitng cleanup)
  });

  test('applies className to the root element', () => {
    render(<CollectionToolbar className="test-class" />);
<<<<<<< HEAD
    const utils = getTestUtils();
    expect(utils.getCollectionToolbar()?.className).toContain('test-class');
=======
    expect(screen.getByTestId('lg-collection_toolbar')).toHaveClass(
      'test-class',
    );
>>>>>>> d84c9e296 (updated tests, linitng cleanup)
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
