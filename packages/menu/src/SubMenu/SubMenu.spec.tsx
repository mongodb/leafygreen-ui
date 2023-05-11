import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu, MenuItem, SubMenu } from '..';

const subMenu1Id = 'sub-menu-1-id';
const subMenu2Id = 'sub-menu-2-id';
const subMenu3Id = 'sub-menu-3-id';
const menuItem1Id = 'menu-item-1-id';
const menuItem2Id = 'menu-item-2-id';
const onClick = jest.fn();

const renderSubMenu = () => {
  const utils = render(
    <Menu>
      <SubMenu active onClick={onClick} data-testid={subMenu1Id}>
        <MenuItem data-testid={menuItem1Id}>Text Content A</MenuItem>
      </SubMenu>
      <SubMenu data-testid={subMenu2Id} href="mongodb.design">
        <MenuItem data-testid={menuItem2Id}> Text Content B</MenuItem>
      </SubMenu>
      <SubMenu data-testid={subMenu3Id} as="div"></SubMenu>
    </Menu>,
  );

  return utils;
};

describe('packages/sub-menu', () => {
  test('renders a SubMenu open by default, when the SubMenu is active', () => {
    const { getByTestId } = renderSubMenu();

    // TODO: Fix redundant rendering in `Menu`. The submenu is closed on initial render, but opens on second render
    // https://jira.mongodb.org/browse/LG-2904
    waitFor(() => {
      const subMenu = getByTestId(subMenu1Id);
      expect(subMenu).toBeInTheDocument();
      const menuItem = getByTestId(menuItem1Id);
      expect(menuItem).toBeInTheDocument();
    });
  });

  test('when a SubMenu is clicked, it opens and closes the previously opened SubMenu', async () => {
    const { queryByTestId } = renderSubMenu();

    // TODO: Fix redundant rendering in `Menu`. The submenu is closed on initial render, but opens on second render
    // https://jira.mongodb.org/browse/LG-2904
    waitFor(async () => {
      const subMenuItem = queryByTestId(menuItem1Id);
      expect(subMenuItem).not.toBeNull();
      expect(subMenuItem).toBeInTheDocument();

      const subMenu2 = queryByTestId(subMenu2Id);
      userEvent.click(subMenu2 as HTMLElement);

      await waitForElementToBeRemoved(subMenuItem);

      const subMenuItem2 = queryByTestId(menuItem2Id);
      expect(subMenuItem2).not.toBeNull();
      expect(subMenuItem2).toBeInTheDocument();
    });
  });

  test('onClick is fired when SubMenu is clicked', async () => {
    const { getByTestId } = renderSubMenu();

    // TODO: Fix redundant rendering in `Menu`. The submenu is closed on initial render, but opens on second render
    // https://jira.mongodb.org/browse/LG-2904
    waitFor(() => {
      const subMenu = getByTestId(subMenu1Id);
      userEvent.click(subMenu);
      expect(onClick).toHaveBeenCalled();
    });
  });

  test('renders as a button by default', async () => {
    const { getByTestId } = renderSubMenu();

    // TODO: Fix redundant rendering in `Menu`. The submenu is closed on initial render, but opens on second render
    // https://jira.mongodb.org/browse/LG-2904
    waitFor(() => {
      const subMenu = getByTestId(subMenu1Id);
      expect(subMenu.tagName.toLowerCase()).toBe('button');
    });
  });

  test('renders inside an anchor tag when the href prop is set', async () => {
    const { getByTestId } = renderSubMenu();

    // TODO: Fix redundant rendering in `Menu`. The submenu is closed on initial render, but opens on second render
    // https://jira.mongodb.org/browse/LG-2904
    waitFor(() => {
      const subMenu = getByTestId(subMenu2Id);
      expect(subMenu.tagName.toLowerCase()).toBe('a');
    });
  });

  test('renders as `div` tag when the "as" prop is set', async () => {
    const { getByTestId } = renderSubMenu();

    // TODO: Fix redundant rendering in `Menu`. The submenu is closed on initial render, but opens on second render
    // https://jira.mongodb.org/browse/LG-2904
    waitFor(() => {
      const subMenu = getByTestId(subMenu3Id);
      expect(subMenu.tagName.toLowerCase()).toBe('div');
    });
  });

  /* eslint-disable jest/no-disabled-tests, jest/expect-expect */
  describe.skip('Types behave as expected', () => {
    test('Accepts string as `as` prop', () => {
      <SubMenu data-testid="sub-menu-a" as="p" />;
    });

    test('Accepts component as `as` prop', () => {
      const As = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );

      render(
        <Menu>
          <SubMenu as={As}>Test</SubMenu>
        </Menu>,
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
        <SubMenu href="allowed">Children</SubMenu>
        <SubMenu as="a" href="allowed">
          Children
        </SubMenu>
        {/* @ts-expect-error - href not allowed when as is div*/}
        <SubMenu as="div" href="string">
          Children
        </SubMenu>
        {/* @ts-expect-error - href not allowed on ButtonWrapper */}
        <SubMenu as={ButtonWrapper} href="string">
          Children
        </SubMenu>
        <SubMenu as={AnchorLikeWrapper} href="string">
          Children
        </SubMenu>
      </>;
    });
  });
  /* eslint-enable jest/no-disabled-tests, jest/expect-expect */
});
