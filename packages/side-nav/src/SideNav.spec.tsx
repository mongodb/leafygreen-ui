import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { MenuItemProps } from '@leafygreen-ui/menu';
import { SideNav, SideNavGroup, SideNavItem } from './index';

type renderedElement = HTMLElement | null;

interface RenderedElements {
  navEl?: renderedElement;
  groupEl?: renderedElement;
  headerEl?: renderedElement;
  itemEl?: renderedElement;
  childEl?: renderedElement;
}

describe('packages/side-nav', () => {
  const className = 'test-class-name';
  const headerText = 'test-header-text';
  const headerClassName = 'test-header-class-name';
  const testIds = {
    sideNav: 'side-nav',
    sideNavGroup: 'side-nav-group',
    sideNavItem: 'side-nav-item',
    sideNavLink: 'side-nav-link',
  };

  let renderedEls: RenderedElements = {};

  afterEach(() => {
    document.body.innerHTML = '';
    renderedEls = {};
    cleanup();
  });

  describe('Side Nav Item', () => {
    function renderSideNavItem(props: MenuItemProps = {}) {
      const { sideNavItem, sideNavLink } = testIds;
      const { children, ...rest } = props;
      const { getByTestId, queryByTestId } = render(
        <SideNavItem data-testid={sideNavItem} {...rest}>
          {children}
        </SideNavItem>,
      );

      renderedEls.itemEl = getByTestId(sideNavItem);
      renderedEls.childEl = queryByTestId(sideNavLink);
    }

    describe('when rendered with custom classes', () => {
      beforeEach(() => {
        renderSideNavItem();
      });

      test('it renders a menu item', () => {
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.itemEl?.tagName).toEqual('BUTTON');
        expect(renderedEls.itemEl).toHaveAttribute(
          'data-leafygreen-ui',
          'menu-item-container',
        );
      });

      test('it strips the expected menu item role from the parent', () => {
        expect(renderedEls.itemEl?.parentNode).toHaveAttribute('role', 'none');
      });
    });

    describe('when rendered as active', () => {
      beforeEach(() => {
        renderSideNavItem({ active: true });
      });

      test('it sets the aria attribute for the active item', () => {
        expect(renderedEls.itemEl).toHaveAttribute('aria-current', 'page');
      });
    });

    describe('when rendered as disabled', () => {
      beforeEach(() => {
        renderSideNavItem({ disabled: true });
      });

      test('it sets the aria attribute for the disabled item', () => {
        expect(renderedEls.itemEl).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('when rendered as a link', () => {
      beforeEach(() => {
        renderSideNavItem({ href: '/v2#' });
      });

      test('it renders as an link menu item', () => {
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.itemEl?.tagName).toEqual('A');
        expect(renderedEls.itemEl).toHaveAttribute('href', '/v2#');
      });
    });

    describe('when rendered with children', () => {
      beforeEach(() => {
        const { sideNavLink } = testIds;
        const children = (
          <a href="#clusters" data-testid={sideNavLink}>
            Clusters
          </a>
        );

        renderSideNavItem({ children });
      });

      test('it renders the children', () => {
        expect(renderedEls.childEl).toBeInTheDocument();
        expect(renderedEls.childEl?.tagName).toEqual('A');
        expect(renderedEls.childEl).toHaveAttribute('href', '#clusters');
      });
    });
  });

  describe('Side Nav Group', () => {
    describe('when the group includes a header', () => {
      beforeEach(() => {
        const { sideNavGroup, sideNavLink } = testIds;
        const { getByTestId, getByText } = render(
          <SideNavGroup
            className={className}
            headerText={headerText}
            headerClassName={headerClassName}
            data-testid={sideNavGroup}
          >
            <SideNavItem>
              <a href="#clusters" data-testid={sideNavLink}>
                Clusters
              </a>
            </SideNavItem>
          </SideNavGroup>,
        );

        renderedEls.groupEl = getByTestId(sideNavGroup);
        renderedEls.headerEl = getByText(headerText);
        renderedEls.childEl = getByTestId(sideNavLink);
      });

      test('renders the side nav group with a header', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.headerEl).toBeInTheDocument();
      });

      test('it assigns the header the correct role', () => {
        expect(renderedEls.headerEl).toHaveAttribute('role', 'heading');
      });

      test('renders the children of the side nav group', () => {
        expect(renderedEls.childEl).toBeInTheDocument();
      });

      test("includes the side nav group's custom class name", () => {
        expect(renderedEls.groupEl).toHaveClass(className);
      });

      test("includes the header 's custom class name", () => {
        expect(renderedEls.headerEl).toHaveClass(headerClassName);
      });
    });

    describe('when the group does not include a header', () => {
      beforeEach(() => {
        const { sideNavGroup } = testIds;
        const { getByTestId, queryByText } = render(
          <SideNavGroup className={className} data-testid={sideNavGroup}>
            <SideNavItem>
              <a href="#clusters">Clusters</a>
            </SideNavItem>
          </SideNavGroup>,
        );

        renderedEls.groupEl = getByTestId(sideNavGroup);
        renderedEls.headerEl = queryByText(headerText);
      });

      test('renders the side nav group without a header', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.headerEl).toBeNull();
      });
    });
  });

  describe('Side Nav', () => {
    describe('when rendered to the dom', () => {
      beforeEach(() => {
        const { sideNav, sideNavGroup, sideNavItem, sideNavLink } = testIds;
        const { getByTestId } = render(
          <SideNav className={className} data-testid={sideNav}>
            <SideNavGroup data-testid={sideNavGroup}>
              <SideNavItem data-testid={sideNavItem}>
                <a href="#clusters" data-testid={sideNavLink}>
                  Clusters
                </a>
              </SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        renderedEls.navEl = getByTestId(sideNav);
        renderedEls.groupEl = getByTestId(sideNavGroup);
        renderedEls.itemEl = getByTestId(sideNavItem);
        renderedEls.childEl = getByTestId(sideNavLink);
      });

      test('renders the side nav to the dom', () => {
        expect(renderedEls.navEl).toBeInTheDocument();
      });

      test('it provides an aria label for the nav', () => {
        expect(renderedEls.navEl).toHaveAttribute('aria-label', 'side-nav');
      });

      test('renders the children of the side nav', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.childEl).toBeInTheDocument();
      });

      test("includes the side nav's custom class name", () => {
        expect(renderedEls.navEl).toHaveClass(className);
      });
    });
  });
});
