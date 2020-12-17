import React from 'react';
import { fireEvent, getByTitle, render, waitFor } from '@testing-library/react';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import { keyMap } from '@leafygreen-ui/lib';
import { GlyphVisibility, SideNav, SideNavGroup, SideNavItem } from '.';
import { getGlyphTitle } from '../../icon/src/glyphCommon';

function toHaveGlyph(
  item: HTMLElement,
  glyphName: string,
): jest.CustomMatcherResult {
  try {
    const glyphTitle = getGlyphTitle(glyphName);
    expect(glyphTitle).not.toBeNull();

    const icon = getByTitle(item, glyphTitle!).closest('svg');
    expect(icon).toBeVisible();

    try {
      expect(icon).not.toBeVisible();
    } catch (exception) {
      return { pass: true, message: () => exception.toString() };
    }

    throw Error('unreachable');
  } catch (exception) {
    return { pass: false, message: () => exception.toString() };
  }
}

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toHaveGlyph(glyphName: string): R;
    }
  }
}

expect.extend({ toHaveGlyph });

describe('packages/collapsible-side-nav', () => {
  describe('SideNav', () => {
    test('renders items and groups', () => {
      const { getByText } = render(
        <SideNav>
          <SideNavItem path="/one">One</SideNavItem>
          <SideNavGroup label="group">
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
          <SideNavGroup label="group">
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
          <SideNavGroup label="group">
            <SideNavItem path="/three">Three</SideNavItem>
          </SideNavGroup>
        </SideNav>,
      );

      const currentItems = document.querySelectorAll('[aria-current=page]');
      expect(currentItems).toHaveLength(0);

      const otherItems = document.querySelectorAll('[aria-current=false]');
      expect(otherItems).toHaveLength(3);
    });

    describe('collapsibility', () => {
      const actions = {
        'clicking button': (collapseButton: HTMLElement) => {
          fireEvent.click(collapseButton);
        },
        'pressing space on focused button': (collapseButton: HTMLElement) => {
          fireEvent.keyDown(collapseButton, {
            key: 'Space',
            keyCode: keyMap.Space,
          });
        },
        'pressing "[" key': () => {
          fireEvent.keyDown(document, {
            key: 'BracketLeft',
            keyCode: keyMap.BracketLeft,
          });
        },
      } as const;

      test.each(Object.keys(actions) as Array<keyof typeof actions>)(
        'collapses and expands when %s',
        action => {
          const { getByText, getByLabelText, queryByLabelText } = render(
            <SideNav>
              <SideNavItem>Item</SideNavItem>
              <SideNavItem glyph={<CloudIcon />}>
                Item With Only Collapsed Glyph
              </SideNavItem>
              <SideNavItem
                glyph={<CloudIcon />}
                glyphVisibility={GlyphVisibility.OnlyExpanded}
              >
                Item With Only Expanded Glyph
              </SideNavItem>
              <SideNavItem
                glyph={<CloudIcon />}
                glyphVisibility={GlyphVisibility.Visible}
              >
                Item With Always Visible Glyph
              </SideNavItem>
              <SideNavGroup label="Group">
                <SideNavItem>Group Item</SideNavItem>
              </SideNavGroup>
              <SideNavGroup label="Group with Glyph" glyph={<CloudIcon />}>
                <SideNavItem>Group With Glyph Item</SideNavItem>
              </SideNavGroup>
            </SideNav>,
          );

          function expectExpanded() {
            const [
              item,
              itemWithOnlyCollapsedGlyph,
              itemWithOnlyExpandedGlyph,
              itemWithAlwaysVisibleGlyph,
              groupItem,
              groupWithGlyphItem,
            ] = [
              'Item',
              'Item With Only Collapsed Glyph',
              'Item With Only Expanded Glyph',
              'Item With Always Visible Glyph',
              'Group Item',
              'Group With Glyph Item',
            ].map(label => getByText(label));

            const groupHeader = getByText('Group');
            const groupWithGlyphHeader = getByText('Group with Glyph');

            [
              item,
              itemWithOnlyCollapsedGlyph,
              groupItem,
              groupWithGlyphItem,
              groupHeader,
            ].forEach(item => {
              expect(item).toBeVisible();
              expect(item).not.toHaveGlyph('Cloud');
            });

            [
              itemWithOnlyExpandedGlyph,
              itemWithAlwaysVisibleGlyph,
              groupWithGlyphHeader,
            ].forEach(item => {
              expect(item).toBeVisible();
              expect(item).toHaveGlyph('Cloud');
            });

            // Button should have correct aria attributes
            expect(queryByLabelText('Expand sidebar')).not.toBeInTheDocument();
            const collapseButton = getByLabelText('Collapse sidebar');
            expect(collapseButton).toBeVisible();
            expect(collapseButton).toHaveAttribute('aria-expanded', 'true');

            function expectCollapsed() {
              expect(collapseButton).not.toBeInTheDocument();

              [
                item,
                itemWithOnlyExpandedGlyph,
                groupItem,
                groupWithGlyphItem,
              ].forEach(item => {
                expect(item).not.toBeVisible();
                expect(item).not.toHaveGlyph('Cloud');
              });

              expect(groupHeader).toBeVisible();
              expect(groupHeader).not.toHaveGlyph('Cloud');

              [
                itemWithOnlyCollapsedGlyph,
                itemWithAlwaysVisibleGlyph,
                groupWithGlyphHeader,
              ].forEach(item => {
                expect(item).toBeVisible();
                expect(item).toHaveGlyph('Cloud');
              });

              // aria attributes have been updated
              const expandButton = getByLabelText('Expand sidebar');
              expect(expandButton).toBeVisible();
              expect(expandButton).toHaveAttribute('aria-expanded', 'false');
              return { expandButton };
            }

            return { collapseButton, expectCollapsed };
          }

          const { collapseButton, expectCollapsed } = expectExpanded();

          actions[action](collapseButton);
          const { expandButton } = expectCollapsed();

          // Toggling back should return things to how they were before
          actions[action](expandButton);
          expectExpanded();
        },
      );
    });

    describe('when collapsed', () => {
      test('hovering', async () => {
        const {
          getByText,
          queryByText,
          getByLabelText,
          queryByLabelText,
          container,
        } = render(
          <SideNav initialCollapsed>
            <SideNavItem>One</SideNavItem>
            <SideNavGroup label="group" glyph={<CloudIcon />}>
              <SideNavItem>Two</SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        function expectCollapsed() {
          const items = ['One', 'Two'].map(label => queryByText(label));
          const header = queryByText('group');
          items.forEach(item => expect(item).not.toBeInTheDocument());
          expect(header).not.toBeInTheDocument();

          // Button should have correct aria attributes
          expect(queryByLabelText('Collapse sidebar')).not.toBeInTheDocument();
          const expandButton = getByLabelText('Expand sidebar');
          expect(expandButton).toBeVisible();
          expect(expandButton).toHaveAttribute('aria-expanded', 'false');

          function expectHovered() {
            // Button is still for expanding even when nav is hovered
            expect(expandButton).toBeVisible();
            expect(
              queryByLabelText('Collapse sidebar'),
            ).not.toBeInTheDocument();

            // Items are now fully visible
            const items = ['One', 'Two'].map(label => getByText(label));
            const header = getByText('group');
            items.forEach(item => expect(item).toBeVisible());
            expect(header).toBeVisible();
          }

          return { expectHovered };
        }

        const { expectHovered } = expectCollapsed();

        const nav = container.querySelector('nav');
        expect(nav).toBeVisible();

        fireEvent.mouseOver(nav!);
        await waitFor(() => expectHovered());

        fireEvent.mouseLeave(nav!);
        await waitFor(() => expectCollapsed());
      });
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

  describe('SideNavGroup', () => {
    /* eslint-disable jest/expect-expect */
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('types work as expected', () => {
      test('valid `aria-label` is always provided or derived from label', () => {
        <SideNavGroup label="group"> </SideNavGroup>;

        <SideNavGroup label={<>group</>} aria-label="group">
          {' '}
        </SideNavGroup>;

        <SideNavGroup label="group" aria-label="group">
          {' '}
        </SideNavGroup>;

        // @ts-expect-error
        <SideNavGroup label={<>group</>}> </SideNavGroup>;
      });
    });
    /* eslint-enable jest/expect-expect */
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

      test('valid `aria-label` is always provided or derived from children', () => {
        <SideNavItem>item</SideNavItem>;

        <SideNavItem aria-label="item">
          <>item</>
        </SideNavItem>;

        <SideNavItem aria-label="item">item</SideNavItem>;

        // @ts-expect-error
        <SideNavItem>
          <>item</>
        </SideNavItem>;
      });
    });
    /* eslint-enable jest/expect-expect */
  });
});
