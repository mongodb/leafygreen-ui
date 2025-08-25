import React, { createRef } from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Size } from '@leafygreen-ui/button';
import { MenuItem } from '@leafygreen-ui/menu';
import { RenderMode } from '@leafygreen-ui/popover';

import { getTestUtils } from '../testing';

import { SplitButton } from './SplitButton';
import { Align, Justify, Variant } from './SplitButton.types';

// Test data
const defaultMenuItems = [
  <MenuItem key="edit">Edit</MenuItem>,
  <MenuItem key="duplicate">Duplicate</MenuItem>,
  <MenuItem key="delete" description="This action cannot be undone">
    Delete
  </MenuItem>,
  <MenuItem key="archive" disabled>
    Archive
  </MenuItem>,
];

const basicProps = {
  label: 'Primary Action',
  menuItems: defaultMenuItems,
};

// Helper function to render SplitButton with getTestUtils
function renderSplitButtonWithUtils(props: any = {}) {
  const allProps = { ...basicProps, ...props };
  const renderResult = render(<SplitButton {...allProps} />);
  const utils = getTestUtils(props['data-lgid']);

  return {
    ...renderResult,
    utils,
  };
}

describe('SplitButton - Comprehensive Test Suite', () => {
  describe('Accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = renderSplitButtonWithUtils();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has no accessibility violations when menu is open', async () => {
      const { container, utils } = renderSplitButtonWithUtils();

      await utils.openMenu();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has proper ARIA attributes', () => {
      const { utils } = renderSplitButtonWithUtils();

      const button = utils.getButton();
      const trigger = utils.getTrigger();

      expect(button).toHaveAttribute('type', 'button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('updates aria-expanded when menu opens/closes', async () => {
      const { utils } = renderSplitButtonWithUtils();
      const trigger = utils.getTrigger();

      // Initially closed
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      // Open menu
      await utils.openMenu();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Rendering', () => {
    test('renders primary button with correct label', () => {
      const { utils } = renderSplitButtonWithUtils({ label: 'Custom Label' });

      const button = utils.getButton();
      expect(button).toHaveTextContent('Custom Label');
      expect(button).toBeVisible();
    });

    test('renders menu trigger button', () => {
      const { utils } = renderSplitButtonWithUtils();

      const trigger = utils.getTrigger();
      expect(trigger).toBeVisible();
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    });

    test('renders with custom className', () => {
      const { utils } = renderSplitButtonWithUtils({
        className: 'custom-split-button',
      });

      const root = utils.getRoot();
      expect(root).toHaveClass('custom-split-button');
    });

    test('renders with custom lgId', () => {
      const { utils } = renderSplitButtonWithUtils({
        'data-lgid': 'custom-split-button',
      });

      const root = utils.getRoot();
      expect(root).toHaveAttribute('data-lgid', 'custom-split-button');
    });

    test('accepts a portalRef', () => {
      const portalContainer = document.createElement('div');
      document.body.appendChild(portalContainer);
      const portalRef = createRef<HTMLElement>();
      renderSplitButtonWithUtils({
        open: true,
        portalContainer,
        portalRef,
        renderMode: RenderMode.Portal,
      });
      expect(portalRef.current).toBeDefined();
      expect(portalRef.current).toBe(portalContainer);
    });
  });

  describe('Menu Functionality', () => {
    test('opens menu when trigger is clicked', async () => {
      const { utils } = renderSplitButtonWithUtils();

      // Menu should not be visible initially
      expect(utils.queryMenu()).not.toBeInTheDocument();

      // Open menu
      await utils.openMenu();

      // Menu should now be visible
      expect(utils.getMenu()).toBeInTheDocument();
    });

    test('opens menu when trigger is activated with keyboard', async () => {
      const { utils } = renderSplitButtonWithUtils();

      // Open menu with keyboard
      await utils.openMenu({ withKeyboard: true });

      // Menu should be visible
      expect(utils.getMenu()).toBeInTheDocument();
    });

    test('displays correct number of menu items', async () => {
      const { utils, getAllByRole } = renderSplitButtonWithUtils();

      await utils.openMenu();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(4); // 4 items as defined in defaultMenuItems
    });

    test('menu items have correct content', async () => {
      const { utils, getAllByRole } = renderSplitButtonWithUtils();

      await utils.openMenu();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems[0]).toHaveTextContent('Edit');
      expect(menuItems[1]).toHaveTextContent('Duplicate');
      expect(menuItems[2]).toHaveTextContent('Delete');
      expect(menuItems[3]).toHaveTextContent('Archive');
    });

    test('disabled menu items are properly marked', async () => {
      const { utils, getAllByRole } = renderSplitButtonWithUtils();

      await utils.openMenu();

      const menuItems = getAllByRole('menuitem');
      const archiveItem = menuItems[3]; // Archive is disabled
      expect(archiveItem).toHaveAttribute('aria-disabled', 'true');
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('closes menu when clicking outside', async () => {
      const { utils } = renderSplitButtonWithUtils();

      // Open menu
      await utils.openMenu();
      expect(utils.getMenu()).toBeInTheDocument();

      // Close menu
      // Works correctly in the browser
      // https://github.com/testing-library/react-testing-library/issues/269#issuecomment-1453666401 - this needs v13 of testing-library
      // TODO: This is not triggered so the test fails
      await utils.closeMenu();
      expect(utils.queryMenu()).not.toBeInTheDocument();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('closes menu when pressing Escape', async () => {
      const { utils } = renderSplitButtonWithUtils();

      // Open menu
      await utils.openMenu();
      expect(utils.getMenu()).toBeInTheDocument();

      // Close with keyboard
      // Works correctly in the browser
      // https://github.com/testing-library/react-testing-library/issues/269#issuecomment-1453666401 - this needs v13 of testing-library
      // TODO: This is not triggered so the test fails
      await utils.closeMenu({ withKeyboard: true });
      expect(utils.queryMenu()).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('primary button click fires onClick handler', () => {
      const onClickSpy = jest.fn();
      const { utils } = renderSplitButtonWithUtils({ onClick: onClickSpy });

      const button = utils.getButton();
      userEvent.click(button);

      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    test('menu item selection fires onChange handler', async () => {
      const onChangeSpy = jest.fn();
      const { utils, getAllByRole } = renderSplitButtonWithUtils({
        onChange: onChangeSpy,
      });

      await utils.openMenu();

      const menuItems = getAllByRole('menuitem');
      userEvent.click(menuItems[0]); // Click "Edit"

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    test('disabled menu items do not trigger onChange', async () => {
      const onChangeSpy = jest.fn();
      const { utils, getAllByRole } = renderSplitButtonWithUtils({
        onChange: onChangeSpy,
      });

      await utils.openMenu();

      const menuItems = getAllByRole('menuitem');
      userEvent.click(menuItems[3]); // Click disabled "Archive" item

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    test('trigger click fires onTriggerClick handler when provided', async () => {
      const onTriggerClickSpy = jest.fn();
      const { utils } = renderSplitButtonWithUtils({
        onTriggerClick: onTriggerClickSpy,
      });

      const trigger = utils.getTrigger();
      userEvent.click(trigger);

      expect(onTriggerClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Disabled State', () => {
    test('identifies disabled state correctly', () => {
      const { utils } = renderSplitButtonWithUtils({ disabled: true });
      expect(utils.isDisabled()).toBeTruthy();
      expect(utils.getButton().getAttribute('aria-disabled')).toBeTruthy();
    });

    test('disabled button does not respond to clicks', () => {
      const onClickSpy = jest.fn();
      const { utils } = renderSplitButtonWithUtils({
        disabled: true,
        onClick: onClickSpy,
      });

      const button = utils.getButton();
      userEvent.click(button);

      expect(onClickSpy).not.toHaveBeenCalled();
    });

    test('disabled trigger does not open menu', async () => {
      const { utils } = renderSplitButtonWithUtils({ disabled: true });

      const trigger = utils.getTrigger();
      userEvent.click(trigger);

      // Menu should not appear
      expect(utils.queryMenu()).not.toBeInTheDocument();
    });

    test('disabled state affects both button and trigger', () => {
      const { utils } = renderSplitButtonWithUtils({ disabled: true });

      const button = utils.getButton();
      const trigger = utils.getTrigger();

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Variants and Styling', () => {
    test.each(Object.values(Variant))(
      'renders %s variant correctly',
      variant => {
        const { utils } = renderSplitButtonWithUtils({ variant });

        const button = utils.getButton();
        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
      },
    );

    test.each(Object.values(Size))('renders %s size correctly', size => {
      const { utils } = renderSplitButtonWithUtils({ size });

      const button = utils.getButton();
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
    });

    test('applies dark mode correctly', () => {
      const { utils } = renderSplitButtonWithUtils({ darkMode: true });

      const button = utils.getButton();
      expect(button).toBeInTheDocument();
    });
  });

  describe('Menu Positioning', () => {
    test.each(Object.values(Align))('handles %s alignment', async align => {
      const { utils } = renderSplitButtonWithUtils({ align });

      await utils.openMenu();

      const menu = utils.getMenu();
      expect(menu).toBeInTheDocument();
    });

    test.each(Object.values(Justify))(
      'handles %s justification',
      async justify => {
        const { utils } = renderSplitButtonWithUtils({ justify });

        await utils.openMenu();

        const menu = utils.getMenu();
        expect(menu).toBeInTheDocument();
      },
    );
  });

  describe('Polymorphic Behavior', () => {
    test('renders as anchor when href is provided', () => {
      const { utils } = renderSplitButtonWithUtils({
        href: 'https://example.com',
      });

      const button = utils.getButton();
      expect(button.tagName.toLowerCase()).toBe('a');
      expect(button).toHaveAttribute('href', 'https://example.com');
    });

    test('renders as button by default', () => {
      const { utils } = renderSplitButtonWithUtils();

      const button = utils.getButton();
      expect(button.tagName.toLowerCase()).toBe('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('Accepts string as `as` prop', () => {
      <SplitButton as="p" label="label" menuItems={defaultMenuItems} />;
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('Accepts component as `as` prop', () => {
      const As = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );
      render(
        <SplitButton
          data-testid="split-button"
          as={As}
          label="label"
          menuItems={defaultMenuItems}
        />,
      );
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('types', () => {
      const AnchorLikeWrapper = (props: JSX.IntrinsicElements['a']) => {
        return <a {...props}>content</a>;
      };

      <>
        <SplitButton
          href="allowed"
          label="label"
          menuItems={defaultMenuItems}
        />
        <SplitButton
          as="a"
          href="allowed"
          label="label"
          menuItems={defaultMenuItems}
        />
        <SplitButton
          as="div"
          // @ts-expect-error - href not allowed when as is div
          href="string"
          label="label"
          menuItems={defaultMenuItems}
        />
        <SplitButton
          as={AnchorLikeWrapper}
          href="string"
          label="label"
          menuItems={defaultMenuItems}
        />
      </>;
    });
  });

  describe('Controlled State', () => {
    test('respects controlled open state', async () => {
      const setOpenSpy = jest.fn();
      const { utils, rerender } = renderSplitButtonWithUtils({
        open: false,
        setOpen: setOpenSpy,
      });

      // Initially closed
      expect(utils.queryMenu()).not.toBeInTheDocument();

      // Rerender with open=true
      rerender(
        <SplitButton {...basicProps} open={true} setOpen={setOpenSpy} />,
      );

      // Should now show menu
      expect(utils.getMenu()).toBeInTheDocument();
    });

    test('calls setOpen when trigger is clicked in controlled mode', () => {
      const setOpenSpy = jest.fn();
      const { utils } = renderSplitButtonWithUtils({
        open: false,
        setOpen: setOpenSpy,
      });

      const trigger = utils.getTrigger();
      userEvent.click(trigger);

      expect(setOpenSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    test('handles empty menu items array', () => {
      const { utils } = renderSplitButtonWithUtils({ menuItems: [] });

      expect(utils.getButton()).toBeInTheDocument();
      expect(utils.getTrigger()).toBeInTheDocument();
    });

    test('handles single menu item', async () => {
      const singleItem = [<MenuItem key="single">Single Item</MenuItem>];
      const { utils, getAllByRole } = renderSplitButtonWithUtils({
        menuItems: singleItem,
      });

      await utils.openMenu();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(1);
      expect(menuItems[0]).toHaveTextContent('Single Item');
    });

    test('handles long button labels', () => {
      const longLabel =
        'This is a very long button label that might cause layout issues';
      const { utils } = renderSplitButtonWithUtils({ label: longLabel });

      const button = utils.getButton();
      expect(button).toHaveTextContent(longLabel);
    });

    test('handles special characters in labels', () => {
      const specialLabel = 'Action <>&"\'';
      const { utils } = renderSplitButtonWithUtils({ label: specialLabel });

      const button = utils.getButton();
      expect(button).toHaveTextContent(specialLabel);
    });
  });

  describe('Keyboard Interaction', () => {
    type CloseKeys = 'esc' | 'tab';
    const closeKeys: Array<Array<CloseKeys>> = [['esc'], ['tab']];

    const userEventInteraction = (el: HTMLElement, key: CloseKeys) => {
      if (key === 'tab') {
        userEvent.tab();
      } else {
        userEvent.type(el, `{${key}}`);
      }
    };

    describe.each(closeKeys)('%s key', key => {
      test('Closes menu', async () => {
        const { utils } = renderSplitButtonWithUtils({});

        await utils.openMenu();
        const menuEl = utils.getMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(menuEl).not.toBeInTheDocument();
      });

      test('Returns focus to trigger {renderMode: "portal"}', async () => {
        const { utils } = renderSplitButtonWithUtils({
          renderMode: 'portal',
        });

        await utils.openMenu();
        const menuEl = utils.getMenu();
        const trigger = utils.getTrigger();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(trigger).toHaveFocus();
      });

      test('Returns focus to trigger {renderMode: "inline"}', async () => {
        const { utils } = renderSplitButtonWithUtils({
          renderMode: 'inline',
        });

        await utils.openMenu();
        const menuEl = utils.getMenu();
        const trigger = utils.getTrigger();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(trigger).toHaveFocus();
      });
    });
  });

  type SelectionKeys = 'enter' | 'space';
  const selectionKeys: Array<Array<SelectionKeys>> = [['enter'], ['space']];

  describe.each(selectionKeys)('%s key', key => {
    const onClick = jest.fn();
    const menuItems = [
      <MenuItem key="0" onClick={onClick} description="I am also a description">
        Menu Item With Description
      </MenuItem>,
      <MenuItem key="1" disabled>
        Disabled Menu Item
      </MenuItem>,
    ];

    afterEach(() => {
      onClick.mockReset();
    });

    test('Fires the click handler of the highlighted item', async () => {
      const { utils, getAllByRole } = renderSplitButtonWithUtils({
        menuItems,
      });

      await utils.openMenu({
        withKeyboard: true,
      });

      const menuItemElements = getAllByRole('menuitem');

      await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

      userEvent.type(menuItemElements?.[0]!, `{${key}}`);
      expect(onClick).toHaveBeenCalled();
    });

    describe('Arrow keys', () => {
      const menuItems = [
        <MenuItem key="0">Item 0</MenuItem>,
        <MenuItem key="1">Item 1</MenuItem>,
        <MenuItem key="2">Item 2</MenuItem>,
        <MenuItem key="3">Item 3</MenuItem>,
      ];

      describe('Down arrow', () => {
        test('highlights the next option in the menu', async () => {
          const { utils, getAllByRole } = renderSplitButtonWithUtils({
            menuItems,
          });
          await utils.openMenu({ withKeyboard: true });

          const menuEl = utils.getMenu();
          const menuItemElements = getAllByRole('menuitem');

          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

          userEvent.type(menuEl!, '{arrowdown}');
          expect(menuItemElements[1]).toHaveFocus();
        });

        test('cycles highlight to the top', async () => {
          const { utils, getAllByRole } = renderSplitButtonWithUtils({
            menuItems,
          });
          await utils.openMenu({ withKeyboard: true });

          const menuEl = utils.getMenu();
          const menuItemElements = getAllByRole('menuitem');

          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

          for (let i = 0; i < menuItemElements.length; i++) {
            userEvent.type(menuEl!, '{arrowdown}');
          }

          expect(menuItemElements[0]).toHaveFocus();
        });
      });

      describe('Up arrow', () => {
        test('highlights the previous option in the menu', async () => {
          const { utils, getAllByRole } = renderSplitButtonWithUtils({
            menuItems,
          });
          await utils.openMenu({ withKeyboard: true });

          const menuEl = utils.getMenu();
          const menuItemElements = getAllByRole('menuitem');

          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

          userEvent.type(menuEl!, '{arrowdown}');
          expect(menuItemElements[1]).toHaveFocus();

          userEvent.type(menuEl!, '{arrowup}');
          expect(menuItemElements[0]).toHaveFocus();
        });

        test('cycles highlight to the bottom', async () => {
          const { utils, getAllByRole } = renderSplitButtonWithUtils({
            menuItems,
          });
          await utils.openMenu({ withKeyboard: true });

          const menuEl = utils.getMenu();
          const menuItemElements = getAllByRole('menuitem');

          await waitFor(() => expect(menuItemElements[0]).toHaveFocus());

          const lastOption = menuItemElements[menuItemElements.length - 1];
          userEvent.type(menuEl!, '{arrowup}');
          expect(lastOption).toHaveFocus();
        });
      });
    });
  });
});
