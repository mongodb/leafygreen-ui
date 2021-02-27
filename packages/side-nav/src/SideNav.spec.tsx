import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SideNav, SideNavGroup, SideNavItem } from '.';

type renderedElement = HTMLElement | null;

interface RenderedElements {
  containerEl?: renderedElement;
  navEl?: renderedElement;
  groupEl?: renderedElement;
  headerContentEl?: renderedElement;
  defaultHeaderEl?: renderedElement;
  itemEl?: renderedElement;
  childEl?: renderedElement;
}

describe('packages/side-nav', () => {
  const testIds = {
    sideNavContainer: 'side-nav-container',
    sideNavGroup: 'side-nav-group',
    sideNavHeader: 'side-nav-header',
    sideNavItem: 'side-nav-item',
    sideNavLink: 'side-nav-link',
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
        const { sideNavGroup, sideNavItem, sideNavLink, sideNavContainer } = testIds;
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

        renderedEls.containerEl = getByTestId(sideNavContainer)
        renderedEls.navEl = getByRole('navigation');
        renderedEls.groupEl = getByTestId(sideNavGroup);
        renderedEls.itemEl = getByTestId(sideNavItem);
        renderedEls.childEl = getByTestId(sideNavLink);
      });

      test('renders the side nav to the dom', () => {
        expect(renderedEls.navEl).toBeInTheDocument();
      });

      test('renders the children of the side nav', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.childEl).toBeInTheDocument();
      });

      test('it renders with the provided className', () => {
        expect(renderedEls.containerEl).toHaveClass(className);
      });
    });
  });
});
