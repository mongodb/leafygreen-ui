import React, { useState } from 'react';
import {
  render,
  fireEvent,
  screen,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tabs, Tab } from '.';

const tabsClassName = 'tabs-class-name';
const tabsTestId = 'tabs-component';
const setSelected = jest.fn();

const renderTabs = (tabsProps = {}, tabProps = {}) => {
  return render(
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
  });

  describe('when controlled', () => {
    test('clicking a tab fires setSelected callback', () => {
      renderTabs({ setSelected, selected: 1 });
      const tabListItem = screen.getByText('Second');
      fireEvent.click(tabListItem);
      expect(setSelected).toHaveBeenCalled();
    });

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
      const { getAllByTestId } = renderTabs({
        setSelected,
        selected: 1,
        as: 'a',
      });

      const [tabListItem] = getAllByTestId('first-tab');
      expect(tabListItem.tagName.toLowerCase()).toBe('a');
    });

    test('renders correct number of elements in the tablist', () => {
      renderTabs({
        setSelected,
        selected: 1,
      });

      const container = screen.getByTestId(tabsTestId);
      expect(container.querySelectorAll('[role="tab"]').length).toBe(3);
    });

    test('renders only one tabpanel at a time', () => {
      renderTabs({
        setSelected,
        selected: 1,
      });

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    test('selected tab is active on first render', () => {
      renderTabs({ setSelected, selected: 1 });
      const activeTab = screen.getByText('Content 2');
      expect(activeTab).toBeVisible();
    });

    test('clicking a tab does not change the active tab', () => {
      renderTabs({ setSelected, selected: 1 });
      const tab = screen.getByText('First');
      fireEvent.click(tab);

      const secondContent = screen.getByText('Content 2');
      expect(secondContent).toBeInTheDocument();
    });

    test('keyboard nav is not supported', () => {
      renderTabs({ setSelected, selected: 1 });
      const activeTabListItem = screen.getByText('Second');
      const activeTab = screen.getByText('Content 2');
      fireEvent.keyDown(activeTabListItem, { key: 'ArrowLeft', keyCode: 37 });
      expect(activeTab).toBeVisible();
    });
  });

  describe('when uncontrolled', () => {
    test('default tab is visible by default', () => {
      renderTabs({}, { default: true });
      const defaultTabContent = screen.getByText('Content 1');
      expect(defaultTabContent).toBeInTheDocument();
    });

    test('clicking a tab changes the activeTab', () => {
      renderTabs({}, { default: true });
      const defaultTabContent = screen.getByText('Content 1');
      expect(defaultTabContent).toBeInTheDocument();

      const newActiveTabTitle = screen.getByText('Second');
      fireEvent.click(newActiveTabTitle);
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    test('keyboard navigation is supported', () => {
      const { getAllByTestId } = renderTabs({}, { default: true });
      const [firstTab] = getAllByTestId('first-tab');
      const [secondTab] = getAllByTestId('second-tab');

      // Focus on first tab
      userEvent.tab();
      expect(firstTab).toHaveFocus();

      // Keyboard navigate between tabs
      fireEvent.keyDown(firstTab, {
        key: 'ArrowRight',
        keyCode: 39,
      });
      expect(secondTab).toHaveFocus();
    });

    test('keyboard navigation skips disabled tabs', () => {
      const { getAllByTestId } = render(
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

      const [firstTab] = getAllByTestId('first-tab');

      // Tab to first tab
      userEvent.tab();
      expect(firstTab).toHaveFocus();

      // Keyboard navigate between tabs
      fireEvent.keyDown(firstTab, {
        key: 'ArrowRight',
        keyCode: 39,
      });
      const [thirdTab] = getAllByTestId('third-tab');
      expect(thirdTab).toHaveFocus();
    });

    test('keyboard nav does not work if modifier key is also pressed', () => {
      renderTabs({}, { default: true });
      const activeTabListItem = screen.getByText('First');

      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowRight',
        keyCode: 39,
        metaKey: true,
      });

      const activeTab = screen.getByText('Content 1');
      expect(activeTab).toBeVisible();
    });
  });

  describe('when there are two sets of tabs on the page', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(
        <>
          <Tabs aria-label="Description of another set of test tabs">
            <Tab default name="Tab Set 1-A" data-testid="tab-1-a">
              Content 1-A
            </Tab>
            <Tab name="Tab Set 1-B" data-testid="tab-1-b">
              Content 1-B
            </Tab>
          </Tabs>
          <Tabs aria-label="Description of another set of test tabs">
            <Tab default name="Tab Set 2-A" data-testid="tab-2-a">
              Content 2-A
            </Tab>
            <Tab name="Tab Set 2-B" data-testid="tab-2-b">
              Content 2-B
            </Tab>
          </Tabs>
        </>,
      );
    });

    test('only the current Tabs set is toggled when the arrow keys are pressed', () => {
      const { getAllByTestId } = renderResult;
      const [tab1A] = getAllByTestId('tab-1-a');
      const [tab1B] = getAllByTestId('tab-1-b');

      // Tab to first tab
      userEvent.tab();
      expect(tab1A).toHaveFocus();

      fireEvent.keyDown(tab1A, {
        key: 'ArrowRight',
        keyCode: 39,
      });

      expect(tab1B).toHaveFocus();
    });
  });

  describe('it maintains accessible props', () => {
    beforeEach(() => {
      render(
        <Tabs aria-label="testing accessible labels">
          <Tab default name="Name 1">
            Content 1
          </Tab>
          <Tab name="Name 2">Content 2</Tab>
        </Tabs>,
      );
    });

    test('tabs and panels render with appropriately related aria tags', () => {
      const tab = screen.getAllByRole('tab')[0];
      const panel = screen.getAllByRole('tabpanel')[0];

      expect(tab.getAttribute('id')).toEqual(
        panel.getAttribute('aria-labelledby'),
      );
      expect(tab.getAttribute('aria-controls')).toEqual(
        panel.getAttribute('id'),
      );
    });
  });
});

describe('packages/tab', () => {
  test('props are passed to tab element through rest', () => {
    renderTabs({}, { 'data-test-prop': 'test-prop' });
    expect(screen.getAllByRole('tab')[0].getAttribute('data-test-prop')).toBe(
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
