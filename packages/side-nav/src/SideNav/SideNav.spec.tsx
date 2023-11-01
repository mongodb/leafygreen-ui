import React, { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { SideNav, SideNavGroup, SideNavItem } from '..';

type renderedElement = HTMLElement | null;

interface RenderedElements {
  containerEl?: renderedElement;
  navEl?: renderedElement;
  groupEl?: renderedElement;
  headerContentEl?: renderedElement;
  defaultHeaderEl?: renderedElement;
  itemEl?: renderedElement;
  childEl?: renderedElement;
  collapseToggle?: renderedElement;
}

describe('packages/side-nav', () => {
  const testIds = {
    sideNavContainer: 'side-nav-container',
    sideNavGroup: 'side-nav-group',
    sideNavHeader: 'side-nav-header',
    sideNavItem: 'side-nav-item',
    sideNavLink: 'side-nav-link',
    collapseToggle: 'side-nav-collapse-toggle',
  };

  const className = 'test-class-name';

  let renderedEls: RenderedElements = {};

  afterEach(() => {
    document.body.innerHTML = '';
    renderedEls = {};
    cleanup();
  });

  describe('SideNav', () => {
    describe('when rendered to the dom', () => {
      beforeEach(() => {
        const {
          sideNavGroup,
          sideNavItem,
          sideNavLink,
          sideNavContainer,
          collapseToggle,
        } = testIds;
        const { getByTestId, getByRole } = render(
          <SideNav className={className} aria-label="Side Navigation">
            <SideNavGroup data-testid={sideNavGroup}>
              <SideNavItem data-testid={sideNavItem}>
                <a href="#clusters" data-testid={sideNavLink}>
                  Clusters
                </a>
              </SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        renderedEls.containerEl = getByTestId(sideNavContainer);
        renderedEls.navEl = getByRole('navigation');
        renderedEls.groupEl = getByTestId(sideNavGroup);
        renderedEls.itemEl = getByTestId(sideNavItem);
        renderedEls.childEl = getByTestId(sideNavLink);
        renderedEls.collapseToggle = getByTestId(collapseToggle);
      });

      test('renders the side nav to the dom', () => {
        expect(renderedEls.navEl).toBeInTheDocument();
      });

      test('renders the children of the side nav', () => {
        const { groupEl, itemEl, childEl } = renderedEls;

        expect(groupEl).toBeInTheDocument();
        expect(itemEl).toBeInTheDocument();
        expect(childEl).toBeInTheDocument();
      });

      test('it renders with the provided className', () => {
        expect(renderedEls.containerEl).toHaveClass(className);
      });

      test('when the collapse toggle is clicked, the navigation is expanded', () => {
        const { collapseToggle } = renderedEls;

        if (collapseToggle == null) {
          // TS was showing that collapseToggle could be null or undefined.
          throw new ReferenceError('collapseToggle is not defined.');
        }

        expect(collapseToggle.getAttribute('aria-expanded')).toEqual('true');

        fireEvent.click(collapseToggle);

        expect(collapseToggle.getAttribute('aria-expanded')).toEqual('false');

        fireEvent.click(collapseToggle);

        expect(collapseToggle.getAttribute('aria-expanded')).toEqual('true');
      });
    });

    describe('it properly handles nested SideNavItem components', () => {
      test('when an active SideNavItem has nested items, they are rendered', () => {
        render(
          <SideNav aria-label="test side nav">
            <SideNavItem active>
              Parent
              <SideNavItem>Child</SideNavItem>
            </SideNavItem>
          </SideNav>,
        );
        expect(screen.getByText('Parent')).toBeInTheDocument();
        expect(screen.getByText('Child')).toBeInTheDocument();
      });

      test('when an inactive SideNavItem has nested items, they are not rendered by default', () => {
        render(
          <SideNav aria-label="test side nav">
            <SideNavItem>
              Parent
              <SideNavItem>Child</SideNavItem>
            </SideNavItem>
          </SideNav>,
        );

        expect(screen.getByText('Parent')).toBeInTheDocument();
        expect(screen.queryByText('Children')).not.toBeInTheDocument();
      });

      test('when a SideNavItem has an active child, it is rendered to the DOM', () => {
        render(
          <SideNav aria-label="test side nav">
            <SideNavItem>
              Parent
              <SideNavItem>
                Child
                <SideNavItem active>Grandchild</SideNavItem>
              </SideNavItem>
            </SideNavItem>
          </SideNav>,
        );

        expect(screen.getByText('Parent')).toBeInTheDocument();
        expect(screen.getByText('Child')).toBeInTheDocument();
        expect(screen.getByText('Grandchild')).toBeInTheDocument();
      });
    });

    describe('when controlled', () => {
      const setCollapsed = jest.fn();
      const collapsed = true;

      beforeEach(() => {
        render(
          <SideNav
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            aria-label="Side Navigation"
          >
            <SideNavGroup>
              <SideNavItem>
                <a href="#clusters">Clusters</a>
              </SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );
      });

      test('renders based on the "collapsed" props when supplied', () => {
        expect(screen.getByText('Clusters')).toBeInTheDocument();
      });

      test('setCollapsed function is called when XX is clicked', () => {
        expect(screen.getByText('Clusters')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('side-nav-collapse-toggle'));
        expect(setCollapsed).toHaveBeenCalled();
        // it is an empty function so side nav should remain visible in the DOM
        expect(screen.getByText('Clusters')).toBeInTheDocument();
      });
    });

    test('accepts a ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<SideNav ref={ref}>Sidenav Content</SideNav>);
      expect(ref.current).toBeDefined();
    });
  });
});
