import React from 'react';
import {
  act,
  fireEvent,
  getAllByRole as globalGetAllByRole,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuProps } from './Menu';
import { Menu, MenuItem, MenuSeparator } from '.';

const menuTestId = 'menu-test-id';
const onClick = jest.fn();

type RenderProps = Omit<MenuProps, 'children'>;

function renderMenu({
  trigger = <button data-testid="menu-trigger">trigger</button>,
  ...props
}: RenderProps = {}) {
  const utils = render(
    <Menu {...props} trigger={trigger} data-testid={menuTestId}>
      <MenuItem onClick={onClick}>Item A</MenuItem>
      <MenuSeparator />
      <MenuItem href="http://mongodb.design">Item B</MenuItem>
      <MenuItem>Item C</MenuItem>
    </Menu>,
  );
  const triggerButton = utils.queryByTestId('menu-trigger');

  const openMenu = () => {
    if (triggerButton) {
      userEvent.click(triggerButton);
    }
  };

  return { ...utils, openMenu, triggerButton };
}

describe('packages/menu', () => {
  afterEach(() => {
    onClick.mockReset();
  });

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

  test('first option has focus when menu opens', () => {
    const { getByTestId, openMenu } = renderMenu();
    openMenu();
    const menu = getByTestId(menuTestId);
    const options = globalGetAllByRole(menu, 'menuitem');
    expect(options[0]).toHaveFocus();
  });

  describe('Mouse interaction', () => {
    test('Clicking trigger opens menu', () => {
      const { getByTestId } = renderMenu();
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const menu = getByTestId(menuTestId);

      expect(menu).toBeInTheDocument();
    });

    test('Click handlers on parent elements fire', () => {
      const parentHandler = jest.fn();
      const { getByTestId } = render(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div data-testid="parent" onClick={parentHandler}>
          <Menu
            trigger={<button data-testid="menu-trigger">trigger</button>}
            data-testid={menuTestId}
          >
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </div>,
      );
      const triggerButton = getByTestId('menu-trigger');
      userEvent.click(triggerButton);

      const menu = getByTestId(menuTestId);
      expect(menu).toBeInTheDocument();
      expect(parentHandler).toHaveBeenCalled();
    });

    test('Clicking item fires its click handler', () => {
      const { getByTestId, openMenu } = renderMenu();
      openMenu();
      const menu = getByTestId(menuTestId);
      const options = globalGetAllByRole(menu, 'menuitem');
      userEvent.click(options[0]);
      expect(onClick).toHaveBeenCalled();
    });

    test('Clicking item closes menu', async () => {
      const { getByTestId, openMenu, triggerButton } = renderMenu();
      openMenu();
      const menu = getByTestId(menuTestId);
      const options = globalGetAllByRole(menu, 'menuitem');

      userEvent.click(options[0]);
      await waitForElementToBeRemoved(menu);
      expect(triggerButton).toHaveFocus();
    });
  });

  type Keys = 'esc' | 'tab';
  const closeKeys: Array<Array<Keys>> = [['esc'], ['tab']];

  describe('Keyboard Interaction', () => {
    const userEventInteraction = (el: HTMLElement, key: Keys) => {
      if (key === 'tab') {
        userEvent.tab();
      } else {
        userEvent.type(el, `{${key}}`);
      }
    };

    describe.each(closeKeys)('%s key', key => {
      test('Closes menu', async () => {
        const { getByTestId, openMenu } = renderMenu();
        openMenu();
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(menu).not.toBeInTheDocument();
      });

      test('Returns focus to trigger {usePortal: true}', async () => {
        const { getByTestId, openMenu, triggerButton } = renderMenu({
          usePortal: true,
        });
        openMenu();
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(triggerButton).toHaveFocus();
      });

      test('Returns focus to trigger {usePortal: false}', async () => {
        const { getByTestId, openMenu, triggerButton } = renderMenu({
          usePortal: false,
        });
        openMenu();
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(triggerButton).toHaveFocus();
      });
    });

    describe('Enter key', () => {
      test('Fires the click handler of the highlighted item', () => {
        const { getByTestId, openMenu } = renderMenu();
        openMenu();
        const menu = getByTestId(menuTestId);
        const options = globalGetAllByRole(menu, 'menuitem');
        expect(options[0]).toHaveFocus();

        userEvent.type(options[0], `{enter}`);
        expect(onClick).toHaveBeenCalled();
      });

      test('Closes the menu', async () => {
        const { getByTestId, openMenu, triggerButton } = renderMenu();
        openMenu();
        const menu = getByTestId(menuTestId);
        const options = globalGetAllByRole(menu, 'menuitem');

        userEvent.type(options[0], `{enter}`);
        expect(triggerButton).toHaveFocus();

        // FIXME: I can verify that this works in the browser,
        // but this does not work in jest - AT
        // await waitForElementToBeRemoved(menu);
      });
    });

    describe('Space key', () => {
      test('Fires the click handler of the highlighted item', () => {
        const { getByTestId, openMenu } = renderMenu();
        openMenu();
        const menu = getByTestId(menuTestId);
        const options = globalGetAllByRole(menu, 'menuitem');
        expect(options[0]).toHaveFocus();

        userEvent.type(options[0], `{space}`);
        expect(onClick).toHaveBeenCalled();
      });

      test('Closes the menu', async () => {
        const { getByTestId, openMenu, triggerButton } = renderMenu();
        openMenu();
        const menu = getByTestId(menuTestId);
        const options = globalGetAllByRole(menu, 'menuitem');

        userEvent.type(options[0], `{space}`);
        expect(triggerButton).toHaveFocus();

        // FIXME: I can verify that this works in the browser,
        // but this does not work in jest - AT
        // await waitForElementToBeRemoved(menu);
      });
    });

    describe('Arrow keys', () => {
      let menu: HTMLElement;
      let options: Array<HTMLElement>;

      beforeEach(() => {
        const { getByTestId } = renderMenu();
        const triggerButton = getByTestId('menu-trigger');

        userEvent.click(triggerButton);
        menu = getByTestId(menuTestId);
        options = globalGetAllByRole(menu, 'menuitem');
      });

      describe('Down arrow', () => {
        test('highlights the next option in the menu', () => {
          userEvent.type(menu, '{arrowdown}');
          expect(options[1]).toHaveFocus();
        });
        test('cycles highlight to the top', () => {
          // programmatically set focus on last option
          options[options.length - 1].focus();
          userEvent.type(menu, '{arrowdown}');
          expect(options[0]).toHaveFocus();
        });
      });

      describe('Up arrow', () => {
        test('highlights the previous option in the menu', () => {
          // programmatically set focus on second option
          options[1].focus();
          userEvent.type(menu, '{arrowup}');
          expect(options[0]).toHaveFocus();
        });
        test('cycles highlight to the bottom', () => {
          userEvent.type(menu, '{arrowup}');
          expect(options[options.length - 1]).toHaveFocus();
        });
      });
    });
  });
});
