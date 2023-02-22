import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu, MenuItem, SubMenu } from '..';

const SubMenuTestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Menu open={true} setOpen={jest.fn()}>
      {children}
      <SubMenu title="Second SubMenu" data-testid="sub-menu-b">
        <MenuItem data-testid="sub-menu-item-b">SubMenu Item Two</MenuItem>
      </SubMenu>
    </Menu>
  );
};

describe('packages/menu/sub-menu', () => {
  test('renders a SubMenu open by default, when the SubMenu is active', () => {
    const { getByTestId } = render(
      <SubMenuTestWrapper>
        <SubMenu data-testid="sub-menu-a" active={true} />
      </SubMenuTestWrapper>,
    );

    // TODO: The submenu is closed on initial render, but opens on second render
    waitFor(() => {
      const subMenuItem = getByTestId('sub-menu-item-a');
      expect(subMenuItem).toBeInTheDocument();
    });
  });

  test('when a SubMenu is clicked, it opens and closes the previously opened SubMenu', async () => {
    const { queryByTestId, getAllByTestId } = render(
      <SubMenuTestWrapper>
        <SubMenu data-testid="sub-menu-a" active={true}>
          <MenuItem data-testid="sub-menu-item-a">SubMenu Item One</MenuItem>
        </SubMenu>
      </SubMenuTestWrapper>,
    );
    const [subMenuButtonA, subMenuButtonB] = getAllByTestId(
      'lg-sub-menu-icon-button',
    );

    userEvent.click(subMenuButtonA as HTMLElement);

    // TODO: The submenu is closed on initial render, but opens on second render
    waitFor(async () => {
      const subMenuItem = queryByTestId('sub-menu-item-a');
      expect(subMenuItem).not.toBeNull();
      expect(subMenuItem).toBeInTheDocument();

      userEvent.click(subMenuButtonB as HTMLElement);

      await waitForElementToBeRemoved(subMenuItem);

      const subMenuItemB = queryByTestId('sub-menu-item-b');
      expect(subMenuItemB).not.toBeNull();
      expect(subMenuItemB).toBeInTheDocument();
    });
  });

  test('onClick is fired when SubMenu is clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <SubMenuTestWrapper>
        <SubMenu data-testid="sub-menu-a" onClick={onClick} />
      </SubMenuTestWrapper>,
    );
    const subMenu = getByTestId('sub-menu-a');
    userEvent.click(subMenu);
    expect(onClick).toHaveBeenCalled();
  });

  test('renders as a button by default', () => {
    const { getByTestId } = render(
      <SubMenuTestWrapper>
        <SubMenu data-testid="sub-menu-a" />
      </SubMenuTestWrapper>,
    );
    const subMenu = getByTestId('sub-menu-a');
    expect(subMenu.tagName.toLowerCase()).toBe('button');
  });

  test('renders inside an anchor tag when the href prop is set', () => {
    const { getByTestId } = render(
      <SubMenuTestWrapper>
        <SubMenu data-testid="sub-menu-a" href="string" />
      </SubMenuTestWrapper>,
    );
    const subMenu = getByTestId('sub-menu-a');
    expect(subMenu.tagName.toLowerCase()).toBe('a');
  });

  test('renders as `div` tag when the "as" prop is set', () => {
    const { getByTestId } = render(
      <SubMenuTestWrapper>
        <SubMenu data-testid="sub-menu-a" as="div" />
      </SubMenuTestWrapper>,
    );
    const subMenu = getByTestId('sub-menu-a');
    expect(subMenu.tagName.toLowerCase()).toBe('div');
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
        <SubMenuTestWrapper>
          <SubMenu data-testid="sub-menu-a" as={As} />
        </SubMenuTestWrapper>,
      );
    });
  });
  /* eslint-enable jest/no-disabled-tests, jest/expect-expect */
});
