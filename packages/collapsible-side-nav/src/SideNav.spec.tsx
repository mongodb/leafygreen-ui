import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import { GlyphVisibility, SideNav, SideNavGroup, SideNavItem } from '.';

describe('packages/collapsible-side-nav', () => {
  describe('SideNav', () => {
    test('renders items and groups', () => {
      const { getByText } = render(
        <SideNav>
          <SideNavItem path="/one">One</SideNavItem>
          <SideNavGroup label="group" glyph={<CloudIcon />}>
            <SideNavItem path="/two">Two</SideNavItem>
          </SideNavGroup>
        </SideNav>,
      );

      expect(getByText('One')).toBeVisible();
      expect(getByText('group')).toBeVisible();
      expect(getByText('Two')).toBeVisible();
    });

    test('item corresponding to current path is current', () => {
      render(
        <SideNav currentPath="/current">
          <SideNavItem path="/before">Before</SideNavItem>
          <SideNavItem path="/current">Current</SideNavItem>
          <SideNavItem path="/after">After</SideNavItem>
        </SideNav>,
      );

      const currentItems = document.querySelectorAll('[aria-current=page]');
      expect(currentItems).toHaveLength(1);

      const otherItems = document.querySelectorAll('[aria-current=false]');
      expect(otherItems).toHaveLength(2);

      const [currentItem] = Array.from(currentItems);
      expect(currentItem).toHaveTextContent('Current');
    });

    test('group item corresponding to current path is current', () => {
      render(
        <SideNav currentPath="/current">
          <SideNavItem path="/before">Before</SideNavItem>
          <SideNavGroup label="group" glyph={<CloudIcon />}>
            <SideNavItem path="/current">Current</SideNavItem>
          </SideNavGroup>
          <SideNavItem path="/after">After</SideNavItem>
        </SideNav>,
      );

      const currentItems = document.querySelectorAll('[aria-current=page]');
      expect(currentItems).toHaveLength(1);

      const otherItems = document.querySelectorAll('[aria-current=false]');
      expect(otherItems).toHaveLength(2);

      const [currentItem] = Array.from(currentItems);
      expect(currentItem).toHaveTextContent('Current');
    });

    test('all items not corresponding to current path are not current', () => {
      render(
        <SideNav currentPath="/no-match">
          <SideNavItem path="/one">One</SideNavItem>
          <SideNavItem path="/two">Two</SideNavItem>
          <SideNavGroup label="group" glyph={<CloudIcon />}>
            <SideNavItem path="/three">Three</SideNavItem>
          </SideNavGroup>
        </SideNav>,
      );

      const currentItems = document.querySelectorAll('[aria-current=page]');
      expect(currentItems).toHaveLength(0);

      const otherItems = document.querySelectorAll('[aria-current=false]');
      expect(otherItems).toHaveLength(3);
    });

    /* eslint-disable jest/expect-expect */
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('types work as expected', () => {
      test('`initialCollapsed` can only `false` when not collapsible', () => {
        <SideNav> </SideNav>;

        <SideNav initialCollapsed={false}> </SideNav>;
        <SideNav initialCollapsed> </SideNav>;

        <SideNav collapsible initialCollapsed={false}>
          {' '}
        </SideNav>;
        <SideNav collapsible initialCollapsed>
          {' '}
        </SideNav>;

        <SideNav collapsible initialCollapsed={false}>
          {' '}
        </SideNav>;
        <SideNav collapsible initialCollapsed>
          {' '}
        </SideNav>;

        <SideNav collapsible initialCollapsed={false}>
          {' '}
        </SideNav>;
        // @ts-expect-error
        <SideNav collapsible={false} initialCollapsed>
          {' '}
        </SideNav>;
      });
    });
  });

  describe('SideNavItem', () => {
    test('`href` is rendered', () => {
      const { getByText } = render(
        <SideNavItem href="/link">Link</SideNavItem>,
      );

      const item = getByText('Link');
      expect(item).toHaveAttribute('href', '/link');
    });

    test('`onClick` is called when clicked', () => {
      const clickSpy = jest.fn();
      const { getByText } = render(
        <SideNavItem onClick={clickSpy}>click</SideNavItem>,
      );

      const item = getByText('click');

      expect(clickSpy).not.toHaveBeenCalled();
      fireEvent.click(item);
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    /* eslint-disable jest/expect-expect */
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('types work as expected', () => {
      test('`glyphVisibilty` can only be provided with `glyph`', () => {
        <SideNavItem> </SideNavItem>;

        <SideNavItem glyph={<CloudIcon />}> </SideNavItem>;

        <SideNavItem
          glyph={<CloudIcon />}
          glyphVisibility={GlyphVisibility.Visible}
        >
          {' '}
        </SideNavItem>;

        // @ts-expect-error
        <SideNavItem glyphVisibility={GlyphVisibility.Visible}> </SideNavItem>;
      });

      test('`href` and `path` cannot both be provided', () => {
        <SideNavItem href="/item"> </SideNavItem>;

        <SideNavItem path="/item"> </SideNavItem>;

        // @ts-expect-error
        <SideNavItem href="/item" path="/item">
          {' '}
        </SideNavItem>;
      });

      test('`href` and `onClick` cannot both be provided', () => {
        <SideNavItem href="/item"> </SideNavItem>;

        <SideNavItem onClick={() => {}}> </SideNavItem>;

        // @ts-expect-error
        <SideNavItem href="/item" onClick={() => {}}>
          {' '}
        </SideNavItem>;
      });

      test('`path` and `onClick` can both be provided', () => {
        <SideNavItem path="/item" onClick={() => {}}>
          {' '}
        </SideNavItem>;
      });
    });
    /* eslint-enable jest/expect-expect */
  });
});
