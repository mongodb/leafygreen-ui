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

import Button from '@leafygreen-ui/button';
import { Optional } from '@leafygreen-ui/lib';
import { RenderMode } from '@leafygreen-ui/popover';
import { waitForTransition } from '@leafygreen-ui/testing-lib';

import { getLgIds } from './utils';

import { MenuProps } from './Menu';
import { Menu, MenuItem, MenuSeparator, SubMenu } from '.';

const lgIds = getLgIds();
const menuTestId = lgIds.menu;
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
      <Menu trigger={trigger} {...rest}>
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
    const menuEl = await renderResult.findByTestId(lgIds.root);
    const menuItemElements = await within(menuEl).findAllByRole('menuitem');

    return {
      menuEl,
      menuItemElements,
    };
  }

  /** Opens the menu, and manually fires transition events */
  async function openMenu(options?: { withKeyboard: boolean }) {
    if (options?.withKeyboard) {
      triggerEl.focus();
      userEvent.keyboard('{enter}');
    } else {
      userEvent.click(triggerEl);
    }

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
        const menu = getByTestId(lgIds.root);
        expect(menu).toBeInTheDocument();
      });

      test('renders all children', () => {
        const { getByText } = renderMenu({ open: true, setOpen });
        const menuItem = getByText('Item A');
        expect(menuItem).toBeInTheDocument();
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

    test('First item is not focused when menu is opened', async () => {
      const { triggerEl, findMenuElements } = renderMenu({});
      userEvent.click(triggerEl);
      const { menuEl, menuItemElements } = await findMenuElements();
      await waitFor(() => {
        // JSDOM does not automatically fire these events
        fireEvent.transitionEnd(menuEl as Element);
        expect(menuItemElements[0]).not.toHaveFocus();
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

    test('Clicking outside the menu closes the menu, and keeps focus on the menu trigger', async () => {
      const { openMenu, backdropEl, triggerEl } = renderMenu({});
      const { menuEl } = await openMenu();

      expect(menuEl).toBeInTheDocument();

      userEvent.click(backdropEl);
      await waitForElementToBeRemoved(menuEl);

      expect(menuEl).not.toBeInTheDocument();
      expect(triggerEl).toHaveFocus();
    });

    test("Clicking a button outside the menu fires that button's handlers, and sets focus to the button", async () => {
      const otherButtonHandler = jest.fn();
      const { getByTestId, findByTestId } = render(
        <>
          <Menu trigger={defaultTrigger} data-testid={menuTestId}>
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
          <Button data-testid="outside-button" onClick={otherButtonHandler}>
            Outside Button
          </Button>
        </>,
      );
      const button = getByTestId('outside-button');
      const trigger = getByTestId(menuTriggerTestId);
      userEvent.click(trigger);

      const menuEl = await findByTestId(menuTestId);

      userEvent.click(button);
      await waitForElementToBeRemoved(menuEl);
      await waitFor(() => {
        expect(otherButtonHandler).toHaveBeenCalled();
        expect(button).toHaveFocus();
      });
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
      const menu = getByTestId(lgIds.root);
      await waitFor(() => {
        expect(menu).toBeInTheDocument();
        expect(parentHandler).toHaveBeenCalled();
      });
    });
  });

  describe('Keyboard Interaction', () => {
    type CloseKeys = 'esc' | 'tab';
    type OpenKeys = 'enter' | 'space';
    type Keys = CloseKeys | OpenKeys;
    const closeKeys: Array<Array<CloseKeys>> = [['esc'], ['tab']];
    const openKeys: Array<Array<OpenKeys>> = [['enter'], ['space']];

    const userEventInteraction = (element: HTMLElement, key: Keys) => {
      if (key === 'tab') {
        userEvent.tab();
      } else if (key === 'esc') {
        userEvent.type(element, `{${key}}`);
      } else {
        userEvent.keyboard(`{${key}}`);
      }
    };

    describe.each(openKeys)('when keying %s on trigger element', key => {
      test('Opens menu', async () => {
        const { triggerEl, findMenuElements } = renderMenu({});
        triggerEl.focus();
        userEventInteraction(triggerEl, key);
        const { menuEl } = await findMenuElements();
        await waitFor(() => {
          expect(menuEl).toBeInTheDocument();
        });
      });

      test('First item is focused when menu is opened', async () => {
        const { triggerEl, findMenuElements } = renderMenu({});
        triggerEl.focus();
        userEventInteraction(triggerEl, key);
        const { menuItemElements } = await findMenuElements();
        await waitFor(() => {
          expect(menuItemElements[0]).toHaveFocus();
        });
      });
    });

    describe.each(closeKeys)('when keying %s on menu element', key => {
      test('Closes menu', async () => {
        const { openMenu } = renderMenu({});
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(menuEl).not.toBeInTheDocument();
      });

      test(`Returns focus to trigger when renderMode=${RenderMode.TopLayer}`, async () => {
        const { openMenu, triggerEl } = renderMenu({
          renderMode: RenderMode.TopLayer,
        });
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(triggerEl).toHaveFocus();
      });

      test(`Returns focus to trigger when renderMode=${RenderMode.Portal}`, async () => {
        const { openMenu, triggerEl } = renderMenu({
          renderMode: RenderMode.Portal,
        });
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(triggerEl).toHaveFocus();
      });

      test(`Returns focus to trigger when renderMode=${RenderMode.Inline}`, async () => {
        const { openMenu, triggerEl } = renderMenu({
          renderMode: RenderMode.Inline,
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
          const { menuItemElements } = await openMenu({ withKeyboard: true });
          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

          userEvent.keyboard('{arrowdown}');
          expect(menuItemElements[1]).toHaveFocus();
        });

        test('cycles highlight to the top', async () => {
          const { openMenu } = renderMenu({});
          const { menuItemElements } = await openMenu({ withKeyboard: true });
          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

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

            const { menuItemElements } = await openMenu({ withKeyboard: true });
            expect(menuItemElements).toHaveLength(3);
            await waitFor(() => expect(queryByTestId('submenu')).toHaveFocus());
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

            const { menuItemElements } = await openMenu({ withKeyboard: true });
            expect(menuItemElements).toHaveLength(2);
            await waitFor(() => expect(queryByTestId('submenu')).toHaveFocus());
            userEvent.keyboard('{arrowdown}');
            expect(queryByTestId('item-c')).toHaveFocus();
          });
        });
      });

      describe('Up arrow', () => {
        test('highlights the previous option in the menu', async () => {
          const { openMenu } = renderMenu({});
          const { menuItemElements } = await openMenu({ withKeyboard: true });
          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

          userEvent.keyboard('{arrowdown}');
          expect(menuItemElements[1]).toHaveFocus();

          userEvent.keyboard('{arrowup}');
          expect(menuItemElements[0]).toHaveFocus();
        });

        test('cycles highlight to the bottom', async () => {
          const { openMenu } = renderMenu({});
          const { menuItemElements } = await openMenu({ withKeyboard: true });
          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

          const lastOption = menuItemElements[menuItemElements.length - 1];
          userEvent.keyboard('{arrowup}');
          expect(lastOption).toHaveFocus();
        });
      });
    });

    test('Enter key on a menuitem does not close the menu', async () => {
      const { openMenu } = renderMenu({});
      const { menuEl, menuItemElements } = await openMenu({
        withKeyboard: true,
      });

      expect(menuEl).toBeInTheDocument();

      const firstItem = menuItemElements[0];

      await waitFor(() => expect(firstItem).toHaveFocus());

      userEvent.keyboard('[Enter]');

      await act(async () => await waitForTimeout());
      expect(menuEl).toBeInTheDocument();
    });

    test('Space key on a menuitem does not close the menu', async () => {
      const { openMenu } = renderMenu({});
      const { menuEl, menuItemElements } = await openMenu({
        withKeyboard: true,
      });

      expect(menuEl).toBeInTheDocument();

      const firstItem = menuItemElements[0];

      await waitFor(() => expect(firstItem).toHaveFocus());

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

      await openMenu({ withKeyboard: true });
      await waitFor(() => expect(queryByTestId('submenu')).toHaveFocus());

      userEvent.click(getByTestId(lgIds.submenuToggle)!);
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

      await openMenu({ withKeyboard: true });
      await waitFor(() => expect(queryByTestId('submenu')).toHaveFocus());

      userEvent.keyboard('{arrowright}');
      userEvent.keyboard('{arrowdown}');
      expect(queryByTestId('item-a')).toHaveFocus();

      userEvent.click(getByTestId(lgIds.submenuToggle)!);
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
      await openMenu({ withKeyboard: true });
      await waitFor(() => expect(queryByTestId('submenu')).toHaveFocus());

      userEvent.keyboard('{arrowup}');
      expect(queryByTestId('item-c')).toHaveFocus();

      // Open the submenu
      userEvent.click(getByTestId(lgIds.submenuToggle)!);

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
      await openMenu({ withKeyboard: true });
      await waitFor(() => expect(queryByTestId('submenu')).toHaveFocus());

      userEvent.keyboard('{arrowright}'); // open the submenu
      userEvent.keyboard('{arrowup}');
      expect(queryByTestId('item-c')).toHaveFocus();

      // Close the submenu
      userEvent.click(getByTestId(lgIds.submenuToggle)!);

      await waitForTransition();
      await waitFor(() => {
        expect(onExited).toHaveBeenCalled();
        expect(queryByTestId('item-c')).toHaveFocus();
      });
    });
  });
});
