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

  describe('variant: default', () => {
    test('renders actions before filters', () => {
      render(
        <CollectionToolbar variant={Variant.Default}>
          <CollectionToolbar.Filters>
            <CollectionToolbar.Filters.TextInput aria-label="Filter" />
          </CollectionToolbar.Filters>
          <CollectionToolbar.Actions>
            <CollectionToolbar.Actions.Button>Action</CollectionToolbar.Actions.Button>
          </CollectionToolbar.Actions>
        </CollectionToolbar>,
      );

      const utils = getTestUtils();
      const actions = utils.getActions();
      const filters = utils.getFilters();

      // Both should be rendered
      expect(actions).toBeInTheDocument();
      expect(filters).toBeInTheDocument();

      // Actions should come before filters in DOM order
      // Using compareDocumentPosition: DOCUMENT_POSITION_FOLLOWING (4) means the node follows
      expect(
        actions?.compareDocumentPosition(filters!),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('variant: compact', () => {
    test('renders filters before actions', () => {
      render(
        <CollectionToolbar variant={Variant.Compact}>
          <CollectionToolbar.Filters>
            <CollectionToolbar.Filters.TextInput aria-label="Filter" />
          </CollectionToolbar.Filters>
          <CollectionToolbar.Actions>
            <CollectionToolbar.Actions.Button>Action</CollectionToolbar.Actions.Button>
          </CollectionToolbar.Actions>
        </CollectionToolbar>,
      );

      const utils = getTestUtils();
      const actions = utils.getActions();
      const filters = utils.getFilters();

      // Both should be rendered
      expect(actions).toBeInTheDocument();
      expect(filters).toBeInTheDocument();

      // Filters should come before actions in DOM order
      expect(
        filters?.compareDocumentPosition(actions!),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
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

    test('does not render filters in main row (only in collapsible content)', () => {
      render(
        <CollectionToolbar variant={Variant.Collapsible}>
          <CollectionToolbar.Title>Test Title</CollectionToolbar.Title>
          <CollectionToolbar.Filters>
            <CollectionToolbar.Filters.TextInput aria-label="Filter" />
          </CollectionToolbar.Filters>
          <CollectionToolbar.Actions showToggleButton>
            <CollectionToolbar.Actions.Button>Action</CollectionToolbar.Actions.Button>
          </CollectionToolbar.Actions>
        </CollectionToolbar>,
      );

      const utils = getTestUtils();
      const actions = utils.getActions();
      const filters = utils.getFilters();

      // Both should be rendered
      expect(actions).toBeInTheDocument();
      expect(filters).toBeInTheDocument();

      // Filters should be inside the collapsible content, not a sibling of actions
      // Actions should NOT have filters as a direct following sibling
      expect(actions?.nextElementSibling).not.toBe(filters);
    });
  });
});
