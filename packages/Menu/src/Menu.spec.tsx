import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Menu, { MenuItem, MenuList } from './index';

afterAll(cleanup);

describe('packages/Menu', () => {
  const onSelect = jest.fn();
  const className = 'test-className';

  const { getByTestId, getByText, getByRole } = render(
    <Menu active data-testid="test-menu">
      <MenuList>
        <MenuItem className={className} onSelect={onSelect}>
          Item A
        </MenuItem>
        <MenuItem href="http://mongodb.design">Item B</MenuItem>
      </MenuList>
    </Menu>,
  );

  test('Appears on DOM when active prop is set', () => {
    const menu = getByTestId('test-menu');
    expect(menu).toBeVisible();
  });

  test('Renders children to the DOM', () => {
    const menuItem = getByText('Item A');
    expect(menuItem).toBeInTheDocument();
  });

  // menu list creates a menu group
  describe('packages/MenuList', () => {
    test('Creates a submenu div with role menu', () => {
      const menuList = getByRole('menu');
      const menuItem = getByText('Item A');
      expect(menuList).toContainElement(menuItem);
    });
  });

  describe('packages/MenuItem', () => {
    test('Fires onSelect callback, when clicked', () => {
      const menuItem = getByText('Item A');
      fireEvent.click(menuItem);
      expect(onSelect.mock.calls.length).toBe(1);
    });
  });

  test(`renders "${className}" in the menu item container's classList`, () => {
    const menuItem = getByText('Item A').parentElement;
    menuItem && expect(menuItem.classList.contains(className)).toBe(true);
  });

  test('Renders inside of an `a` instead of a `span` tag, when `href` prop is supplied', () => {
    const menuItem = getByText('Item B');
    expect(menuItem.tagName.toLowerCase()).toBe('a');
  });
});
