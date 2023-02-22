import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuItem } from '.';

describe('packages/menu/menu-item', () => {
  describe('it returns the correct type of component', () => {
    test('button by default', () => {
      const utils = render(
        <MenuItem data-testid="menu-item">Example 1</MenuItem>,
      );
      expect(utils.getByRole('menuitem').tagName.toLowerCase()).toBe('button');
    });

    test('anchor when href is supplied', () => {
      const { getByTestId } = render(
        <MenuItem data-testid="menu-item" href="string">
          Example 2
        </MenuItem>,
      );
      const menuItem = getByTestId('menu-item');

      expect(menuItem.tagName.toLowerCase()).toBe('a');
    });

    test('div when "as" is supplied', () => {
      const { getByTestId } = render(
        <MenuItem data-testid="menu-item" as="div">
          Test Content
        </MenuItem>,
      );
      const menuItem = getByTestId('menu-item');

      expect(menuItem.tagName.toLowerCase()).toBe('div');
    });

    test('fires onClick callback when clicked', () => {
      const clickHandler = jest.fn();

      const { getByTestId } = render(
        <MenuItem data-testid="menu-item" onClick={clickHandler} />,
      );
      const menuItem = getByTestId('menu-item');
      userEvent.click(menuItem);
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    test(`renders className in the MenuItem container's classList`, () => {
      const { getByTestId } = render(
        <MenuItem data-testid="menu-item" className="menu-item-class-name" />,
      );
      const menuItem = getByTestId('menu-item');
      expect(menuItem.classList.contains('menu-item-class-name')).toBe(true);
    });

    test('renders with correct target and rel values when set', () => {
      const { getByTestId } = render(
        <MenuItem
          as="a"
          href="https://mongodb.design"
          target="_blank"
          rel="help"
          data-testid="menu-item"
        />,
      );
      const menuItem = getByTestId('menu-item');

      expect((menuItem as HTMLAnchorElement).target).toBe('_blank');
      expect((menuItem as HTMLAnchorElement).rel).toBe('help');
    });

    test('has the `aria-current` attribute when active', () => {
      const { getByTestId } = render(
        <MenuItem data-testid="menu-item" active={true} />,
      );
      const menuItem = getByTestId('menu-item');
      expect(menuItem).toHaveAttribute('aria-current', 'true');
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  describe('types behave as expected', () => {
    test.skip('Accepts string as `as` prop', () => {
      <MenuItem as="p" />;
    });

    test.skip('Accepts component as `as` prop', () => {
      const As = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );
      render(<MenuItem data-testid="menu-item" as={As} />);
    });

    test.skip('types', () => {
      const AnchorLikeWrapper = (props: JSX.IntrinsicElements['a']) => {
        return <a {...props}>content</a>;
      };

      const ButtonWrapper = (props: JSX.IntrinsicElements['button']) => {
        return <button {...props} />;
      };

      <>
        <MenuItem href="allowed">Children</MenuItem>
        <MenuItem as="a" href="allowed">
          Children
        </MenuItem>
        {/* @ts-expect-error - href not allowed when as is div*/}
        <MenuItem as="div" href="string">
          Children
        </MenuItem>
        {/* @ts-expect-error - href not allowed on ButtonWrapper */}
        <MenuItem as={ButtonWrapper} href="string">
          Children
        </MenuItem>
        <MenuItem as={AnchorLikeWrapper} href="string">
          Children
        </MenuItem>
      </>;
    });
  });
});
