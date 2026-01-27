import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CollectionToolbarProvider } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';
import { getLgIds } from '../../../utils';

import { Menu } from './Menu';

const renderMenu = ({
  children = <Menu.MenuItem>Test Item</Menu.MenuItem>,
  ...props
}: Partial<React.ComponentProps<typeof Menu>> & {
  children?: React.ReactNode;
} = {}) => {
  const lgIds = getLgIds();
  return render(
    <CollectionToolbarProvider lgIds={lgIds}>
      <Menu {...props}>{children}</Menu>
    </CollectionToolbarProvider>,
  );
};

describe('packages/collection-toolbar/components/Actions/Menu', () => {
  describe('rendering', () => {
    test('renders Menu with IconButton trigger', () => {
      renderMenu();
      expect(screen.getByLabelText('More options')).toBeInTheDocument();
    });

    test('trigger IconButton has Ellipsis icon', () => {
      renderMenu();
      const trigger = screen.getByLabelText('More options');
      expect(trigger.querySelector('svg')).toBeInTheDocument();
    });

    test('trigger IconButton has aria-label "More options"', () => {
      renderMenu();
      const trigger = screen.getByLabelText('More options');
      expect(trigger).toHaveAttribute('aria-label', 'More options');
    });
  });

  describe('interaction', () => {
    test('opens menu when trigger is clicked', async () => {
      renderMenu({
        children: <Menu.MenuItem>Menu Item 1</Menu.MenuItem>,
      });

      const trigger = screen.getByLabelText('More options');
      await userEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Menu Item 1')).toBeVisible();
      });
    });

    test('renders MenuItem children when menu is open', async () => {
      renderMenu({
        children: (
          <>
            <Menu.MenuItem>Item 1</Menu.MenuItem>
            <Menu.MenuItem>Item 2</Menu.MenuItem>
            <Menu.MenuItem>Item 3</Menu.MenuItem>
          </>
        ),
      });

      const trigger = screen.getByLabelText('More options');
      await userEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeVisible();
        expect(screen.getByText('Item 2')).toBeVisible();
        expect(screen.getByText('Item 3')).toBeVisible();
      });
    });
  });

  describe('compound component', () => {
    test('has the correct static property for compound component identification', () => {
      expect(Menu[CollectionToolbarActionsSubComponentProperty.Menu]).toBe(
        true,
      );
    });

    test('exposes MenuItem as a static property', () => {
      expect(Menu.MenuItem).toBeDefined();
    });
  });
});
