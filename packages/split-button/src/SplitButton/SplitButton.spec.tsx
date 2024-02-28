import React from 'react';
import {
  fireEvent,
  getAllByRole as globalGetAllByRole,
  render,
  waitForElementToBeRemoved,
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
  const utils = render(
    <SplitButton data-testid="split-button" {...defaultProps} {...props} />,
  );
  const wrapper = utils.container.firstChild as HTMLElement;
  const primaryButton = utils.getByTestId('split-button');
  const menuTrigger = primaryButton.nextSibling as HTMLElement;
  return {
    ...utils,
    primaryButton,
    menuTrigger,
    wrapper,
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
        const { getByTestId, menuTrigger } = renderSplitButton({});
        userEvent.click(menuTrigger);
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(menu).not.toBeInTheDocument();
      });
      test('Returns focus to trigger {usePortal: true}', async () => {
        const { getByTestId, menuTrigger } = renderSplitButton({
          usePortal: true,
        });
        userEvent.click(menuTrigger);
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(menuTrigger).toHaveFocus();
      });

      test('Returns focus to trigger {usePortal: false}', async () => {
        const { getByTestId, menuTrigger } = renderSplitButton({
          usePortal: false,
        });
        userEvent.click(menuTrigger);
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(menuTrigger).toHaveFocus();
      });
    });

    type SelectionKeys = 'enter' | 'space';
    const selectionKeys: Array<Array<SelectionKeys>> = [['enter'], ['space']];

    describe.each(selectionKeys)('%s key', key => {
      const onClick = jest.fn();
      let menu: HTMLElement;
      let options: Array<HTMLElement>;
      let menuTrigger: HTMLElement;

      beforeEach(() => {
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
        const { getByTestId, menuTrigger: menuTriggerEl } = renderSplitButton({
          menuItems,
        });
        userEvent.click(menuTriggerEl);
        menu = getByTestId(menuTestId);
        options = globalGetAllByRole(menu, 'menuitem');
        menuTrigger = menuTriggerEl;
      });

      test('Fires the click handler of the highlighted item', () => {
        expect(options[0]).toHaveFocus();

        userEvent.type(options[0], `{${key}}`);
        expect(onClick).toHaveBeenCalled();
      });

      /* eslint-disable jest/no-disabled-tests */
      test.skip('Closes the menu', async () => {
        // Works correctly in the browser
        // https://github.com/testing-library/react-testing-library/issues/269#issuecomment-1453666401 - this needs v13 of testing-library
        // TODO: This is not triggered so the test fails
        userEvent.type(options[0], `{${key}}`);
        expect(menuTrigger).toHaveFocus();

        await waitForElementToBeRemoved(menu);
      });
    });

    describe('Arrow keys', () => {
      let menu: HTMLElement;
      let options: Array<HTMLElement>;

      beforeEach(() => {
        const { getByTestId, menuTrigger } = renderSplitButton();
        userEvent.click(menuTrigger);
        menu = getByTestId(menuTestId);
        options = globalGetAllByRole(menu, 'menuitem');
      });

      describe('Down arrow', () => {
        test('highlights the next option in the menu', () => {
          userEvent.type(menu, '{arrowdown}');
          // options[1] is disabled
          expect(options[2]).toHaveFocus();
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
          // options[1] is disabled
          options[2].focus();
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
        {/* @ts-expect-error - href not allowed when as is div*/}
        <SplitButton
          as="div"
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
