import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Tabs, Tab } from './index';

const setSelected = jest.fn();
const tabsClassName = 'tabs-class-name';

function renderTabs(props = {}, useDefault?: boolean) {
  const utils = render(
    <Tabs {...props} data-testid="tabs-component">
      <Tab default={useDefault} name="Name A">
        Test Content 1
      </Tab>
      <Tab name="Name B">Test Content 2</Tab>
      <Tab disabled name="Name C">
        Test Content 3
      </Tab>
    </Tabs>,
  );
  return utils;
}

describe('packages/tab', () => {
  test('clicking a tab fires setSelected callback', () => {
    const { getByText } = renderTabs({ setSelected, selected: 1 });
    const tabListItem = getByText('Name A');
    fireEvent.click(tabListItem);

    expect(setSelected).toHaveBeenCalled();
  });

  test(`renders "${tabsClassName}" in the Tabs componenet's classList`, () => {
    const { getByTestId } = renderTabs({
      setSelected,
      selected: 1,
      className: tabsClassName,
    });

    const tabs = getByTestId('tabs-component');
    expect(tabs.classList.contains(tabsClassName)).toBe(true);
  });

  test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
    const { getByText } = renderTabs({
      setSelected,
      selected: 1,
      as: 'a',
    });

    const tabListItem = getByText('Name A');
    expect(tabListItem.tagName.toLowerCase()).toBe('a');
  });

  test('renders correct number of elements in the tablist', () => {
    const { container } = renderTabs({
      setSelected,
      selected: 1,
    });
    expect(container.querySelectorAll('[role="tab"]').length).toBe(3);
  });

  test('renders only one tabpanel at a time', () => {
    const { container } = renderTabs({
      setSelected,
      selected: 1,
    });
    expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
  });

  describe('when the component is controlled', () => {
    test('selected tab is active on first render', () => {
      const { getByText } = renderTabs({ setSelected, selected: 1 });
      const activeTab = getByText('Test Content 2');
      expect(activeTab).toBeVisible();
    });

    test('clicking a tab does not change the active tab', () => {
      const { getByText } = renderTabs({ setSelected, selected: 1 });
      const tab = getByText('Name A');
      fireEvent.click(tab);

      const secondContent = getByText('Test Content 2');
      expect(secondContent).toBeInTheDocument();
    });

    test('keyboard nav is not supported', () => {
      const { getByText } = renderTabs({ setSelected, selected: 1 });
      const activeTabListItem = getByText('Name B');
      const activeTab = getByText('Test Content 2');
      fireEvent.keyDown(activeTabListItem, { key: 'ArrowLeft', keyCode: 37 });
      expect(activeTab).toBeVisible();
    });
  });

  describe('when the component is uncontrolled', () => {
    test('default tab is active on first render', () => {
      const { getByText } = renderTabs({ setSelected }, true);

      const defaultTab = getByText('Test Content 1');
      expect(defaultTab).toBeInTheDocument();
    });

    test('clicking a tab changes the active tab', () => {
      const { container, getByText } = renderTabs({ setSelected }, true);
      const tab = getByText('Name B');
      fireEvent.click(tab);

      const newlyActiveTab = getByText('Test Content 2');
      expect(newlyActiveTab).toBeInTheDocument();
      expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
    });

    test('keyboard nav is supported', () => {
      const { container, getByText } = renderTabs({ setSelected }, true);

      const activeTabListItem = getByText('Name A');
      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowRight',
        keyCode: 37,
      });

      const nextActiveTab = getByText('Test Content 2');
      expect(nextActiveTab).toBeVisible();
      expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
    });

    test('keyboard nav skips tab if tab is disabled', () => {
      const { getByText } = renderTabs({ setSelected }, true);

      const activeTabListItem = getByText('Name A');
      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowLeft',
        keyCode: 39,
      });

      const activeTab = getByText('Test Content 2');
      expect(activeTab).toBeVisible();
    });

    test('keyboard nav does not work if modifier key is also pressed', () => {
      const { getByText } = renderTabs({ setSelected }, true);
      const activeTabListItem = getByText('Name A');
      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowRight',
        keyCode: 39,
        metaKey: true,
      });

      const activeTab = getByText('Test Content 1');
      expect(activeTab).toBeVisible();
    });
  });
});
