import React from 'react';
import {
  act,
  getAllByRole as globalGetAllByRole,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuProps } from './Menu';
import { Menu, MenuItem, MenuSeparator } from '.';

const menuTestId = 'menu-test-id';
const trigger = <button data-testid="menu-trigger">trigger</button>;

function renderMenu(props: Omit<MenuProps, 'children'> = {}) {
  const utils = render(
    <>
      <div data-testid="backdrop" />
      <Menu {...props} data-testid={menuTestId}>
        <MenuItem data-testid="menu-item-a">Item A</MenuItem>
        <MenuSeparator />
        <MenuItem href="http://mongodb.design">Item B</MenuItem>
      </Menu>
    </>,
  );

  const backdrop = utils.getByTestId('backdrop');
  return { ...utils, backdrop };
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
      const { getByRole, getByText } = renderMenu({
        setOpen: uncontrolledSetOpen,
        trigger,
      });

      const button = getByRole('button');
      userEvent.click(button);

      const menuItem = getByText('Item B');
      await waitFor(() => {
        expect(menuItem).toBeVisible();
      });

      userEvent.click(button);

      await waitForElementToBeRemoved(menuItem);
    });

    test('clicking a menuitem closes the menu', async () => {
      const { getByRole, getByTestId } = renderMenu({
        trigger,
      });
      const button = getByRole('button');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      await waitFor(() => {
        expect(menu).toBeInTheDocument();
      });

      const menuItem = getByTestId('menu-item-a');
      userEvent.click(menuItem);

      await waitFor(() => {
        expect(menu).not.toBeInTheDocument();
      });
    });

    test('clicking outside the menu closes the menu', async () => {
      const { getByRole, getByTestId, backdrop } = renderMenu({
        trigger,
      });
      const button = getByRole('button');
      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      await waitFor(() => {
        expect(menu).toBeInTheDocument();
      });

      userEvent.click(backdrop);

      await waitFor(() => {
        expect(menu).not.toBeInTheDocument();
      });
    });
  });

  describe('when controlled', () => {
    const ControlledExample = () => {
      const [open, setOpen] = React.useState(true);

      return (
        <>
          <div data-testid="backdrop" />
          <Menu open={open} setOpen={setOpen} data-testid="controlled-menu">
            <MenuItem data-testid="controlled-menu-item">Text</MenuItem>
          </Menu>
        </>
      );
    };

    test('clicking a menuitem closes the menu', async () => {
      const { getByTestId } = render(<ControlledExample />);

      const menu = getByTestId('controlled-menu');
      const menuItem = getByTestId('controlled-menu-item');

      expect(menu).toBeInTheDocument();

      userEvent.click(menuItem);

      await waitForElementToBeRemoved(menu);
      expect(menu).not.toBeInTheDocument();
    });

    test('clicking outside the menu closes the menu', async () => {
      const { getByTestId } = render(<ControlledExample />);

      const menu = getByTestId('controlled-menu');

      await waitFor(() => {
        expect(menu).toBeInTheDocument();
      });

      const backdrop = getByTestId('backdrop');

      userEvent.click(backdrop);

      await waitForElementToBeRemoved(menu);
      expect(menu).not.toBeInTheDocument();
    });
  });

  describe('Mouse interaction', () => {
    test('Clicking trigger opens menu', async () => {
      const { getByRole, getByTestId } = renderMenu({
        trigger,
      });
      const button = getByRole('button');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      await waitFor(() => {
        expect(menu).toBeInTheDocument();
      });
    });

    test('Click handlers on parent elements fire', async () => {
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
      await waitFor(() => {
        expect(menu).toBeInTheDocument();
        expect(parentHandler).toHaveBeenCalled();
      });
    });
  });

  type Keys = 'esc' | 'tab';
  const closeKeys: Array<Array<Keys>> = [['esc'], ['tab']];

  describe('Keyboard Interaction', () => {
    const userEventInteraction = (menu: HTMLElement, key: Keys) => {
      if (key === 'tab') {
        userEvent.tab();
      } else {
        userEvent.type(menu, `{${key}}`);
      }
    };

    describe.each(closeKeys)('%s key', key => {
      test('Closes menu', async () => {
        const { getByRole, getByTestId } = renderMenu({
          trigger,
        });
        const button = getByRole('button');
        userEvent.click(button);
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
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

        userEventInteraction(menu, key);
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

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(button).toHaveFocus();
      });
    });

    describe('Arrow keys', () => {
      let menu: HTMLElement;
      let options: Array<HTMLElement>;

      beforeEach(() => {
        const { getByTestId } = renderMenu({ trigger });
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
