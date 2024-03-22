import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import Icon from '@leafygreen-ui/icon';

import { SideNavItem } from '../SideNavItem';

import { SideNavGroupProps } from './SideNavGroup.types';
import { SideNavGroup } from './';

describe('packages/side-nav', () => {
  const testIds = {
    sideNav: 'side-nav',
    sideNavGroup: 'side-nav-group',
    sideNavHeader: 'side-nav-header',
    sideNavItem: 'side-nav-item',
    sideNavLink: 'side-nav-link',
    sideNavHeaderLabel: 'side-nav-group-header-label',
    sideNavHeaderIcon: 'side-nav-group-header-icon',
  };

  const className = 'test-class-name';
  const headerText = 'test-header-text';
  const headerContent = (
    <div data-testid={testIds.sideNavHeader}>Header As Content</div>
  );

  afterEach(() => {
    document.body.innerHTML = '';
    cleanup();
  });

  describe('SideNavGroup', () => {
    const renderGroup = ({
      header,
      glyph,
      ...rest
    }: SideNavGroupProps = {}) => {
      const { sideNavGroup, sideNavLink } = testIds;

      render(
        <SideNavGroup
          className={className}
          header={header}
          data-testid={sideNavGroup}
          glyph={glyph}
          {...rest}
        >
          <SideNavItem>
            <a href="#clusters" data-testid={sideNavLink}>
              Clusters
            </a>
          </SideNavItem>
        </SideNavGroup>,
      );
    };

    const { sideNavGroup, sideNavHeader, sideNavLink, sideNavHeaderIcon } =
      testIds;

    describe('when the group is passed a glyph', () => {
      beforeEach(() => {
        renderGroup({ glyph: <Icon glyph="Calendar" /> });
      });

      test('a glyph with the presentation role is rendered', () => {
        expect(screen.getAllByTestId(sideNavHeaderIcon)[0]).toHaveAttribute(
          'role',
          'presentation',
        );
      });
    });

    describe('when the group includes a string header', () => {
      beforeEach(() => {
        renderGroup({ header: headerText });
      });

      test('renders the side nav group with a default header', () => {
        expect(screen.getByTestId(sideNavGroup)).toBeInTheDocument();
        expect(screen.queryByText(headerText)).toBeInTheDocument();
        expect(screen.queryByTestId(sideNavHeader)).toBeNull();
      });

      test('it displays the header text in a header', () => {
        expect(
          screen.getByTestId(testIds.sideNavHeaderLabel).textContent,
        ).toEqual(headerText);
      });

      test('renders the children of the side nav group', () => {
        expect(screen.getByTestId(sideNavLink)).toBeInTheDocument();
      });

      test('it renders with the provided class name', () => {
        expect(screen.getByTestId(sideNavGroup)).toHaveClass(className);
      });
    });

    describe('when the group includes header content', () => {
      beforeEach(() => {
        renderGroup({ header: headerContent });
      });

      test('renders the side nav group with the header content', () => {
        expect(screen.getByTestId(sideNavGroup)).toBeInTheDocument();
        expect(screen.queryByText(headerText)).toBeNull();
        expect(screen.queryByTestId(sideNavHeader)).toBeInTheDocument();
      });
    });

    describe('when the group does not include a header', () => {
      beforeEach(() => {
        renderGroup();
      });

      test('renders the side nav group without a header', () => {
        expect(screen.getByTestId(sideNavGroup)).toBeInTheDocument();
        expect(screen.queryByText(headerText)).toBeNull();
        expect(screen.queryByTestId(sideNavHeader)).toBeNull();
      });
    });

    describe('when `collapsible` is true', () => {
      beforeEach(() => {
        renderGroup({ collapsible: true });
      });

      test('the content is collapsed by default', () => {
        const childContent = screen.queryByTestId(sideNavLink);
        expect(childContent).not.toBeInTheDocument();
      });

      test('the content expands when group label is clicked', () => {
        const hiddenChildContent = screen.queryByTestId(sideNavLink);
        expect(hiddenChildContent).not.toBeInTheDocument();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const childContent = screen.getByTestId(sideNavLink);
        expect(childContent).toBeInTheDocument();
      });
    });

    describe('when `collapsible` is true and `initialCollapsed` is false', () => {
      beforeEach(() => {
        renderGroup({ collapsible: true, initialCollapsed: false });
      });

      test('the content appears on the page by default', () => {
        const childContent = screen.getByTestId(sideNavLink);
        expect(childContent).toBeInTheDocument();
        waitFor(() => {
          expect(childContent).toBeVisible();
        });
      });
    });
  });
});
