import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { waitForTransition } from '@leafygreen-ui/testing-lib';

import { LGIDs } from '../constants';
import { MenuItem, SubMenu, SubMenuProps } from '..';

const subMenuTestId = 'sub-menu-1-id';
const menuItem1Id = 'menu-item-1-id';
const menuItem2Id = 'menu-item-2-id';

const renderSubMenu = (props: Partial<SubMenuProps> = {}) => {
  const utils = render(
    <SubMenu data-testid={subMenuTestId} {...(props as any)}>
      <MenuItem data-testid={menuItem1Id}>Text Content A</MenuItem>
      <MenuItem data-testid={menuItem2Id}>Text Content A</MenuItem>
    </SubMenu>,
  );

  return utils;
};

describe('packages/sub-menu', () => {
  describe('Rendering', () => {
    test('renders a SubMenu ', () => {
      const { getByTestId } = renderSubMenu();
      const subMenu = getByTestId(subMenuTestId);
      expect(subMenu).toBeInTheDocument();
    });

    test('submenu toggle button is not a child of the submenu button', () => {
      const { getByTestId } = renderSubMenu();
      const subMenu = getByTestId(subMenuTestId);
      const toggle = getByTestId(LGIDs.submenuToggle);
      expect(subMenu.contains(toggle)).toBe(false);
    });

    test('renders a SubMenu open by default, when the SubMenu is active', () => {
      const { getByTestId } = renderSubMenu({ active: true });
      const subMenu = getByTestId(subMenuTestId);
      expect(subMenu).toBeInTheDocument();
      const menuItem = getByTestId(menuItem1Id);
      expect(menuItem).toBeInTheDocument();
    });

    test('renders a SubMenu open by default, when the initialOpen is true', () => {
      const { getByTestId } = renderSubMenu({ initialOpen: true });
      const subMenu = getByTestId(subMenuTestId);
      expect(subMenu).toBeInTheDocument();
      const menuItem = getByTestId(menuItem1Id);
      expect(menuItem).toBeInTheDocument();
    });

    test('renders as a button by default', async () => {
      const { getByTestId } = renderSubMenu();
      const subMenu = getByTestId(subMenuTestId);
      expect(subMenu.tagName.toLowerCase()).toBe('button');
    });

    test('renders inside an anchor tag when the href prop is set', async () => {
      const { getByTestId } = renderSubMenu({ href: 'mongo' });
      const subMenu = getByTestId(subMenuTestId);
      expect(subMenu.tagName.toLowerCase()).toBe('a');
    });

    test('renders as `div` tag when the "as" prop is set', async () => {
      const { getByTestId } = renderSubMenu({ as: 'div' });
      const subMenu = getByTestId(subMenuTestId);
      expect(subMenu.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('Interaction', () => {
    describe('Mouse', () => {
      test('clicking the submenu opens it', async () => {
        const { getByTestId, queryByTestId } = renderSubMenu();
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);

        await waitFor(() => {
          expect(queryByTestId(menuItem1Id)).toBeInTheDocument();
        });
      });

      test('clicking an open submenu closes it', async () => {
        const { getByTestId, queryByTestId } = renderSubMenu({
          initialOpen: true,
        });
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);

        await waitFor(() => {
          expect(queryByTestId(menuItem1Id)).not.toBeInTheDocument();
        });
      });

      test('clicking the submenu DOES NOT open it is disabled', async () => {
        const { getByTestId, queryByTestId } = renderSubMenu({
          disabled: true,
        });
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);
        await waitFor(() => {
          expect(queryByTestId(menuItem1Id)).not.toBeInTheDocument();
        });
      });

      test('clicking the submenu DOES NOT open it if a click handler is provided', async () => {
        const onClick = jest.fn();
        const { getByTestId, queryByTestId } = renderSubMenu({ onClick });
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);
        await waitFor(() => {
          expect(queryByTestId(menuItem1Id)).not.toBeInTheDocument();
        });
      });

      test('onClick is fired', async () => {
        const onClick = jest.fn();
        const { getByTestId } = renderSubMenu({ onClick });
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);
        expect(onClick).toHaveBeenCalled();
      });

      test('onClick is NOT fired when disabled', async () => {
        const onClick = jest.fn();
        const { getByTestId } = renderSubMenu({ onClick, disabled: true });
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);
        expect(onClick).not.toHaveBeenCalled();
      });

      test('onClick is fired if an href is provided', async () => {
        const onClick = jest.fn();
        const { getByTestId } = renderSubMenu({
          onClick,
          href: 'mongodb.design',
        });
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);
        expect(onClick).toHaveBeenCalled();
      });

      test('clicking the submenu toggle button opens it', async () => {
        const { getByTestId, queryByTestId } = renderSubMenu();
        const toggle = getByTestId(LGIDs.submenuToggle);
        userEvent.click(toggle);

        await waitFor(() => {
          expect(queryByTestId(menuItem1Id)).toBeInTheDocument();
        });
      });

      test('clicking the submenu toggle button closes an open menu', async () => {
        const { getByTestId, queryByTestId } = renderSubMenu({
          initialOpen: true,
        });
        const toggle = getByTestId(LGIDs.submenuToggle);
        userEvent.click(toggle);

        await waitFor(() => {
          expect(queryByTestId(menuItem1Id)).not.toBeInTheDocument();
        });
      });

      test('transition handlers are fired', async () => {
        const onEntered = jest.fn();
        const onExited = jest.fn();
        const { getByTestId } = renderSubMenu({
          onEntered,
          onExited,
        });
        const subMenu = getByTestId(subMenuTestId);
        userEvent.click(subMenu);
        await waitForTransition();

        await waitFor(() => {
          expect(onEntered).toHaveBeenCalled();
        });

        userEvent.click(subMenu);
        await waitForTransition();

        await waitFor(() => {
          expect(onExited).toHaveBeenCalled();
        });
      });
    });

    describe('Keyboard', () => {
      describe('Arrow Keys', () => {
        test('right arrow key opens the menu', async () => {
          const { getByTestId, queryByTestId } = renderSubMenu();
          const subMenu = getByTestId(subMenuTestId);
          userEvent.type(subMenu, '{arrowright}');
          await waitFor(() => {
            expect(queryByTestId(menuItem1Id)).toBeInTheDocument();
          });
        });

        test('left arrow key closes the menu', async () => {
          const { getByTestId, queryByTestId } = renderSubMenu({
            initialOpen: true,
          });
          const subMenu = getByTestId(subMenuTestId);
          userEvent.type(subMenu, '{arrowleft}');
          await waitFor(() => {
            expect(queryByTestId(menuItem1Id)).not.toBeInTheDocument();
          });
        });
      });
    });
  });

  // // This should be tested in Menu
  // eslint-disable-next-line jest/no-commented-out-tests
  // test.skip('when a SubMenu is clicked, it opens and closes the previously opened SubMenu', async () => {
  //   const { queryByTestId } = renderSubMenu();
  //   // TODO: Fix redundant rendering in `Menu`. The submenu is closed on initial render, but opens on second render
  //   // https://jira.mongodb.org/browse/LG-2904
  //   waitFor(async () => {
  //     const subMenuItem = queryByTestId(menuItem1Id);
  //     expect(subMenuItem).not.toBeNull();
  //     expect(subMenuItem).toBeInTheDocument();
  //     const subMenu2 = queryByTestId(subMenu2Id);
  //     userEvent.click(subMenu2 as HTMLElement);
  //     await waitForElementToBeRemoved(subMenuItem);
  //     const subMenuItem2 = queryByTestId(menuItem2Id);
  //     expect(subMenuItem2).not.toBeNull();
  //     expect(subMenuItem2).toBeInTheDocument();
  //   });
  // });

  /* eslint-disable jest/no-disabled-tests, jest/expect-expect */
  describe.skip('Types behave as expected', () => {
    test('Accepts string as `as` prop', () => {
      <SubMenu data-testid="sub-menu-a" as="p" />;
    });
    test('Accepts component as `as` prop', () => {
      const As = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );
      render(<SubMenu as={As}>Test</SubMenu>);
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
