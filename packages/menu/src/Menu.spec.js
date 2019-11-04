import React from 'react';
import { act } from 'react-dom/test-utils';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Menu, MenuGroup, MenuItem } from './index';

afterAll(cleanup);

describe('packages/Menu', () => {
  const onClick = jest.fn();
  const setOpen = jest.fn();
  const className = 'test-className';

  const { getByTestId, getByText } = render(
    <Menu open setOpen={setOpen} data-testid="test-menu">
      <MenuGroup>
        <MenuItem className={className} onClick={onClick}>
          Item A
        </MenuItem>
        <MenuItem href="http://mongodb.design">Item B</MenuItem>
      </MenuGroup>
    </Menu>,
  );

  const menu = getByTestId('test-menu');

  test('appears on DOM when open prop is set', () => {
    const menu = getByTestId('test-menu');
    expect(menu).toBeInTheDocument();
  });

  test('renders children to the DOM', () => {
    const menuItem = getByText('Item A');
    expect(menuItem).toBeInTheDocument();
  });

  describe('when Menu is uncontrolled', () => {
    const setOpen = jest.fn();
    const onClick = jest.fn();

    const { getByText } = render(
      <Menu
        setOpen={setOpen}
        onClick={onClick}
        trigger={<button>trigger</button>}
      >
        <MenuItem>Item C</MenuItem>
        <MenuItem>Item D</MenuItem>
      </Menu>,
    );

    test('when setOpen is set but no open prop is provided, Menu behaves as uncontrolled', () => {
      const button = getByText('trigger');
      fireEvent.click(button);

      const menuItem = getByText('Item C');
      expect(menuItem).toBeInTheDocument();

      fireEvent.click(button);

      expect(menuItem).not.toBeVisible();
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
    const itemB = menu.firstChild.children[1];
    expect(itemB.tagName.toLowerCase()).toBe('a');
  });
});
