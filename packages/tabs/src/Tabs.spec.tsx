import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { keyMap } from '@leafygreen-ui/lib';

import { TestUtilsReturnType } from './utils/getTestUtils/getTestUtils.types';
import { getTestUtils } from './utils';
import { Tab, Tabs } from '.';

const tabsClassName = 'tabs-class-name';
const tabsTestId = 'tabs-component';
const setSelected = jest.fn();

const renderTabs = (tabsProps = {}, tabProps = {}) => {
  const renderUtils = render(
    <Tabs {...tabsProps} data-testid={tabsTestId} aria-label="Testing tabs">
      <Tab {...tabProps} name="First" data-testid="first-tab">
        Content 1
      </Tab>
      <Tab name="Second" data-testid="second-tab">
        Content 2
      </Tab>
      <Tab name={<div>Third</div>} data-testid="third-tab">
        {' '}
        Content 3
      </Tab>
    </Tabs>,
  );

  const testUtils = getTestUtils();

  return {
    ...renderUtils,
    ...testUtils,
  };
};

describe('packages/tabs', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderTabs();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('renders `name` prop correctly', () => {
      renderTabs();
      const first = screen.getAllByTestId('first-tab')[0];
      const second = screen.getAllByTestId('second-tab')[0];
      const third = screen.getAllByTestId('third-tab')[0];
      expect(first).toHaveAttribute('name', 'First');
      expect(second).toHaveAttribute('name', 'Second');
      expect(third).toHaveAttribute('name', 'Third');
    });
  });

  describe('rendering', () => {
    test('accepts inlineChildren', () => {
      const { getByTestId } = render(
        <Tabs
          aria-label="Label"
          inlineChildren={
            <div data-testid="inline-children">
              <button>Some Button</button>
              <button>Some other Button</button>
            </div>
          }
        >
          <Tab name="Tab 1">Tab 1</Tab>
        </Tabs>,
      );

      expect(getByTestId('inline-children')).toBeInTheDocument();
    });

    describe('forceRenderAllTabPanels', () => {
      test('renders only selected panel in DOM when prop is false', () => {
        const { getAllTabsInTabList, getAllTabPanelsInDOM, getSelectedPanel } =
          renderTabs({
            forceRenderAllTabPanels: false,
          });
        const tabs = getAllTabsInTabList();
        const tabPanels = getAllTabPanelsInDOM();
        expect(tabs).toHaveLength(3);
        expect(tabPanels).toHaveLength(1);

        const selectedPanel = getSelectedPanel();
        const hiddenPanels = tabPanels.filter(
          panel => panel.id !== selectedPanel?.id,
        );

        expect(selectedPanel).toBeVisible();
        expect(hiddenPanels).toHaveLength(0);
      });

      test('renders all tab panels in DOM but only selected panel is visible when prop is true', () => {
        const { getAllTabsInTabList, getAllTabPanelsInDOM, getSelectedPanel } =
          renderTabs({
            forceRenderAllTabPanels: true,
          });
        const tabs = getAllTabsInTabList();
        const tabPanels = getAllTabPanelsInDOM();
        expect(tabs).toHaveLength(3);
        expect(tabPanels).toHaveLength(3);

        const selectedPanel = getSelectedPanel();
        const hiddenPanels = tabPanels.filter(
          panel => panel.id !== selectedPanel?.id,
        );

        expect(selectedPanel).toBeVisible();
        expect(hiddenPanels).toHaveLength(2);
        hiddenPanels.forEach(panel => {
          expect(panel).not.toBeVisible();
          expect(panel).toBeInTheDocument();
        });
      });
    });
  });

  describe('when controlled', () => {
    test(`renders "${tabsClassName}" to the tabs classList`, () => {
      renderTabs({
        setSelected,
        selected: 1,
        className: tabsClassName,
      });

      const tabs = screen.getByTestId(tabsTestId);
      expect(tabs.classList.contains(tabsClassName)).toBe(true);
    });

    test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
      const { getTabUtilsByName } = renderTabs({
        setSelected,
        selected: 1,
        as: 'a',
      });

      const tabUtils = getTabUtilsByName('First');
      expect(tabUtils?.getTab().tagName.toLowerCase()).toBe('a');
    });

    test('renders correct number of elements in the tablist', () => {
      const { getAllTabsInTabList } = renderTabs({
        setSelected,
        selected: 1,
      });

      const tabs = getAllTabsInTabList();
      expect(tabs.length).toBe(3);
    });

    test('renders only one tabpanel at a time', () => {
      renderTabs({
        setSelected,
        selected: 1,
      });

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    test('selected tab panel is active on first render', () => {
      const { getSelectedPanel } = renderTabs({ setSelected, selected: 1 });
      const selectedPanel = getSelectedPanel();
      expect(selectedPanel).toHaveTextContent('Content 2');
    });
    test('clicking a tab fires setSelected callback', () => {
      const { getTabUtilsByName } = renderTabs({ setSelected, selected: 1 });
      const tabUtils = getTabUtilsByName('Second');

      if (tabUtils) {
        fireEvent.click(tabUtils.getTab());
      }
      expect(setSelected).toHaveBeenCalled();
    });
    test('clicking a tab does not update selected index and calls setSelected callback', () => {
      const { getTabUtilsByName, getSelectedPanel } = renderTabs({
        setSelected,
        selected: 1,
      });
      const tabUtils = getTabUtilsByName('First');

      if (tabUtils) {
        fireEvent.click(tabUtils.getTab());
      }

      const selectedPanel = getSelectedPanel();
      expect(selectedPanel).toHaveTextContent('Content 2');
      expect(setSelected).toHaveBeenCalled();
    });

    test('keying down arrow keys does not update selected index and calls setSelected callback', () => {
      const { getTabUtilsByName, getSelectedPanel } = renderTabs({
        setSelected,
        selected: 1,
      });
      const tabUtils = getTabUtilsByName('Second');
      const activeTab = getSelectedPanel();

      if (tabUtils) {
        fireEvent.keyDown(tabUtils.getTab(), {
          key: keyMap.ArrowLeft,
        });
      }

      expect(activeTab).toBeVisible();
      expect(setSelected).toHaveBeenCalled();
    });
  });

  describe('when uncontrolled', () => {
    test('default tab is visible by default', () => {
      const { getSelectedPanel } = renderTabs({}, { default: true });
      const selectedPanel = getSelectedPanel();
      expect(selectedPanel).toHaveTextContent('Content 1');
    });

    test('clicking a tab changes the activeTab', () => {
      const { getSelectedPanel, getTabUtilsByName } = renderTabs(
        {},
        { default: true },
      );
      const selectedPanel = getSelectedPanel();
      expect(selectedPanel).toHaveTextContent('Content 1');

      const newTabUtils = getTabUtilsByName('Second');

      if (newTabUtils) {
        fireEvent.click(newTabUtils.getTab());
      }

      const newSelectedPanel = getSelectedPanel();
      expect(newSelectedPanel).toHaveTextContent('Content 2');
    });

    test('keyboard navigation is supported', () => {
      const { getTabUtilsByName } = renderTabs({}, { default: true });
      const firstTabUtils = getTabUtilsByName('First');
      const firstTab = firstTabUtils?.getTab();
      const secondTabUtils = getTabUtilsByName('Second');
      const secondTab = secondTabUtils?.getTab();

      // Focus on first tab
      userEvent.tab();
      expect(firstTab).toHaveFocus();

      // Keyboard navigate between tabs
      if (firstTab) {
        fireEvent.keyDown(firstTab, {
          key: keyMap.ArrowRight,
        });
      }
      expect(secondTab).toHaveFocus();
    });

    test('keyboard navigation skips disabled tabs', () => {
      render(
        <Tabs
          data-testid={tabsTestId}
          aria-label="Description of our test tabs"
        >
          <Tab default name="First" data-testid="first-tab">
            Content 1
          </Tab>
          <Tab disabled name="Second" data-testid="second-tab">
            Content 2
          </Tab>
          <Tab name="Third" data-testid="third-tab">
            {' '}
            Content 3
          </Tab>
        </Tabs>,
      );

      const { getTabUtilsByName } = getTestUtils();

      const firstTabUtils = getTabUtilsByName('First');

      // Tab to first tab
      userEvent.tab();
      expect(firstTabUtils?.getTab()).toHaveFocus();

      // Keyboard navigate between tabs
      if (firstTabUtils) {
        fireEvent.keyDown(firstTabUtils.getTab(), {
          key: keyMap.ArrowRight,
        });
      }

      const thirdTabUtils = getTabUtilsByName('Third');
      expect(thirdTabUtils?.getTab()).toHaveFocus();
    });

    test('keyboard nav does not work if modifier key is also pressed', () => {
      const { getTabUtilsByName, getSelectedPanel } = renderTabs(
        {},
        { default: true },
      );
      const tabUtils = getTabUtilsByName('First');

      if (tabUtils) {
        fireEvent.keyDown(tabUtils.getTab(), {
          key: keyMap.ArrowRight,
          metaKey: true,
        });
      }

      const selectedPanel = getSelectedPanel();
      expect(selectedPanel).toHaveTextContent('Content 1');
    });
  });

  describe('when there are two sets of tabs on the page', () => {
    let testUtils1: TestUtilsReturnType;

    beforeEach(() => {
      render(
        <>
          <Tabs
            data-lgid="lg-tabs-1"
            aria-label="Description of another set of test tabs"
          >
            <Tab default name="Tab Set 1-A" data-testid="tab-1-a">
              Content 1-A
            </Tab>
            <Tab name="Tab Set 1-B" data-testid="tab-1-b">
              Content 1-B
            </Tab>
          </Tabs>
          <Tabs
            data-lgid="lg-tabs-2"
            aria-label="Description of another set of test tabs"
          >
            <Tab default name="Tab Set 2-A" data-testid="tab-2-a">
              Content 2-A
            </Tab>
            <Tab name="Tab Set 2-B" data-testid="tab-2-b">
              Content 2-B
            </Tab>
          </Tabs>
        </>,
      );
      testUtils1 = getTestUtils('lg-tabs-1');
    });

    test('only the current Tabs set is toggled when the arrow keys are pressed', () => {
      const { getAllTabsInTabList } = testUtils1;
      const [tab1A, tab1B] = getAllTabsInTabList();

      // Tab to first tab
      userEvent.tab();
      expect(tab1A).toHaveFocus();

      fireEvent.keyDown(tab1A, {
        key: keyMap.ArrowRight,
      });

      expect(tab1B).toHaveFocus();
    });
  });

  describe('it maintains accessible props', () => {
    let testUtils: TestUtilsReturnType;

    beforeEach(() => {
      render(
        <Tabs aria-label="testing accessible labels">
          <Tab default name="Name 1">
            Content 1
          </Tab>
          <Tab name="Name 2">Content 2</Tab>
        </Tabs>,
      );
      testUtils = getTestUtils();
    });

    test('tabs and panels render with appropriately related aria tags', () => {
      const { getAllTabsInTabList, getSelectedPanel } = testUtils;
      const tab = getAllTabsInTabList()[0];
      const panel = getSelectedPanel();

      expect(tab.getAttribute('id')).toEqual(
        panel?.getAttribute('aria-labelledby'),
      );
      expect(tab.getAttribute('aria-controls')).toEqual(
        panel?.getAttribute('id'),
      );
    });
  });
});

describe('packages/tab', () => {
  test('props are passed to tab element through rest', () => {
    const { getAllTabsInTabList } = renderTabs(
      {},
      { 'data-test-prop': 'test-prop' },
    );
    expect(getAllTabsInTabList()[0].getAttribute('data-test-prop')).toBe(
      'test-prop',
    );
  });
});

/* eslint-disable jest/expect-expect */
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Prop Types behave as expected', () => {
  test('children is required', () => {
    /// @ts-expect-error
    render(<Tabs aria-label="tabs"></Tabs>);
    render(<Tabs aria-label="tabs">Test</Tabs>);
  });
  test('`aria-label` or `aria-labelledby` is required', () => {
    /// @ts-expect-error
    render(<Tabs>Test</Tabs>);
    render(<Tabs aria-label="tabs">Test</Tabs>);
    render(<Tabs aria-labelledby="tabs">Test</Tabs>);
  });
  describe('`setSelected`', () => {
    it('accepts a generic function', () => {
      const setSelected = (index: number) => {
        index;
      };
      render(
        <Tabs aria-label="tabs" setSelected={setSelected}>
          Test
        </Tabs>,
      );
    });

    it('accepts a React.Dispatch function', () => {
      const [_, setSelected] = useState<number>(0);
      render(
        <Tabs aria-label="tabs" setSelected={setSelected}>
          Test
        </Tabs>,
      );
    });
  });
});
