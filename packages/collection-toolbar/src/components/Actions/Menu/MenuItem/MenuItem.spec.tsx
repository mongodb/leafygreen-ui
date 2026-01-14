import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CollectionToolbarProvider } from '../../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../../shared.types';
import { getLgIds } from '../../../../utils';

import { MenuItem } from './MenuItem';
import { MenuItemProps } from './MenuItem.types';

const renderMenuItem = (props: MenuItemProps = {}) => {
  const lgIds = getLgIds();
  return render(
    <CollectionToolbarProvider lgIds={lgIds}>
      <MenuItem {...props} />
    </CollectionToolbarProvider>,
  );
};

describe('packages/collection-toolbar/components/Actions/Menu/MenuItem', () => {
  describe('rendering', () => {
    test('renders as a menu item', () => {
      renderMenuItem();
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    test('renders children content', () => {
      renderMenuItem({ children: 'Click Me' });
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    test('spreads additional props to LGMenuItem', () => {
      renderMenuItem({
        'aria-label': 'Custom label',
      } as React.ComponentProps<typeof MenuItem>);

      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('aria-label', 'Custom label');
    });

    test('forwards onClick handler', async () => {
      const handleClick = jest.fn();
      renderMenuItem({ onClick: handleClick });

      const menuItem = screen.getByRole('menuitem');
      await userEvent.click(menuItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('applies className prop', () => {
      renderMenuItem({ className: 'custom-class' });
      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveClass('custom-class');
    });

    test('supports disabled prop', () => {
      renderMenuItem({ disabled: true });
      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('aria-disabled', 'true');
    });

    test('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      renderMenuItem({ disabled: true, onClick: handleClick });

      const menuItem = screen.getByRole('menuitem');
      await userEvent.click(menuItem);

      expect(handleClick).not.toHaveBeenCalled();
    });

    test('supports description prop', () => {
      renderMenuItem({ description: 'Item description' });
      expect(screen.getByText('Item description')).toBeInTheDocument();
    });
  });

  describe('compound component', () => {
    test('has the correct static property for compound component identification', () => {
      expect(
        MenuItem[CollectionToolbarActionsSubComponentProperty.MenuItem],
      ).toBe(true);
    });
  });
});
