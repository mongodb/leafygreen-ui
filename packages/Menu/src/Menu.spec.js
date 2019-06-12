import React from 'react';
import { act } from 'react-dom/test-utils';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Menu, MenuGroup, MenuItem } from './index';

afterAll(cleanup);

describe('packages/Menu', () => {
  const onClick = jest.fn();
  const className = 'test-className';

  const { getByTestId, getByText, getByRole } = render(
    <Menu active data-testid="test-menu">
      <MenuGroup>
        <MenuItem className={className} onClick={onClick}>
          Item A
        </MenuItem>
        <MenuItem href="http://mongodb.design">Item B</MenuItem>
      </MenuGroup>
    </Menu>,
  );

  const menu = getByTestId('test-menu');

  test('Appears on DOM when active prop is set', () => {
    const menu = getByTestId('test-menu');
    expect(menu).toBeVisible();
  });

  test('Renders children to the DOM', () => {
    const menuItem = getByText('Item A');
    expect(menuItem).toBeInTheDocument();
  });

  describe('packages/MenuGroup', () => {
    test('Creates a dropdown group div with role menu', () => {
      const menuGroup = getByRole('menu');
      const menuItem = getByText('Item A');
      expect(menuGroup).toContainElement(menuItem);
    });
  });

  describe('packages/MenuItem', () => {
    test('fires onClick callback, when clicked', () => {
      const menuItem = menu.firstChild.firstChild.firstChild;

      act(() => {
        fireEvent.click(menuItem);
      });

      setTimeout(() => {
        expect(onClick).toHaveBeenCalledTimes(1);
      }, 100);
    });
  });

  test(`renders "${className}" in the DropdownItem container's classList`, () => {
    const itemA = menu.firstChild.firstChild;
    expect(itemA.classList.contains(className)).toBe(true);
  });

  test('Renders inside of an `a` instead of a `span` tag, when `href` prop is supplied', () => {
    const itemB = menu.firstChild.children[1].firstChild;
    expect(itemB.tagName.toLowerCase()).toBe('a');
  });
});
