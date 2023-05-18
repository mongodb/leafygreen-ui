import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MenuItem } from '@leafygreen-ui/menu';

import { SplitButton } from '.';

const menuTestId = 'lg-split-button-menu';

const getMenuItems = () => {
  return (
    <>
      <MenuItem description="I am a description" disabled>
        Disabled Menu Item
      </MenuItem>
      <MenuItem description="I am also a description">
        Menu Item With Description
      </MenuItem>
    </>
  );
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

  describe('wrapper container', () => {
    test('renders correct className', () => {
      const { wrapper } = renderSplitButton({
        className: 'split-button-class',
      });

      expect(wrapper.classList.contains('split-button-class')).toBe(true);
    });
  });

  describe('primary button', () => {
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

  describe('menu', () => {
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
      expect(menu.childElementCount).toEqual(2);
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  describe('types behave as expected', () => {
    test.skip('Accepts base props', () => {
      <>
        <SplitButton label="label" menuItems={getMenuItems()} />
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

      const ButtonWrapper = (props: JSX.IntrinsicElements['button']) => {
        return <button {...props} />;
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
        {/* @ts-expect-error - href not allowed on ButtonWrapper */}
        <SplitButton
          as={ButtonWrapper}
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
