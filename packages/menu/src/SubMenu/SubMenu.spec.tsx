import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu, MenuItem, type MenuProps, SubMenu } from '..';

const menuTestId = 'menu-test-id';
const subMenu1Id = 'sub-menu-1-id';
const subMenu2Id = 'sub-menu-2-id';
const subMenu3Id = 'sub-menu-3-id';
const menuItem1Id = 'menu-item-1-id';
const menuItem2Id = 'menu-item-2-id';
const trigger = <button data-testid="menu-trigger">trigger</button>;
const onClick = jest.fn();

const renderSubMenu = (props: Omit<MenuProps, 'children'> = { trigger }) => {
  const utils = render(
    <Menu
      {...props}
      trigger={props.trigger ?? trigger}
      data-testid={menuTestId}
    >
      <SubMenu
        active
        onClick={onClick}
        data-testid={subMenu1Id}
        title="SubMenu 1"
      >
        <MenuItem data-testid={menuItem1Id}>Text Content A</MenuItem>
      </SubMenu>
      <SubMenu data-testid={subMenu2Id} href="mongodb.design" title="SubMenu 2">
        <MenuItem data-testid={menuItem2Id}> Text Content B</MenuItem>
      </SubMenu>
      <SubMenu data-testid={subMenu3Id} as="div" title="SubMenu 3"></SubMenu>
    </Menu>,
  );

  return utils;
};

describe('packages/sub-menu', () => {
  describe('Rendering', () => {
    test('renders a SubMenu open by default, when the SubMenu is active', () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenu = getByTestId(subMenu1Id);
      expect(subMenu).toBeInTheDocument();
      const menuItem = getByTestId(menuItem1Id);
      expect(menuItem).toBeInTheDocument();
    });

    test('renders as a button by default', async () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenu = getByTestId(subMenu1Id);
      expect(subMenu.tagName.toLowerCase()).toBe('button');
    });

    test('renders inside an anchor tag when the href prop is set', async () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenu = getByTestId(subMenu2Id);
      expect(subMenu.tagName.toLowerCase()).toBe('a');
    });

    test('renders as `div` tag when the "as" prop is set', async () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenu = getByTestId(subMenu3Id);
      expect(subMenu.tagName.toLowerCase()).toBe('div');
    });

    test;
  });

  describe('Mouse interaction', () => {
    test('first option has focus when menu opens', () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      expect(getByTestId(subMenu1Id)).toHaveFocus();
    });

    test('Clicking a SubMenu opens it', async () => {
      const { findByTestId, getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenu2 = getByTestId(subMenu2Id);
      userEvent.click(subMenu2);

      const subMenuItem2 = await findByTestId(menuItem2Id);
      expect(subMenuItem2).not.toBeNull();
      expect(subMenuItem2).toBeInTheDocument();
    });

    test('Clicking a Submenu closes the previous one', async () => {
      const { getByTestId, queryByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenuItem1 = queryByTestId(menuItem1Id);
      const subMenu2 = getByTestId(subMenu2Id);

      userEvent.click(subMenu2);

      await waitForElementToBeRemoved(subMenuItem1);
    });

    test('onClick is fired when SubMenu is clicked', async () => {
      const { getByTestId } = renderSubMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const subMenu = getByTestId(subMenu1Id);
      userEvent.click(subMenu);
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('Keyboard interaction', () => {
    describe('Arrow keys', () => {
      test('highlights open sub-menu items', () => {
        const { getByTestId } = renderSubMenu();
        const triggerButton = getByTestId('menu-trigger');
        userEvent.click(triggerButton);

        const menu = getByTestId(menuTestId);

        userEvent.type(menu, '{arrowdown}');
        expect(getByTestId(menuItem1Id)).toHaveFocus();
      });

      test('does not highlight closed sub-menu items', () => {
        const { getByTestId } = renderSubMenu();
        const triggerButton = getByTestId('menu-trigger');
        userEvent.click(triggerButton);

        const menu = getByTestId(menuTestId);

        getByTestId(subMenu2Id).focus();
        expect(getByTestId(subMenu2Id)).toHaveFocus();
        userEvent.type(menu, '{arrowdown}');
        expect(getByTestId(menuItem2Id)).not.toHaveFocus();
        expect(getByTestId(subMenu3Id)).toHaveFocus();
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
