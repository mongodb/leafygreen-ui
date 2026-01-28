import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { consoleOnce } from '@leafygreen-ui/lib';

import { CollectionToolbarProvider } from '../../Context/CollectionToolbarProvider';
import {
  CollectionToolbarActionsSubComponentProperty,
  Size,
  Variant,
} from '../../shared.types';
import { getTestUtils } from '../../testing/getTestUtils';
import { getLgIds } from '../../utils';

import { Actions } from './Actions';

jest.mock('@leafygreen-ui/lib', () => ({
  ...jest.requireActual('@leafygreen-ui/lib'),
  consoleOnce: {
    error: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
  },
}));

const lgIds = getLgIds();
const { getActions } = getTestUtils();

const renderActions = ({
  children,
  isCollapsed = false,
  variant = Variant.Default,
  size = Size.Default,
  ...props
}: {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  isCollapsed?: boolean;
} & React.ComponentProps<typeof Actions> = {}) => {
  return render(
    <CollectionToolbarProvider
      lgIds={lgIds}
      variant={variant}
      size={size}
      isCollapsed={isCollapsed}
    >
      <Actions {...props}>{children}</Actions>
    </CollectionToolbarProvider>,
  );
};

describe('packages/collection-toolbar/components/Actions', () => {
  describe('rendering', () => {
    test('renders container with correct data-testid and data-lgid', () => {
      renderActions();
      const actionsContainer = getActions();
      expect(actionsContainer).toBeInTheDocument();
      expect(actionsContainer).toHaveAttribute('data-lgid', lgIds.actions);
    });

    test('renders children Button components', () => {
      renderActions({
        children: (
          <>
            <Actions.Button>Button 1</Actions.Button>
            <Actions.Button>Button 2</Actions.Button>
          </>
        ),
      });
      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
    });

    test('limits rendered buttons to maximum of 2 and logs console error', () => {
      renderActions({
        children: (
          <>
            <Actions.Button>Button 1</Actions.Button>
            <Actions.Button>Button 2</Actions.Button>
            <Actions.Button>Button 3</Actions.Button>
          </>
        ),
      });

      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
      expect(screen.queryByText('Button 3')).not.toBeInTheDocument();

      expect(consoleOnce.error).toHaveBeenCalledWith(
        'CollectionToolbarActions can only have up to 2 buttons',
      );
    });
  });

  describe('Pagination visibility', () => {
    const paginationProps = {
      currentPage: 1,
      numTotalItems: 100,
      itemsPerPage: 10,
      onBackArrowClick: jest.fn(),
      onForwardArrowClick: jest.fn(),
    };

    test('renders Pagination when variant is "default" and Pagination child is provided', () => {
      renderActions({
        variant: Variant.Default,
        children: <Actions.Pagination {...paginationProps} />,
      });
      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    });

    test('does not render Pagination when variant is "compact"', () => {
      renderActions({
        variant: Variant.Compact,
        children: <Actions.Pagination {...paginationProps} />,
      });
      expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
    });

    test('does not render Pagination when variant is "collapsible"', () => {
      renderActions({
        variant: Variant.Collapsible,
        children: <Actions.Pagination {...paginationProps} />,
      });
      expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
    });
  });

  describe('Menu visibility', () => {
    test('renders Menu when variant is "default" and Menu child is provided', () => {
      renderActions({
        variant: Variant.Default,
        children: (
          <Actions.Menu>
            <Actions.Menu.MenuItem>Item 1</Actions.Menu.MenuItem>
          </Actions.Menu>
        ),
      });
      expect(screen.getByLabelText('More options')).toBeInTheDocument();
    });

    test('renders Menu when variant is "compact" and Menu child is provided', () => {
      renderActions({
        variant: Variant.Compact,
        children: (
          <Actions.Menu>
            <Actions.Menu.MenuItem>Item 1</Actions.Menu.MenuItem>
          </Actions.Menu>
        ),
      });
      expect(screen.getByLabelText('More options')).toBeInTheDocument();
    });

    test('does not render Menu when variant is "collapsible"', () => {
      renderActions({
        variant: Variant.Collapsible,
        children: (
          <Actions.Menu>
            <Actions.Menu.MenuItem>Item 1</Actions.Menu.MenuItem>
          </Actions.Menu>
        ),
      });
      expect(screen.queryByLabelText('More options')).not.toBeInTheDocument();
    });
  });

  describe('Toggle button (Collapsible variant)', () => {
    test('renders toggle IconButton when variant is "collapsible" and showToggleButton is true', () => {
      renderActions({ variant: Variant.Collapsible, showToggleButton: true });
      expect(screen.getByLabelText('Toggle collapse')).toBeInTheDocument();
    });

    test('does not render toggle IconButton when variant is "collapsible" and showToggleButton is false', () => {
      renderActions({ variant: Variant.Collapsible, showToggleButton: false });
      expect(
        screen.queryByLabelText('Toggle collapse'),
      ).not.toBeInTheDocument();
    });

    test('does not render toggle IconButton when variant is "default"', () => {
      renderActions({ variant: Variant.Default });
      expect(
        screen.queryByLabelText('Toggle collapse'),
      ).not.toBeInTheDocument();
    });

    test('does not render toggle IconButton when showToggleButton is false', () => {
      renderActions({ variant: Variant.Collapsible, showToggleButton: false });
      expect(
        screen.queryByLabelText('Toggle collapse'),
      ).not.toBeInTheDocument();
    });

    test('toggle IconButton has aria-label "Toggle collapse"', () => {
      renderActions({ variant: Variant.Collapsible, showToggleButton: true });
      const toggleButton = screen.getByLabelText('Toggle collapse');
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle collapse');
    });

    test('toggle IconButton has aria-expanded "false" when isCollapsed is true', () => {
      renderActions({
        variant: Variant.Collapsible,
        showToggleButton: true,
        isCollapsed: true,
      });
      const toggleButton = screen.getByLabelText('Toggle collapse');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('toggle IconButton has aria-expanded "true" when isCollapsed is false', () => {
      renderActions({
        variant: Variant.Collapsible,
        showToggleButton: true,
        isCollapsed: false,
      });
      const toggleButton = screen.getByLabelText('Toggle collapse');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('does not render toggle IconButton when variant is "compact"', () => {
      renderActions({ variant: Variant.Compact });
      expect(
        screen.queryByLabelText('Toggle collapse'),
      ).not.toBeInTheDocument();
    });

    test('toggle button has aria-label "Toggle collapse"', () => {
      renderActions({ variant: Variant.Collapsible, showToggleButton: true });
      const toggleButton = screen.getByLabelText('Toggle collapse');
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle collapse');
    });

    test('tooltip shows "Hide filters" when isCollapsed is false', async () => {
      renderActions({
        variant: Variant.Collapsible,
        showToggleButton: true,
        isCollapsed: false,
      });
      const toggleButton = screen.getByLabelText('Toggle collapse');

      userEvent.hover(toggleButton);

      await waitFor(() => {
        expect(screen.getByText('Hide filters')).toBeInTheDocument();
      });
    });

    test('tooltip shows "Show filters" when isCollapsed is true', async () => {
      renderActions({
        variant: Variant.Collapsible,
        showToggleButton: true,
        isCollapsed: true,
      });
      const toggleButton = screen.getByLabelText('Toggle collapse');

      userEvent.hover(toggleButton);

      await waitFor(() => {
        expect(screen.getByText('Show filters')).toBeInTheDocument();
      });
    });

    test('clicking toggle button toggles the collapsed state', async () => {
      renderActions({
        variant: Variant.Collapsible,
        showToggleButton: true,
        isCollapsed: false,
      });
      const toggleButton = screen.getByLabelText('Toggle collapse');

      userEvent.hover(toggleButton);
      await waitFor(() => {
        expect(screen.getByText('Hide filters')).toBeInTheDocument();
      });

      userEvent.click(toggleButton);

      await waitFor(() => {
        expect(screen.getByText('Show filters')).toBeInTheDocument();
      });
    });
  });

  describe('props & styling', () => {
    test('applies className prop to container', () => {
      renderActions({ className: 'custom-class' });
      const actionsContainer = getActions();
      expect(actionsContainer).toHaveClass('custom-class');
    });

    test('spreads additional props to container element', () => {
      renderActions({
        'aria-label': 'Action buttons',
        id: 'custom-id',
      } as React.ComponentProps<typeof Actions>);

      const actionsContainer = getActions();
      expect(actionsContainer).toHaveAttribute('aria-label', 'Action buttons');
      expect(actionsContainer).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('compound component', () => {
    test('has the correct static property for compound component identification', () => {
      expect(Actions[CollectionToolbarActionsSubComponentProperty.Button]).toBe(
        undefined,
      );
      // Actions uses CollectionToolbarSubComponentProperty.Actions as key
    });

    test('exposes Button as a static property', () => {
      expect(Actions.Button).toBeDefined();
    });

    test('exposes Pagination as a static property', () => {
      expect(Actions.Pagination).toBeDefined();
    });

    test('exposes Menu as a static property', () => {
      expect(Actions.Menu).toBeDefined();
    });
  });
});
