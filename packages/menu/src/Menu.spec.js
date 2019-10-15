import React from 'react';
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

  test('Appears on DOM when open prop is set', () => {
    const menu = getByTestId('test-menu');
    expect(menu).toBeInTheDocument();
  });

  test('Renders children to the DOM', () => {
    const menuItem = getByText('Item A');
    expect(menuItem).toBeInTheDocument();
  });

  describe('When Menu is uncontrolled', () => {
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
      const menuItem = getByText('Item C');

      fireEvent.click(button);

      expect(menuItem).toBeVisible();

      fireEvent.click(button);

      expect(menuItem).not.toBeVisible();
    });
  });
});
