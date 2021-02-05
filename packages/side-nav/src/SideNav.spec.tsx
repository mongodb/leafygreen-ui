import React from 'react';
import {
  act,
  fireEvent,
  queryByLabelText,
  render,
  waitFor,
} from '@testing-library/react';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import { keyMap } from '@leafygreen-ui/lib';
import { GlyphVisibility, SideNav, SideNavGroup, SideNavItem } from '.';

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
        'pressing enter on focused button': (collapseButton: HTMLElement) => {
          fireEvent.keyDown(collapseButton, {
            key: 'Enter',
            keyCode: keyMap.Enter,
          });
        },
        'pressing "[" key': () => {
          fireEvent.keyDown(document, {
            key: 'BracketLeft',
            keyCode: keyMap.BracketLeft,
          });
        },
      } as const;

      describe('non-collapsible nav', () => {
        test('renders no collapse button', () => {
          const { queryByLabelText } = render(
            <SideNav collapsible={false}>
              <SideNavItem path="/one">One</SideNavItem>
            </SideNav>,
          );

          expect(queryByLabelText('Expand sidebar')).not.toBeInTheDocument();
          expect(queryByLabelText('Collapse sidebar')).not.toBeInTheDocument();
        });

        test('does not respond to "[" key', async () => {
          const { queryByLabelText } = render(
            <SideNav collapsible={false}>
              <SideNavItem path="/one">One</SideNavItem>
            </SideNav>,
          );

          const item = queryByLabelText('One');
          expect(item).toBeVisible();

          actions['pressing "[" key']();
          expect(item).toBeVisible();
        });
      });

      describe('collapsible nav', () => {
        test.each(Object.keys(actions) as Array<keyof typeof actions>)(
          'collapses and expands when %s',
          action => {
            const { container, getByLabelText, queryByLabelText } = render(
              <SideNav>
                <SideNavItem>Item</SideNavItem>
                <SideNavItem glyph={<CloudIcon />}>
                  Item With Only Collapsed Glyph
                </SideNavItem>
                <SideNavItem
                  glyph={<CloudIcon />}
                  glyphVisibility={GlyphVisibility.NavExpanded}
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

            function queryAllItems() {
              return [
                'Item',
                'Item With Only Collapsed Glyph',
                'Item With Only Expanded Glyph',
                'Item With Always Visible Glyph',
                'Group Item',
                'Group With Glyph Item',
              ].map(label => queryByLabelText(label));
            }

            function expectExpanded() {
              const [
                item,
                itemWithOnlyCollapsedGlyph,
                itemWithOnlyExpandedGlyph,
                itemWithAlwaysVisibleGlyph,
                groupItem,
                groupWithGlyphItem,
              ] = queryAllItems();

              const groupHeader = getGroupHeaderByLabelText(container, 'Group');
              const groupWithGlyphHeader = getGroupHeaderByLabelText(
                container,
                'Group with Glyph',
              );

              [
                item,
                itemWithOnlyCollapsedGlyph,
                groupItem,
                groupWithGlyphItem,
              ].forEach(item => {
                expect(item).toBeVisible();
                expect(item?.querySelector('svg')).toBeNull();
              });

              expect(groupHeader).toBeVisible();
              expect(groupHeader?.querySelector('svg')).not.toBeVisible();

              [
                itemWithOnlyExpandedGlyph,
                itemWithAlwaysVisibleGlyph,
                groupWithGlyphHeader,
              ].forEach(item => {
                expect(item).toBeVisible();
                expect(item?.querySelector('svg')).toBeVisible();
              });

              // Button should have correct aria attributes
              expect(
                queryByLabelText('Expand sidebar'),
              ).not.toBeInTheDocument();
              const collapseButton = getByLabelText('Collapse sidebar');
              expect(collapseButton).toBeVisible();
              expect(collapseButton).toHaveAttribute('aria-expanded', 'true');

              function expectCollapsed() {
                const [
                  item,
                  itemWithOnlyCollapsedGlyph,
                  itemWithOnlyExpandedGlyph,
                  itemWithAlwaysVisibleGlyph,
                  groupItem,
                  groupWithGlyphItem,
                ] = queryAllItems();

                expect(collapseButton).not.toBeInTheDocument();

                [
                  item,
                  itemWithOnlyExpandedGlyph,
                  groupItem,
                  groupWithGlyphItem,
                ].forEach(item => {
                  // If it's a top-level item, it won't be in the DOM at all
                  // and if it's in a group then it won't be visible
                  if (item !== null) {
                    expect(item).not.toBeVisible();
                  }
                });

                expect(groupHeader).toBeVisible();
                expect(groupHeader.querySelector('svg')).not.toBeVisible();

                [
                  itemWithOnlyCollapsedGlyph,
                  itemWithAlwaysVisibleGlyph,
                  groupWithGlyphHeader,
                ].forEach(item => {
                  expect(item).toBeVisible();
                  expect(item?.querySelector('svg')).toBeVisible();
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
    });

    describe('when collapsed', () => {
      test('hovering expands the nav', async () => {
        const {
          container,
          getByText,
          queryByText,
          getByLabelText,
          queryByLabelText,
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
          const header = queryGroupHeaderByLabelText(container, 'group');

          items.forEach(item => {
            // If it's a top-level item, it won't be in the DOM at all
            // and if it's in a group then it won't be visible
            if (item !== null) {
              expect(item).not.toBeVisible();
            }
          });
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
            const header = queryGroupHeaderByLabelText(container, 'group');
            items.forEach(item => expect(item).toBeVisible());
            expect(header).toBeVisible();
          }

          return { expectHovered };
        }

        const { expectHovered } = expectCollapsed();

        const nav = container.querySelector('nav');
        expect(nav).toBeVisible();

        fireEvent.mouseOver(nav!);
        await waitFor(() => {
          act(() => {
            expectHovered();
          });
        });

        fireEvent.mouseLeave(nav!);
        await waitFor(() => {
          act(() => {
            expectCollapsed();
          });
        });
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
    describe('collapsibility', () => {
      test.todo('collapsible group is collapsible');
    });

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

      const item = getByText('Link').closest('a');
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

function queryGroupHeaderByLabelText(
  container: HTMLElement,
  label: string,
): HTMLElement | null {
  const group = queryByLabelText(container, label);
  const labelId = group?.getAttribute('aria-labelledby');

  if (labelId == null) {
    return null;
  }

  return document.getElementById(labelId);
}

function getGroupHeaderByLabelText(
  container: HTMLElement,
  label: string,
): HTMLElement {
  const element = queryGroupHeaderByLabelText(container, label);
  expect(element).not.toBeNull();
  return element!;
}
