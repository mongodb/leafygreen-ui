import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { SideNavItemProps } from './SideNavItem.types';
import { SideNavItem } from '.';

type renderedElement = HTMLElement | null;

interface RenderedElements {
  navEl?: renderedElement;
  groupEl?: renderedElement;
  headerContentEl?: renderedElement;
  defaultHeaderEl?: renderedElement;
  itemEl?: renderedElement;
  childEl?: renderedElement;
}

describe('packages/side-nav', () => {
  const testIds = {
    sideNav: 'side-nav',
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

  describe('SideNavItem', () => {
    function renderSideNavItem(props: SideNavItemProps = {}) {
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

    describe('when rendered with a custom class name', () => {
      beforeEach(() => {
        renderSideNavItem({ className });
      });

      test('it renders the item as a button', () => {
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.itemEl?.tagName).toEqual('BUTTON');
      });

      test('it renders with the provided class name', () => {
        expect(renderedEls.itemEl).toHaveClass(className);
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

    describe('when rendered with SideNavItems as children', () => {
      test('it renders nested SideNavItems when immediate parent is active', () => {
        render(
          <SideNavItem active>
            Ancestor
            <SideNavItem>Child 1</SideNavItem>
          </SideNavItem>,
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
      });

      test('it only renders nested SideNavItems when direct ancestor is active', () => {
        render(
          <SideNavItem active>
            Ancestor
            <SideNavItem>
              Child 1<SideNavItem>Child 2</SideNavItem>
            </SideNavItem>
          </SideNavItem>,
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.queryByText('Child 2')).not.toBeInTheDocument();
      });

      test('it does not render nested SideNavItems when parent is not active', () => {
        render(
          <SideNavItem>
            Ancestor
            <SideNavItem>Child 1</SideNavItem>
          </SideNavItem>,
        );

        expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
      });
    });

    describe('when rendered as a custom component', () => {
      beforeEach(() => {
        interface ImageFigureProps {
          imageUrl: string;
          imageAlt: string;
          caption: string;
        }

        function ImageFigure({
          imageUrl,
          imageAlt,
          caption,
          ...rest
        }: ImageFigureProps) {
          return (
            <figure {...rest}>
              <img src={imageUrl} alt={imageAlt} />
              <figcaption>{caption}</figcaption>
            </figure>
          );
        }

        const { sideNavItem } = testIds;
        const props = {
          as: ImageFigure,
          imageUrl: '/dogeSelfPortrait',
          imageAlt: 'such wow',
          caption: 'such art',
        };

        const { getByTestId } = render(
          <SideNavItem data-testid={sideNavItem} {...props} />,
        );

        renderedEls.itemEl = getByTestId(sideNavItem);
      });

      test('it renders as the custom component', () => {
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.itemEl?.tagName).toEqual('FIGURE');

        const imgEl = renderedEls.itemEl?.querySelector('img');
        expect(imgEl).toBeInTheDocument();
        expect(imgEl).toHaveAttribute('src', '/dogeSelfPortrait');
        expect(imgEl).toHaveAttribute('alt', 'such wow');

        const figcaptionEl = renderedEls.itemEl?.querySelector('figcaption');
        expect(figcaptionEl).toBeInTheDocument();
        expect(figcaptionEl).toHaveTextContent('such art');
      });
    });
  });
});
