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

import { MenuProps } from './Menu';
import { Menu, MenuItem, MenuSeparator } from '.';

const menuTestId = 'menu-test-id';
const menuTriggerTestId = 'menu-trigger';
const defaultTrigger = <button data-testid={menuTriggerTestId}>trigger</button>;

function waitForTimeout(timeout = 500) {
  return new Promise(res => setTimeout(res, timeout));
}

/** Renders a Menu with the given props */
function renderMenu({
  trigger = defaultTrigger,
  ...rest
}: Omit<MenuProps, 'children'> = {}) {
  const renderResult = render(
    <>
      <div data-testid="backdrop" />
      <Menu trigger={trigger} {...rest} data-testid={menuTestId}>
        <MenuItem data-testid="menu-item-a">Item A</MenuItem>
        <MenuSeparator />
        <MenuItem href="http://mongodb.design">Item B</MenuItem>
        <MenuItem href="http://mongodb.design">Item C</MenuItem>
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

    describe('controlled `open`', () => {
      const setOpen = jest.fn();
      test('menu renders when `open` prop is set', () => {
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

        // JSDOM does not automatically fire these events
        fireEvent.transitionEnd(menuEl as Element);

        await waitFor(() => {
          const firstItem = menuItemElements[0];
          expect(firstItem).toHaveFocus();
        });
      });

      test('uncontrolled if `open` prop is not set, with `setOpen` callback', async () => {
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
          const { menuEl, menuItemElements } = await openMenu();
          userEvent.type(menuEl!, '{arrowdown}');
          expect(menuItemElements[1]).toHaveFocus();
        });
        test('cycles highlight to the top', async () => {
          const { openMenu } = renderMenu({});
          const { menuEl, menuItemElements } = await openMenu();

          for (let i = 0; i < menuItemElements.length; i++) {
            userEvent.type(menuEl!, '{arrowdown}');
          }

          expect(menuItemElements[0]).toHaveFocus();
        });
      });

      describe('Up arrow', () => {
        test('highlights the previous option in the menu', async () => {
          const { openMenu } = renderMenu({});
          const { menuEl, menuItemElements } = await openMenu();

          userEvent.type(menuEl!, '{arrowdown}');
          userEvent.type(menuEl!, '{arrowup}');
          expect(menuItemElements[0]).toHaveFocus();
        });
        test('cycles highlight to the bottom', async () => {
          const { openMenu } = renderMenu({});
          const { menuEl, menuItemElements } = await openMenu();

          const lastOption = menuItemElements[menuItemElements.length - 1];
          userEvent.type(menuEl!, '{arrowup}');
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
});
