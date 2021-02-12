import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tabs, Tab } from '.';

const tabsClassName = 'tabs-class-name';
const tabsTestId = 'tabs-component';
const setSelected = jest.fn();

const renderTabs = (tabsProps = {}, tabProps = {}) => {
  return render(
    <Tabs {...tabsProps} data-testid={tabsTestId} aria-label="Testing tabs">
      <Tab {...tabProps} name="First">
        Content 1
      </Tab>
      <Tab name="Second">Content 2</Tab>
      <Tab name="Third"> Content 3</Tab>
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
      renderTabs({
        setSelected,
        selected: 1,
        as: 'a',
      });

      const tabListItem = screen.getByText('First');
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
      renderTabs({}, { default: true });
      const firstTab = screen.getByText('First');

      // Focus on first tab
      userEvent.tab();
      expect(firstTab).toHaveFocus();

      // Keyboard navigate between tabs
      fireEvent.keyDown(firstTab, {
        key: 'ArrowRight',
        keyCode: 39,
      });
      expect(screen.getByText('Second')).toHaveFocus();
    });

    test('keyboard navigation skips disabled tabs', () => {
      render(
        <Tabs
          data-testid={tabsTestId}
          aria-label="Description of our test tabs"
        >
          <Tab default name="First">
            Content 1
          </Tab>
          <Tab disabled name="Second">
            Content 2
          </Tab>
          <Tab name="Third"> Content 3</Tab>
        </Tabs>,
      );

      const firstTab = screen.getByText('First');

      // Tab to first tab
      userEvent.tab();
      expect(firstTab).toHaveFocus();

      // Keyboard navigate between tabs
      fireEvent.keyDown(firstTab, {
        key: 'ArrowRight',
        keyCode: 39,
      });
      expect(screen.getByText('Third')).toHaveFocus();
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
    beforeEach(() => {
      render(
        <>
          <Tabs aria-label="Description of another set of test tabs">
            <Tab default name="Tab Set 1-A">
              Content 1-A
            </Tab>
            <Tab name="Tab Set 1-B">Content 1-B</Tab>
          </Tabs>
          <Tabs aria-label="Description of another set of test tabs">
            <Tab default name="Tab Set 2-A">
              Content 2-A
            </Tab>
            <Tab name="Tab Set 2-B">Content 2-B</Tab>
          </Tabs>
        </>,
      );
    });

    test('only the current Tabs set is toggled when the arrow keys are pressed', () => {
      const firstTab = screen.getByText('Tab Set 1-A');

      // Tab to first tab
      userEvent.tab();
      expect(firstTab).toHaveFocus();

      fireEvent.keyDown(firstTab, {
        key: 'ArrowRight',
        keyCode: 39,
      });

      expect(screen.getByText('Tab Set 1-B')).toHaveFocus();
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
    renderTabs({}, { 'data-testid': 'test-prop' });
    expect(screen.getAllByRole('tab')[0].getAttribute('data-testid')).toBe(
      'test-prop',
    );
  });
});
