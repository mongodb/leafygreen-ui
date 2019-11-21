import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Menu, MenuSeparator, MenuItem } from './index';

afterAll(cleanup);

describe('packages/Menu', () => {
  const onClick = jest.fn();
  const setOpen = jest.fn();
  const className = 'test-className';

  const { getByTestId, getByText } = render(
    <Menu open setOpen={setOpen} data-testid="test-menu">
      <MenuItem className={className} onClick={onClick}>
        Item A
      </MenuItem>
      <MenuSeparator />
      <MenuItem href="http://mongodb.design">Item B</MenuItem>
    </Menu>,
  );

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

  describe('packages/menu-item', () => {
    const onClick = jest.fn();
    const className = 'test-className';

    const { getByTestId } = render(
      <div>
        <MenuItem
          className={className}
          onClick={onClick}
          data-testid="first-item"
        >
          Item 1
        </MenuItem>
        <MenuItem
          href="http://mongodb.design"
          data-testid="second-item"
          target="_self"
          rel="help"
        >
          Item 2
        </MenuItem>
      </div>,
    );

    const firstItem = getByTestId('first-item');
    const secondItem = getByTestId('second-item');

    test('fires onClick callback, when clicked', () => {
      fireEvent.click(firstItem);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test(`renders "${className}" in the MenuItem container's classList`, () => {
      expect(firstItem.classList.contains(className)).toBe(true);
    });

    test('renders inside of an `a` instead of a `button` tag, when `href` prop is supplied', () => {
      expect(secondItem.tagName.toLowerCase()).toBe('a');
    });

    test('renders with correct target and rel values when set', () => {
      expect(secondItem.target).toBe('_self');
      expect(secondItem.rel).toBe('help');
    });
  });
});
