import React from 'react';
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PolymorphicAs, PropsOf } from '@leafygreen-ui/polymorphic';

import { MenuProps } from './Menu';
// import { MenuItemProps } from './MenuItem';
// import { SubMenuProps } from './SubMenu';
import { Menu, MenuItem, MenuSeparator, SubMenu } from '.';

const menuTestId = 'menu-test-id';
const trigger = <button data-testid="menu-trigger">trigger</button>;
const onClick = jest.fn();

function renderMenu(props: Omit<MenuProps, 'children'> = {}) {
  const utils = render(
    <Menu {...props} data-testid={menuTestId}>
      <MenuItem>Item A</MenuItem>
      <MenuSeparator />
      <MenuItem href="http://mongodb.design">Item B</MenuItem>
    </Menu>,
  );
  return utils;
}

function renderSubMenuItem(props: PropsOf<typeof SubMenu> = {}) {
  const utils = render(
    <Menu open={true} setOpen={jest.fn()}>
      <SubMenu title="First SubMenu" data-testid="sub-menu-a" {...props}>
        <MenuItem data-testid="sub-menu-item-a">SubMenu Item One</MenuItem>
      </SubMenu>
      <SubMenu title="Second SubMenu" data-testid="sub-menu-b">
        <MenuItem data-testid="sub-menu-item-b">SubMenu Item Two</MenuItem>
      </SubMenu>
    </Menu>,
  );
  const subMenu = utils.getByTestId('sub-menu-a');
  const subMenuB = utils.getByTestId('sub-menu-b');
  const [subMenuButtonA, subMenuButtonB] = utils.getAllByTestId(
    'lg-sub-menu-icon-button',
  );

  const getItemA = () => utils.getByTestId('sub-menu-item-a');
  const getItemB = () => utils.getByTestId('sub-menu-item-b');

  return {
    subMenu,
    subMenuB,
    subMenuButtonA,
    subMenuButtonB,
    getItemA,
    getItemB,
    ...utils,
  };
}

describe('packages/menu', () => {
  test.todo('trigger renders as a function');
  test.todo('trigger renders as a JSX element');
  test.todo('menu appears when trigger is a function');
  test.todo('menu appears when trigger is a JSX element');

  test('menu appears on DOM when the "open" prop is set', () => {
    const { getByTestId } = renderMenu({ open: true });
    const menu = getByTestId(menuTestId);
    expect(menu).toBeInTheDocument();
  });

  test('renders children to the DOM', () => {
    const { getByText } = renderMenu({ open: true });
    const menuItem = getByText('Item A');
    expect(menuItem).toBeInTheDocument();
  });

  describe('when uncontrolled', () => {
    const uncontrolledSetOpen = jest.fn();
    const trigger = <button>trigger</button>;

    test('and "setOpen" is provided, but "open" prop is not set', async () => {
      const { getByText } = renderMenu({
        setOpen: uncontrolledSetOpen,
        trigger,
      });

      const button = getByText('trigger');
      fireEvent.click(button);

      const menuItem = getByText('Item B');
      await act(() => waitFor(() => expect(menuItem).toBeVisible()));

      fireEvent.click(button);

      await waitForElementToBeRemoved(menuItem);
    });
  });

  describe('Mouse interaction', () => {
    test('Clicking trigger opens menu', () => {
      const { getByRole, getByTestId } = renderMenu({
        trigger,
      });
      const button = getByRole('button');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      waitFor(() => {
        expect(menu).toBeInTheDocument();
      });
    });

    test('Click handlers on parent elements fire', () => {
      const parentHandler = jest.fn();
      const { getByTestId } = render(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div data-testid="parent" onClick={parentHandler}>
          <Menu trigger={trigger} data-testid={menuTestId}>
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </div>,
      );
      const button = getByTestId('menu-trigger');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);
      waitFor(() => {
        expect(menu).toBeInTheDocument();
        expect(parentHandler).toHaveBeenCalled();
      });
    });
  });

  describe('Keyboard Interaction', () => {
    describe('Escape key', () => {
      test('Closes menu', async () => {
        const { getByRole, getByTestId } = renderMenu({
          trigger,
        });
        const button = getByRole('button');

        userEvent.click(button);
        const menu = getByTestId(menuTestId);
        userEvent.type(menu, '{esc}');

        await waitForElementToBeRemoved(menu);
        expect(menu).not.toBeInTheDocument();
      });
      test('Returns focus to trigger {usePortal: true}', async () => {
        const { getByRole, getByTestId } = renderMenu({
          trigger,
          usePortal: true,
        });
        const button = getByRole('button');
        userEvent.click(button);
        const menu = getByTestId(menuTestId);
        userEvent.type(menu, '{esc}');
        await waitForElementToBeRemoved(menu);
        expect(button).toHaveFocus();
      });

      test('Returns focus to trigger {usePortal: false}', async () => {
        const { getByRole, getByTestId } = renderMenu({
          trigger,
          usePortal: false,
        });
        const button = getByRole('button');
        userEvent.click(button);
        const menu = getByTestId(menuTestId);
        userEvent.type(menu, '{esc}');
        await waitForElementToBeRemoved(menu);
        expect(button).toHaveFocus();
      });
    });
  });
});

describe('packages/menu/sub-menu', () => {
  test('renders a SubMenu open by default, when the SubMenu is active', () => {
    const { getItemA } = renderSubMenuItem({ active: true });
    const subMenuItem = getItemA();
    expect(subMenuItem).toBeInTheDocument();
  });

  test('when a SubMenu is clicked, it opens and closes the previously opened SubMenu', async () => {
    const { subMenuButtonB, getItemA, getItemB } = renderSubMenuItem({
      active: true,
    });

    fireEvent.click(subMenuButtonB as HTMLElement);

    const subMenuItem = getItemA();
    await act(async () => {
      await waitForElementToBeRemoved(subMenuItem);
    });

    const subMenuItemB = getItemB();
    expect(subMenuItemB).toBeVisible();
  });

  test('onClick is fired when SubMenu is clicked', () => {
    const { subMenu } = renderSubMenuItem({ onClick });
    fireEvent.click(subMenu);
    expect(onClick).toHaveBeenCalled();
  });

  test('renders as a button by default', () => {
    const { getByTestId } = renderSubMenuItem();
    const subMenu = getByTestId('sub-menu-a');
    expect(subMenu.tagName.toLowerCase()).toBe('button');
  });

  test('renders inside an anchor tag when the href prop is set', () => {
    const { getByTestId } = renderSubMenuItem({ href: 'string' });
    const subMenu = getByTestId('sub-menu-a');
    expect(subMenu.tagName.toLowerCase()).toBe('a');
  });

  test('renders as `div` tag when the "as" prop is set', () => {
    const { getByTestId } = renderSubMenuItem({
      as: 'div' as PolymorphicAs,
    } as PropsOf<typeof SubMenu>);
    const subMenu = getByTestId('sub-menu-a');
    expect(subMenu.tagName.toLowerCase()).toBe('div');
  });

  /* eslint-disable jest/no-disabled-tests, jest/expect-expect */
  describe.skip('Types behave as expected', () => {
    test('Accepts string as `as` prop', () => {
      <SubMenu as="p" />;
    });
    test('Accepts component as `as` prop', () => {
      const As = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );
      render(<SubMenu as={As} />);
    });
  });
  /* eslint-enable jest/no-disabled-tests, jest/expect-expect */
});
