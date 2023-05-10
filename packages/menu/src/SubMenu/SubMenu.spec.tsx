import React from 'react';
import {
  getByTestId as globalGetByTestId,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu, MenuItem, type MenuProps, SubMenu } from '..';

const menuTestId = 'menu-test-id';
const subMenuTestId = ['sub-menu-A', 'sub-menu-B', 'sub-menu-C', 'sub-menu-D'];
const menuItemTestId = [
  'menu-item-a',
  'menu-item-b',
  'menu-item-c',
  'menu-item-d',
];

const onClick = jest.fn();

type RenderProps = Omit<MenuProps, 'children'> & { initialActiveMenu?: number };

const renderSubMenu = ({
  initialActiveMenu = 0,
  trigger = <button data-testid="menu-trigger">trigger</button>,
  ...props
}: RenderProps = {}) => {
  const utils = render(
    <Menu {...props} trigger={trigger} data-testid={menuTestId}>
      <SubMenu
        active={initialActiveMenu === 0}
        onClick={onClick}
        data-testid={subMenuTestId[0]}
        title="SubMenu A"
      >
        <MenuItem data-testid={menuItemTestId[0]}>Text Content A</MenuItem>
      </SubMenu>
      <SubMenu
        active={initialActiveMenu === 1}
        data-testid={subMenuTestId[1]}
        href="mongodb.design"
        title="SubMenu B"
      >
        <MenuItem data-testid={menuItemTestId[1]}> Text Content B</MenuItem>
      </SubMenu>
      <SubMenu
        active={initialActiveMenu === 1}
        data-testid={subMenuTestId[2]}
        as="div"
        title="SubMenu C"
      >
        <MenuItem data-testid={menuItemTestId[2]}> Text Content C</MenuItem>
      </SubMenu>
    </Menu>,
  );

  const openMenu = () => {
    const triggerButton = utils.getByTestId('menu-trigger');
    userEvent.click(triggerButton);
  };

  return {
    ...utils,
    openMenu,
  };
};

describe('packages/sub-menu', () => {
  afterEach(() => {
    onClick.mockReset();
  });

  describe('Rendering', () => {
    test('renders a SubMenu open by default, when the SubMenu is active', () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenuA = getByTestId(subMenuTestId[0]);
      expect(subMenuA).toBeInTheDocument();
      const menuItemA = getByTestId(menuItemTestId[0]);
      expect(menuItemA).toBeInTheDocument();
    });

    test('renders as a button by default', async () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenuA = getByTestId(subMenuTestId[0]);
      expect(subMenuA.tagName.toLowerCase()).toBe('button');
    });

    test('renders inside an anchor tag when the href prop is set', async () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenuB = getByTestId(subMenuTestId[1]);
      expect(subMenuB.tagName.toLowerCase()).toBe('a');
    });

    test('renders as `div` tag when the "as" prop is set', async () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenuC = getByTestId(subMenuTestId[2]);
      expect(subMenuC.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('Mouse interaction', () => {
    test('first option has focus when menu opens', () => {
      const { getByTestId, openMenu } = renderSubMenu();
      openMenu();

      expect(getByTestId(subMenuTestId[0])).toHaveFocus();
    });

    test('Clicking SubMenu fires #onClick', async () => {
      const { getByTestId, openMenu } = renderSubMenu();
      openMenu();

      const subMenu = getByTestId(subMenuTestId[0]);
      userEvent.click(subMenu);
      expect(onClick).toHaveBeenCalled();
    });

    test('Clicking SubMenu with #onClick does _not_ open submenu', () => {
      const { getByTestId, queryByTestId, openMenu } = renderSubMenu({
        initialActiveMenu: 1,
      });
      openMenu();

      const subMenuA = getByTestId(subMenuTestId[0]);
      userEvent.click(subMenuA);
      const maybeSubMenuItem = queryByTestId(menuItemTestId[0]);
      expect(maybeSubMenuItem).not.toBeInTheDocument();
    });

    test('Clicking SubMenu with href does _not_ open submenu', () => {
      const { getByTestId, queryByTestId, openMenu } = renderSubMenu();
      openMenu();

      const subMenuB = getByTestId(subMenuTestId[1]);
      userEvent.click(subMenuB);
      const maybeSubMenuItem = queryByTestId(menuItemTestId[1]);
      expect(maybeSubMenuItem).not.toBeInTheDocument();
    });

    test('Clicking the chevron opens the submenu', async () => {
      const { getByTestId, openMenu } = renderSubMenu();
      openMenu();
      const subMenuB = getByTestId(subMenuTestId[1]);
      const chevronB = globalGetByTestId(subMenuB, 'lg-sub-menu-icon-button');

      userEvent.click(chevronB);

      const subMenuItemA = getByTestId(menuItemTestId[0]);
      const subMenuItemB = getByTestId(menuItemTestId[1]);

      await waitForElementToBeRemoved(subMenuItemA);
      expect(subMenuItemB).toBeInTheDocument();
    });

    test('Clicking a basic SubMenu opens it', async () => {
      const { getByTestId, queryByTestId, openMenu } = renderSubMenu();
      openMenu();

      const subMenuC = getByTestId(subMenuTestId[2]);
      userEvent.click(subMenuC);

      const subMenuItem = queryByTestId(menuItemTestId[2]);
      expect(subMenuItem).toBeInTheDocument();
    });

    test('Opening a Submenu closes the previous one', async () => {
      const { getByTestId, queryByTestId, openMenu } = renderSubMenu();
      openMenu();
      const subMenuB = getByTestId(subMenuTestId[1]);
      const chevronB = globalGetByTestId(subMenuB, 'lg-sub-menu-icon-button');
      userEvent.click(chevronB);

      const subMenuItem1 = queryByTestId(menuItemTestId[0]);

      await waitForElementToBeRemoved(subMenuItem1);
    });
  });

  describe('Keyboard interaction', () => {
    describe('Arrow keys', () => {
      test('highlights open sub-menu items', () => {
        const { getByTestId, queryByTestId, openMenu } = renderSubMenu();
        openMenu();

        const menu = getByTestId(menuTestId);
        const menuItemA = queryByTestId(menuItemTestId[0]);

        userEvent.type(menu, '{arrowdown}');
        expect(menuItemA).toHaveFocus();
      });

      test('does not highlight closed sub-menu items', () => {
        const { getByTestId, queryByTestId, openMenu } = renderSubMenu({
          initialActiveMenu: 1,
        });
        openMenu();

        const menu = getByTestId(menuTestId);
        const menuItemA = queryByTestId(menuItemTestId[0]);
        const subMenuB = queryByTestId(subMenuTestId[1]);

        userEvent.type(menu, '{arrowdown}');
        expect(menuItemA).toBeNull();
        expect(subMenuB).toHaveFocus();
      });
    });
  });

  /* eslint-disable jest/no-disabled-tests, jest/expect-expect */
  describe.skip('Types behave as expected', () => {
    test('Accepts string as `as` prop', () => {
      <SubMenu data-testid="sub-menu-a" as="p" />;
    });

    test('Accepts component as `as` prop', () => {
      const As = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );

      render(
        <Menu>
          <SubMenu as={As}>Test</SubMenu>
        </Menu>,
      );
    });

    test.skip('types', () => {
      const AnchorLikeWrapper = (props: JSX.IntrinsicElements['a']) => {
        return <a {...props}>content</a>;
      };

      const ButtonWrapper = (props: JSX.IntrinsicElements['button']) => {
        return <button {...props} />;
      };

      <>
        <SubMenu href="allowed">Children</SubMenu>
        <SubMenu as="a" href="allowed">
          Children
        </SubMenu>
        {/* @ts-expect-error - href not allowed when as is div*/}
        <SubMenu as="div" href="string">
          Children
        </SubMenu>
        {/* @ts-expect-error - href not allowed on ButtonWrapper */}
        <SubMenu as={ButtonWrapper} href="string">
          Children
        </SubMenu>
        <SubMenu as={AnchorLikeWrapper} href="string">
          Children
        </SubMenu>
      </>;
    });
  });
  /* eslint-enable jest/no-disabled-tests, jest/expect-expect */
});
