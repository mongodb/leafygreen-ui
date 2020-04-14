import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Menu, MenuSeparator, MenuItem, SubMenu } from './index';
import Icon from '@leafygreen-ui/icon';

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

    const { getByText } = render(
      <Menu setOpen={setOpen} trigger={<button>trigger</button>}>
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

  describe('menu-item', () => {
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
          target="_blank"
          rel="help"
        >
          Item 2
        </MenuItem>
        <MenuItem data-testid="third-item" as="div">
          Item 3
        </MenuItem>
        <MenuItem data-testid="fourth-item" glyph={<Icon glyph="Cloud" />}>
          Item 4
        </MenuItem>
      </div>,
    );

    const firstItem = getByTestId('first-item');
    const secondItem = getByTestId('second-item');
    const thirdItem = getByTestId('third-item');

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
      expect(secondItem.target).toBe('_blank');
      expect(secondItem.rel).toBe('help');
    });

    test('renders as `div` tag when the as prop is set', () => {
      expect(thirdItem.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('sub-menu', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <Menu open={true} setOpen={jest.fn()}>
        <SubMenu active title="First SubMenu">
          <MenuItem data-testid="sub-menu-item-a">SubMenu Item One</MenuItem>
        </SubMenu>
        <SubMenu data-testid="sub-menu-b" title="Second SubMenu">
          <MenuItem data-testid="sub-menu-item-b">SubMenu Item 2</MenuItem>
        </SubMenu>
        <SubMenu
          data-testid="sub-menu-c"
          title="Third SubMenu"
          onClick={onClick}
        >
          <MenuItem data-testid="sub-menu-item-c">SubMenu Item 3</MenuItem>
        </SubMenu>
      </Menu>,
    );

    const subMenuItemA = getByTestId('sub-menu-item-a');
    const subMenuB = getByTestId('sub-menu-b');
    const subMenuBArrow = subMenuB?.parentNode?.querySelectorAll('button')[1];

    test('renders a SubMenu open by default, when the SubMenu is active', () => {
      expect(subMenuItemA).toBeInTheDocument();
    });

    test('when a SubMenu is clicked, it opens and closes the previously opened SubMenu', () => {
      fireEvent.click(subMenuBArrow);
      const subMenuItemB = getByTestId('sub-menu-item-b');
      expect(subMenuItemB).toBeVisible();
      // eslint-disable-next-line jest/valid-expect-in-promise
      waitForElementToBeRemoved(() => subMenuItemA).then(() =>
        expect(subMenuItemA).not.toBeVisible(),
      );
    });

    test('onClick is fired when SubMenu is clicked', () => {
      const subMenuItemC = getByTestId('sub-menu-c');
      fireEvent.click(subMenuItemC);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
