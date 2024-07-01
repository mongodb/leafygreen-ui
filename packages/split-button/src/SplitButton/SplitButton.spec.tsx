import React, { createRef } from 'react';
import {
  fireEvent,
  getAllByRole as globalGetAllByRole,
  render,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { MenuItem } from '@leafygreen-ui/menu';

import { MenuItemsType } from './SplitButton.types';
import { SplitButton } from '.';

const menuTestId = 'lg-split-button-menu';

const getMenuItems = (): MenuItemsType => {
  return [
    <MenuItem key="0" description="I am also a description">
      Menu Item With Description
    </MenuItem>,
    <MenuItem key="1" disabled>
      Disabled Menu Item
    </MenuItem>,
    <MenuItem key="2">Menu Item</MenuItem>,
    <MenuItem key="3">Another Menu Item</MenuItem>,
  ];
};

const defaultProps = {
  label: 'Button Label',
  menuItems: getMenuItems(),
};

function renderSplitButton(props = {}) {
  const renderResult = render(
    <SplitButton data-testid="split-button" {...defaultProps} {...props} />,
  );
  const wrapper = renderResult.container.firstChild as HTMLElement;
  const primaryButton = renderResult.getByTestId('split-button');
  const menuTrigger = primaryButton.nextSibling as HTMLElement;

  /**
   * Since menu elements won't exist until component is interacted with,
   * call this after opening the menu.
   * @returns Object of menu elements
   */
  // TODO: Consolidate with Menu component util
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

  /**
   * Opens the menu, and manually fires transition events
   */
  async function openMenu() {
    userEvent.click(menuTrigger);
    const menuElements = await findMenuElements();
    fireEvent.transitionEnd(menuElements.menuEl as Element); // JSDOM does not automatically fire these events
    return menuElements;
  }

  return {
    ...renderResult,
    primaryButton,
    menuTrigger,
    wrapper,
    findMenuElements,
    openMenu,
  };
}

describe('packages/split-button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSplitButton({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Wrapper container', () => {
    test('renders correct className', () => {
      const { wrapper } = renderSplitButton({
        className: 'split-button-class',
      });

      expect(wrapper.classList.contains('split-button-class')).toBe(true);
    });
  });

  describe('Primary button', () => {
    test('renders the correct label', () => {
      const { primaryButton } = renderSplitButton({});

      expect(primaryButton.textContent).toBe(defaultProps.label);
    });

    test('is disabled when disabled is true', () => {
      const { primaryButton } = renderSplitButton({
        disabled: true,
      });

      expect(primaryButton.getAttribute('aria-disabled')).toBe('true');
    });

    test('fires onClick handler once when clicked', () => {
      const onClick = jest.fn();
      const { primaryButton } = renderSplitButton({
        onClick,
      });

      fireEvent.click(primaryButton);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('does not fire onClick handler when disabled', () => {
      const onClick = jest.fn();
      const { primaryButton } = renderSplitButton({
        disabled: true,
        onClick,
      });

      fireEvent.click(primaryButton);
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('Menu', () => {
    test('trigger opens the menu when clicked', () => {
      const { menuTrigger, getByTestId } = renderSplitButton({});

      fireEvent.click(menuTrigger as HTMLElement);

      const menu = getByTestId(menuTestId);
      expect(menu).toBeInTheDocument();
    });

    test('disabled trigger does not open the menu when clicked', () => {
      const { menuTrigger, queryByTestId } = renderSplitButton({
        disabled: true,
      });

      fireEvent.click(menuTrigger as HTMLElement);

      const menu = queryByTestId(menuTestId);
      expect(menu).not.toBeInTheDocument();
    });

    test('has correct menu items', () => {
      const { menuTrigger, getByTestId } = renderSplitButton({});

      fireEvent.click(menuTrigger as HTMLElement);

      const menu = getByTestId(menuTestId);
      expect(menu.childElementCount).toEqual(4);
    });

    test('accepts a portalRef', () => {
      const portalContainer = document.createElement('div');
      document.body.appendChild(portalContainer);
      const portalRef = createRef<HTMLElement>();
      renderSplitButton({
        open,
        portalContainer,
        portalRef,
      });
      expect(portalRef.current).toBeDefined();
      expect(portalRef.current).toBe(portalContainer);
    });
  });

  describe('MenuItem', () => {
    test('click triggers onChange callback', () => {
      const onChange = jest.fn();
      const { menuTrigger, getByTestId } = renderSplitButton({ onChange });

      userEvent.click(menuTrigger as HTMLElement);

      const menu = getByTestId(menuTestId);
      const options = globalGetAllByRole(menu, 'menuitem');
      userEvent.click(options[0]);
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  // TODO: Consolidate tests with Menu component
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
        const { openMenu } = renderSplitButton({});
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(menuEl).not.toBeInTheDocument();
      });
      test('Returns focus to trigger {usePortal: true}', async () => {
        const { openMenu, menuTrigger } = renderSplitButton({
          usePortal: true,
        });
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(menuTrigger).toHaveFocus();
      });

      test('Returns focus to trigger {usePortal: false}', async () => {
        const { openMenu, menuTrigger } = renderSplitButton({
          usePortal: false,
        });
        const { menuEl } = await openMenu();

        userEventInteraction(menuEl!, key);
        await waitForElementToBeRemoved(menuEl);
        expect(menuTrigger).toHaveFocus();
      });
    });

    type SelectionKeys = 'enter' | 'space';
    const selectionKeys: Array<Array<SelectionKeys>> = [['enter'], ['space']];

    describe.each(selectionKeys)('%s key', key => {
      const onClick = jest.fn();
      const menuItems = [
        <MenuItem
          key="0"
          onClick={onClick}
          description="I am also a description"
        >
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
        const { openMenu } = renderSplitButton({
          menuItems,
        });
        const { menuItemElements } = await openMenu();
        expect(menuItemElements[0]).toHaveFocus();

        userEvent.type(menuItemElements?.[0]!, `{${key}}`);
        expect(onClick).toHaveBeenCalled();
      });

      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('Closes the menu', async () => {
        // Works correctly in the browser
        // https://github.com/testing-library/react-testing-library/issues/269#issuecomment-1453666401 - this needs v13 of testing-library
        // TODO: This is not triggered so the test fails
        const { openMenu, menuTrigger } = renderSplitButton({
          menuItems,
        });
        const { menuEl, menuItemElements } = await openMenu();
        userEvent.type(menuItemElements?.[0]!, `{${key}}`);

        expect(menuTrigger).toHaveFocus();
        await waitForElementToBeRemoved(menuEl);
      });
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
          const { openMenu } = renderSplitButton({ menuItems });
          const { menuEl, menuItemElements } = await openMenu();
          userEvent.type(menuEl!, '{arrowdown}');
          expect(menuItemElements[1]).toHaveFocus();
        });
        test('cycles highlight to the top', async () => {
          const { openMenu } = renderSplitButton({ menuItems });
          const { menuEl, menuItemElements } = await openMenu();

          for (let i = 0; i < menuItemElements.length; i++) {
            userEvent.type(menuEl!, '{arrowdown}');
          }

          expect(menuItemElements[0]).toHaveFocus();
        });
      });

      describe('Up arrow', () => {
        test('highlights the previous option in the menu', async () => {
          const { openMenu } = renderSplitButton({ menuItems });
          const { menuEl, menuItemElements } = await openMenu();

          userEvent.type(menuEl!, '{arrowdown}');
          userEvent.type(menuEl!, '{arrowup}');
          expect(menuItemElements[0]).toHaveFocus();
        });
        test('cycles highlight to the bottom', async () => {
          const { openMenu } = renderSplitButton({ menuItems });
          const { menuEl, menuItemElements } = await openMenu();

          const lastOption = menuItemElements[menuItemElements.length - 1];
          userEvent.type(menuEl!, '{arrowup}');
          expect(lastOption).toHaveFocus();
        });
      });
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  describe('Types behave as expected', () => {
    test.skip('Accepts base props', () => {
      <>
        <SplitButton label="label" menuItems={getMenuItems()} />
        <SplitButton
          label="label"
          menuItems={[
            <MenuItem key="0">Menu Item</MenuItem>,
            <MenuItem key="1" disabled>
              Disabled Menu Item
            </MenuItem>,
            <MenuItem key="2" description="I am also a description">
              , Menu Item With Description
            </MenuItem>,
          ]}
        />
        <SplitButton
          label="label"
          menuItems={getMenuItems()}
          onClick={() => {}}
          disabled={true}
          size="default"
          variant="default"
          darkMode={true}
          align="top"
          justify="start"
          className="test"
          usePortal={true}
          portalContainer={{} as HTMLElement}
          scrollContainer={{} as HTMLElement}
          portalClassName="classname"
          data-testid="test-id"
          open={false}
          triggerAriaLabel="im the trigger silly"
        />
        {/* @ts-expect-error - expects label and menuItems*/}
        <SplitButton />
        {/* @ts-expect-error - expects menuItems */}
        <SplitButton label="label" />
        {/* @ts-expect-error - expects label */}
        <SplitButton menuItems={getMenuItems()} />
      </>;
    });

    test.skip('Accepts string as `as` prop', () => {
      <SplitButton as="p" label="label" menuItems={getMenuItems()} />;
    });

    test.skip('Accepts component as `as` prop', () => {
      const As = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );
      render(
        <SplitButton
          data-testid="split-button"
          as={As}
          label="label"
          menuItems={getMenuItems()}
        />,
      );
    });

    test.skip('types', () => {
      const AnchorLikeWrapper = (props: JSX.IntrinsicElements['a']) => {
        return <a {...props}>content</a>;
      };

      <>
        <SplitButton href="allowed" label="label" menuItems={getMenuItems()} />
        <SplitButton
          as="a"
          href="allowed"
          label="label"
          menuItems={getMenuItems()}
        />
        <SplitButton
          as="div"
          // @ts-expect-error - href not allowed when as is div
          href="string"
          label="label"
          menuItems={getMenuItems()}
        />
        <SplitButton
          as={AnchorLikeWrapper}
          href="string"
          label="label"
          menuItems={getMenuItems()}
        />
      </>;
    });
  });
});
