import React from 'react';
import {
  act,
  fireEvent,
  queryByLabelText,
  render,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import { keyMap } from '@leafygreen-ui/lib';
import { GlyphVisibility, SideNav, SideNavGroup, SideNavItem } from '.';
import { transitionDurationMilliseconds } from './utils';

describe('packages/collapsible-side-nav', () => {
  describe('SideNav', () => {
    test('renders items and groups', () => {
      const { getByText } = render(
        <SideNav>
          <SideNavItem path="/one">One</SideNavItem>
          <SideNavGroup label="Group">
            <SideNavItem path="/two">Two</SideNavItem>
          </SideNavGroup>
        </SideNav>,
      );

      expect(getByText('One')).toBeVisible();
      expect(getByText('Group')).toBeVisible();
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
          <SideNavGroup label="Group">
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
          <SideNavGroup label="Group">
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
          async action => {
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
            <SideNavGroup label="Group" glyph={<CloudIcon />}>
              <SideNavItem>Two</SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        function expectCollapsed() {
          const items = ['One', 'Two'].map(label => queryByText(label));
          const header = queryGroupHeaderByLabelText(container, 'Group');

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
            const header = queryGroupHeaderByLabelText(container, 'Group');
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

        // wait a little bit for any transitions to finish so that we
        // don't get warnings about not wrapping re-renders in `act`
        await act(
          () =>
            new Promise(resolve =>
              setTimeout(resolve, transitionDurationMilliseconds),
            ),
        );
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
      test('non-collapsible group cannot be collapsed', () => {
        const { getByText } = render(
          <SideNav>
            <SideNavGroup label="Group">
              <SideNavItem>Item</SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        const headerText = getByText('Group');
        expect(headerText.closest('[role=button]')).toBeNull();
        expect(getByText('Item')).toBeVisible();

        fireEvent.click(headerText);
        expect(getByText('Item')).toBeVisible();
      });

      test('collapsible group is initially collapsed by default', () => {
        const { getByText, queryByText } = render(
          <SideNav>
            <SideNavGroup label="Group" collapsible>
              <SideNavItem>Item</SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        const headerText = getByText('Group');
        const header = headerText.closest('[role=button]');
        expect(header).toHaveAttribute('aria-expanded', 'false');
        expect(queryByText('Item')).not.toBeVisible();
      });

      test('collapsible group with `initialCollapsed={false}` is initially expanded', () => {
        const { getByText, queryByText } = render(
          <SideNav>
            <SideNavGroup label="Group" collapsible initialCollapsed={false}>
              <SideNavItem>Item</SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        const headerText = getByText('Group');
        const header = headerText.closest('[role=button]');
        expect(header).toHaveAttribute('aria-expanded', 'true');
        expect(queryByText('Item')).toBeVisible();
      });

      test('collapsible group is collapsible and expandable', () => {
        const { getByText, queryByText } = render(
          <SideNav>
            <SideNavGroup label="Group" collapsible>
              <SideNavItem>Item</SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        const headerText = getByText('Group');
        const header = headerText.closest('[role=button]');

        fireEvent.click(headerText);
        expect(header).toHaveAttribute('aria-expanded', 'true');
        expect(getByText('Item')).toBeVisible();

        fireEvent.click(headerText);
        expect(header).toHaveAttribute('aria-expanded', 'false');
        expect(queryByText('Item')).not.toBeVisible();
      });
    });

    /* eslint-disable jest/expect-expect */
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('types work as expected', () => {
      test('valid `aria-label` is always provided or derived from label', () => {
        <SideNavGroup label="Group"> </SideNavGroup>;

        <SideNavGroup label={<>group</>} aria-label="Group">
          {' '}
        </SideNavGroup>;

        <SideNavGroup label="Group" aria-label="Group">
          {' '}
        </SideNavGroup>;

        // @ts-expect-error
        <SideNavGroup label={<>group</>}> </SideNavGroup>;
      });

      test('`initialCollapsed` can only `false` when not collapsible', () => {
        <SideNavGroup label="Group"> </SideNavGroup>;

        <SideNavGroup label="Group" initialCollapsed={false}>
          {' '}
        </SideNavGroup>;
        <SideNavGroup label="Group" initialCollapsed>
          {' '}
        </SideNavGroup>;

        <SideNavGroup label="Group" collapsible initialCollapsed={false}>
          {' '}
        </SideNavGroup>;
        <SideNavGroup label="Group" collapsible initialCollapsed>
          {' '}
        </SideNavGroup>;

        <SideNavGroup label="Group" collapsible initialCollapsed={false}>
          {' '}
        </SideNavGroup>;
        <SideNavGroup label="Group" collapsible initialCollapsed>
          {' '}
        </SideNavGroup>;

        <SideNavGroup label="Group" collapsible initialCollapsed={false}>
          {' '}
        </SideNavGroup>;
        // @ts-expect-error
        <SideNavGroup label="Group" collapsible={false} initialCollapsed>
          {' '}
        </SideNavGroup>;
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

    test('tabbing', () => {
      const { getByLabelText } = render(
        <SideNav>
          <SideNavItem>One</SideNavItem>
          <SideNavGroup label="Group">
            <SideNavItem>Two</SideNavItem>
          </SideNavGroup>
          <SideNavGroup label="Collapsed Group" collapsible>
            <SideNavItem>X</SideNavItem>
          </SideNavGroup>
          <SideNavGroup
            label="Expanded Group"
            collapsible
            initialCollapsed={false}
          >
            <SideNavItem>Three</SideNavItem>
          </SideNavGroup>
        </SideNav>,
      );

      expect(document.body).toHaveFocus();

      const collapseButton = getByLabelText('Collapse sidebar');
      userEvent.tab();
      expect(collapseButton).toHaveFocus();

      userEvent.tab();
      expect(document.activeElement).toHaveTextContent('One');

      userEvent.tab();
      expect(document.activeElement).toHaveTextContent('Two');

      userEvent.tab();
      expect(document.activeElement).toHaveTextContent('Collapsed Group');

      userEvent.tab();
      expect(document.activeElement).toHaveTextContent('Expanded Group');

      userEvent.tab();
      expect(document.activeElement).toHaveTextContent('Three');

      userEvent.tab();
      expect(document.body).toHaveFocus();
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
