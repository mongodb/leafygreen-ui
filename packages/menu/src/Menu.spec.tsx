import React from 'react';
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Optional } from '@leafygreen-ui/lib';
import { waitForTransition } from '@leafygreen-ui/testing-lib';

import { LGIDs } from './constants';
import { MenuProps } from './Menu';
import { Menu, MenuItem, MenuSeparator, SubMenu } from '.';

const menuTestId = 'menu-test-id';
const menuTriggerTestId = 'menu-trigger';
const defaultTrigger = <button data-testid={menuTriggerTestId}>trigger</button>;
const defaultChildren = (
  <>
    <MenuItem data-testid="menu-item-a">Item A</MenuItem>
    <MenuSeparator />
    <MenuItem href="http://mongodb.design">Item B</MenuItem>
    <MenuItem href="http://mongodb.design">Item C</MenuItem>
  </>
);

function waitForTimeout(timeout = 500) {
  return new Promise(res => setTimeout(res, timeout));
}

/** Renders a Menu with the given props */
function renderMenu(
  {
    trigger = defaultTrigger,
    children = defaultChildren,
    ...rest
  }: Optional<MenuProps, 'children'> = { children: defaultChildren },
) {
  const renderResult = render(
    <>
      <div data-testid="backdrop" />
      <Menu trigger={trigger} {...rest} data-testid={menuTestId}>
        {children}
      </Menu>
    </>,
  );

  const backdropEl = renderResult.getByTestId('backdrop');
  const triggerEl = renderResult.getByTestId(menuTriggerTestId);

  /**
   * Since menu elements won't exist until component is interacted with,
   * call this after opening the menu.
   * @returns Object of menu elements
   */
  async function findMenuElements(): Promise<{
    menuEl: HTMLElement | null;
    menuItemElements: Array<HTMLElement | null>;
  }> {
    const menuEl = await renderResult.findByTestId(menuTestId);
    const menuItemElements = await within(menuEl).findAllByRole('menuitem');

    return {
      menuEl,
      menuItemElements,
    };
  }

  /** Opens the menu, and manually fires transition events */
  async function openMenu() {
    userEvent.click(triggerEl);
    const menuElements = await findMenuElements();
    fireEvent.transitionEnd(menuElements.menuEl as Element); // JSDOM does not automatically fire these events
    return menuElements;
  }

  return { ...renderResult, backdropEl, triggerEl, findMenuElements, openMenu };
}

describe('packages/menu', () => {
  describe('Rendering', () => {
    test.todo('trigger renders as a function');
    test.todo('trigger renders as a JSX element');
    test.todo('menu appears when trigger is a function');
    test.todo('menu appears when trigger is a JSX element');

    test('menu is opened by default when `initialOpen` is set to true', () => {
      const { getByText } = renderMenu({
        initialOpen: true,
      });
      const menuItem = getByText('Item B');
      expect(menuItem).toBeInTheDocument();
    });

    describe('when the `open` prop is `true`', () => {
      const setOpen = jest.fn();
      test('menu renders', () => {
        const { getByTestId } = renderMenu({ open: true, setOpen });
        const menu = getByTestId(menuTestId);
        expect(menu).toBeInTheDocument();
      });

      test('renders all children', () => {
        const { getByText } = renderMenu({ open: true, setOpen });
        const menuItem = getByText('Item A');
        expect(menuItem).toBeInTheDocument();
      });

      test('first item is focused', async () => {
        const { findMenuElements } = renderMenu({ open: true, setOpen });
        const { menuEl, menuItemElements } = await findMenuElements();

        await waitForTransition(menuEl);

        await waitFor(() => {
          const firstItem = menuItemElements[0];
          expect(firstItem).toHaveFocus();
        });
      });
    });

    test('`open` prop is not set, but `setOpen` callback is provided', async () => {
      const setOpen = jest.fn();
      const { getByTestId, getByText } = renderMenu({
        open: undefined,
        setOpen,
        trigger: defaultTrigger,
      });

      const button = getByTestId('menu-trigger');
      userEvent.click(button);

      const menuItem = getByText('Item B');

      expect(menuItem).toBeInTheDocument();

      userEvent.click(button);

      await waitForElementToBeRemoved(menuItem);
      expect(menuItem).not.toBeInTheDocument();
    });
  });

  describe('Mouse interaction', () => {
    test('Clicking trigger opens menu', async () => {
      const { triggerEl, findMenuElements } = renderMenu({});
      userEvent.click(triggerEl);
      const { menuEl } = await findMenuElements();
      await waitFor(() => {
        expect(menuEl).toBeInTheDocument();
      });
    });

    test('First item is focused when menu is opened', async () => {
      const { triggerEl, findMenuElements } = renderMenu({});
      userEvent.click(triggerEl);
      const { menuEl, menuItemElements } = await findMenuElements();
      await waitFor(() => {
        // JSDOM does not automatically fire these events
        fireEvent.transitionEnd(menuEl as Element);
        expect(menuItemElements[0]).toHaveFocus();
      });
    });

    test('Clicking a menuitem does not close the menu', async () => {
      const { openMenu } = renderMenu({});
      const { menuEl, menuItemElements } = await openMenu();

      expect(menuEl).toBeInTheDocument();

      const firstItem = menuItemElements[0];
      userEvent.click(firstItem!);
      await act(async () => await waitForTimeout());
      expect(menuEl).toBeInTheDocument();
    });

    test('Clicking outside the menu closes the menu', async () => {
      const { openMenu, backdropEl } = renderMenu({});
      const { menuEl } = await openMenu();

      expect(menuEl).toBeInTheDocument();

      userEvent.click(backdropEl);
      await waitForElementToBeRemoved(menuEl);

      expect(menuEl).not.toBeInTheDocument();
    });

    test('Click handlers on parent elements fire (propagation is not stopped)', async () => {
      const parentHandler = jest.fn();
      const { getByTestId } = render(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div data-testid="parent" onClick={parentHandler}>
          <Menu trigger={defaultTrigger} data-testid={menuTestId}>
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </div>,
      );
      const button = getByTestId('menu-trigger');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);
      await waitFor(() => {
        expect(menu).toBeInTheDocument();
        expect(parentHandler).toHaveBeenCalled();
      });
    });
  });

  describe('Keyboard Interaction', () => {
    type Keys = 'esc' | 'tab';
    const closeKeys: Array<Array<Keys>> = [['esc'], ['tab']];

    const userEventInteraction = (menu: HTMLElement, key: Keys) => {
      if (key === 'tab') {
        userEvent.tab();
      } else {
        userEvent.type(menu, `{${key}}`);
      }
    };

    describe.each(closeKeys)('%s key', key => {
      test('Closes menu', async () => {
        const { openMenu } = renderMenu({});
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(menuEl).not.toBeInTheDocument();
      });

      test('Returns focus to trigger {usePortal: true}', async () => {
        const { openMenu, triggerEl } = renderMenu({
          usePortal: true,
        });
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(triggerEl).toHaveFocus();
      });

      test('Returns focus to trigger {usePortal: false}', async () => {
        const { openMenu, triggerEl } = renderMenu({
          usePortal: false,
        });
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(triggerEl).toHaveFocus();
      });
    });

    describe('Arrow keys', () => {
      describe('Down arrow', () => {
        test('highlights the next option in the menu', async () => {
          const { openMenu } = renderMenu({});
          const { menuItemElements } = await openMenu();
          userEvent.keyboard('{arrowdown}');
          expect(menuItemElements[1]).toHaveFocus();
        });
        test('cycles highlight to the top', async () => {
          const { openMenu } = renderMenu({});
          const { menuItemElements } = await openMenu();

          for (let i = 0; i < menuItemElements.length; i++) {
            userEvent.keyboard('{arrowdown}');
          }

          expect(menuItemElements[0]).toHaveFocus();
        });

        describe('with submenus', () => {
          test('highlights the next submenu item', async () => {
            const { queryByTestId, openMenu } = renderMenu({
              children: (
                <>
                  <SubMenu initialOpen data-testid="submenu" title="Submenu">
                    <MenuItem data-testid="item-a">A</MenuItem>
                    <MenuItem data-testid="item-b">B</MenuItem>
                  </SubMenu>
                </>
              ),
            });

            const { menuItemElements } = await openMenu();
            expect(menuItemElements).toHaveLength(3);
            expect(queryByTestId('submenu')).toHaveFocus();
            userEvent.keyboard('{arrowdown}');
            expect(queryByTestId('item-a')).toHaveFocus();
          });

          test('does not highlight closed submenu items', async () => {
            const { queryByTestId, openMenu } = renderMenu({
              children: (
                <>
                  <SubMenu data-testid="submenu" title="Submenu">
                    <MenuItem data-testid="item-a">A</MenuItem>
                    <MenuItem data-testid="item-b">B</MenuItem>
                  </SubMenu>
                  <MenuItem data-testid="item-c">C</MenuItem>
                </>
              ),
            });

            const { menuItemElements } = await openMenu();
            expect(menuItemElements).toHaveLength(2);
            expect(queryByTestId('submenu')).toHaveFocus();
            userEvent.keyboard('{arrowdown}');
            expect(queryByTestId('item-c')).toHaveFocus();
          });
        });
      });

      describe('Up arrow', () => {
        test('highlights the previous option in the menu', async () => {
          const { openMenu } = renderMenu({});
          const { menuItemElements } = await openMenu();

          userEvent.keyboard('{arrowdown}');
          userEvent.keyboard('{arrowup}');
          expect(menuItemElements[0]).toHaveFocus();
        });
        test('cycles highlight to the bottom', async () => {
          const { openMenu } = renderMenu({});
          const { menuItemElements } = await openMenu();

          const lastOption = menuItemElements[menuItemElements.length - 1];
          userEvent.keyboard('{arrowup}');
          expect(lastOption).toHaveFocus();
        });
      });
    });

    test('Enter key on a menuitem does not close the menu', async () => {
      const { openMenu } = renderMenu({});
      const { menuEl, menuItemElements } = await openMenu();

      expect(menuEl).toBeInTheDocument();

      const firstItem = menuItemElements[0];

      expect(firstItem).toHaveFocus();

      userEvent.keyboard('[Enter]');

      await act(async () => await waitForTimeout());
      expect(menuEl).toBeInTheDocument();
    });

    test('Space key on a menuitem does not close the menu', async () => {
      const { openMenu } = renderMenu({});
      const { menuEl, menuItemElements } = await openMenu();

      expect(menuEl).toBeInTheDocument();

      const firstItem = menuItemElements[0];

      expect(firstItem).toHaveFocus();

      userEvent.keyboard('[Space]');

      await act(async () => await waitForTimeout());
      expect(menuEl).toBeInTheDocument();
    });
  });

  // TODO: Consider moving these to Chromatic or Playwright/Cypress
  describe('Complex interactions', () => {
    test('if a submenu is highlighted, and the toggle is clicked, the submenu remains in focus', async () => {
      const onEntered = jest.fn();

      const { queryByTestId, getByTestId, openMenu } = renderMenu({
        children: (
          <>
            <SubMenu
              data-testid="submenu"
              title="Submenu"
              onEntered={onEntered}
            >
              <MenuItem data-testid="item-a">A</MenuItem>
              <MenuItem data-testid="item-b">B</MenuItem>
            </SubMenu>
            <MenuItem data-testid="item-c">C</MenuItem>
          </>
        ),
      });

      await openMenu();
      expect(queryByTestId('submenu')).toHaveFocus();
      userEvent.click(getByTestId(LGIDs.submenuToggle)!);
      await waitForTransition();
      await waitFor(() => {
        expect(onEntered).toHaveBeenCalled();
        expect(queryByTestId('submenu')).toHaveFocus();
      });
    });

    test('if a submenu item is highlighted, and that submenu is closed, focus should move to the submenu parent', async () => {
      const onExited = jest.fn();
      const { queryByTestId, getByTestId, openMenu } = renderMenu({
        children: (
          <>
            <SubMenu data-testid="submenu" title="Submenu" onExited={onExited}>
              <MenuItem data-testid="item-a">A</MenuItem>
              <MenuItem data-testid="item-b">B</MenuItem>
            </SubMenu>
            <MenuItem data-testid="item-c">C</MenuItem>
          </>
        ),
      });

      await openMenu();
      expect(queryByTestId('submenu')).toHaveFocus();
      userEvent.keyboard('{arrowright}');
      userEvent.keyboard('{arrowdown}');
      expect(queryByTestId('item-a')).toHaveFocus();

      userEvent.click(getByTestId(LGIDs.submenuToggle)!);
      await waitForTransition();

      await waitFor(() => {
        expect(onExited).toHaveBeenCalled();
        expect(queryByTestId('submenu')).toHaveFocus();
      });
    });

    test('when a submenu opens, an element below it should remain highlighted', async () => {
      const onEntered = jest.fn();

      const { queryByTestId, getByTestId, openMenu } = renderMenu({
        children: (
          <>
            <SubMenu
              data-testid="submenu"
              title="Submenu"
              onEntered={onEntered}
            >
              <MenuItem data-testid="item-a">A</MenuItem>
              <MenuItem data-testid="item-b">B</MenuItem>
            </SubMenu>
            <MenuItem data-testid="item-c">C</MenuItem>
          </>
        ),
      });
      await openMenu();
      expect(queryByTestId('submenu')).toHaveFocus();
      userEvent.keyboard('{arrowup}');
      expect(queryByTestId('item-c')).toHaveFocus();

      // Open the submenu
      userEvent.click(getByTestId(LGIDs.submenuToggle)!);

      await waitForTransition();
      await waitFor(() => {
        expect(onEntered).toHaveBeenCalled();
        expect(queryByTestId('item-c')).toHaveFocus();
      });
    });

    test('when a submenu closes, an element below it should remain highlighted', async () => {
      const onExited = jest.fn();

      const { queryByTestId, getByTestId, openMenu } = renderMenu({
        children: (
          <>
            <SubMenu data-testid="submenu" title="Submenu" onExited={onExited}>
              <MenuItem data-testid="item-a">A</MenuItem>
              <MenuItem data-testid="item-b">B</MenuItem>
            </SubMenu>
            <MenuItem data-testid="item-c">C</MenuItem>
          </>
        ),
      });
      await openMenu();
      expect(queryByTestId('submenu')).toHaveFocus();
      userEvent.keyboard('{arrowright}'); // open the submenu
      userEvent.keyboard('{arrowup}');
      expect(queryByTestId('item-c')).toHaveFocus();

      // Close the submenu
      userEvent.click(getByTestId(LGIDs.submenuToggle)!);

      await waitForTransition();
      await waitFor(() => {
        expect(onExited).toHaveBeenCalled();
        expect(queryByTestId('item-c')).toHaveFocus();
      });
    });
  });
});
