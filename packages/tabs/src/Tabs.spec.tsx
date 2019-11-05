import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { Tabs, Tab } from './index';

afterAll(cleanup);

describe('packages/Tabs', () => {
  const tabsClassName = 'tabs-classname';
  const tabClassName = 'tab-classname';
  const setSelected = jest.fn();

  const { container, getByText, getByTestId } = render(
    <Tabs
      className={tabsClassName}
      selected={1}
      setSelected={setSelected}
      data-testid="tabs-component"
      as="a"
    >
      <Tab name="Name A">Test Content 1</Tab>
      <Tab className={tabClassName} name="Name B">
        Test Content 2
      </Tab>
      <Tab name="Name C" disabled>
        Test Content 3
      </Tab>
    </Tabs>,
  );

  test('clicking a tab fires setSelected callback', () => {
    const tabListItem = getByText('Name A');
    fireEvent.click(tabListItem);

    expect(setSelected).toHaveBeenCalledTimes(1);
  });

  test('tab renders as disabled when the prop is set', () => {
    const tabListItem = getByText('Name C');
    expect(tabListItem).toHaveAttribute('aria-disabled');
  });

  test(`renders "${tabsClassName}" in the Tabs componenet's classList`, () => {
    const tabs = getByTestId('tabs-component');
    expect(tabs.classList.contains(tabsClassName)).toBe(true);
  });

  test(`renders "${tabClassName}" in the Tab component's classList`, () => {
    const tab = getByText('Test Content 2');
    expect(tab.classList.contains(tabClassName)).toBe(true);
  });

  test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
    const tabListItem = getByText('Name A');
    expect(tabListItem.tagName.toLowerCase()).toBe('a');
  });

  test('renders correct number of elements in the tablist', () => {
    expect(container.querySelectorAll('[role="tab"]').length).toBe(3);
  });

  test('renders only one tabpanel at a time', () => {
    expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
  });

  describe('when the component is controlled', () => {
    test('selected tab is active on first render', () => {
      const activeTab = getByText('Test Content 2');
      expect(activeTab).toBeVisible();
    });

    test('clicking a tab does not change the active tab', () => {
      const tab = getByText('Name A');
      fireEvent.click(tab);

      const secondContent = getByText('Second Content');
      expect(secondContent).toBeInTheDocument();
    });

    test('keyboard nav is not supported', () => {
      const activeTabListItem = getByText('Name B');
      const activeTab = getByText('Test Content 2');
      fireEvent.keyDown(activeTabListItem, { key: 'ArrowLeft', keyCode: 37 });
      expect(activeTab).toBeVisible();
    });
  });

  describe('when the component is uncontrolled', () => {
    const { container, getByText } = render(
      <Tabs className={tabsClassName} setSelected={setSelected}>
        <Tab className={tabClassName} name="Name First">
          First Content
        </Tab>
        <Tab default name="Name Second">
          Second Content
        </Tab>
        <Tab name="Name Third" disabled>
          Third Content
        </Tab>
      </Tabs>,
    );

    test('renders only one tabpanel at a time', () => {
      expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
    });

    test('default tab is active on first render', () => {
      const defaultTab = getByText('Second Content');
      expect(defaultTab).toBeInTheDocument();
    });

    test('clicking a tab changes the active tab', () => {
      const tab = getByText('Name First');
      fireEvent.click(tab);

      const firstContent = getByText('First Content');
      expect(firstContent).toBeInTheDocument();
      expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
    });

    test('keyboard nav is supported', () => {
      const activeTabListItem = getByText('Name First');
      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowLeft',
        keyCode: 37,
      });

      const nextActiveTab = getByText('Second Content');
      expect(nextActiveTab).toBeVisible();
      expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
    });

    test('keyboard nav skips tab if tab is disabled', () => {
      const activeTabListItem = getByText('Name Second');
      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowRight',
        keyCode: 39,
      });

      const activeTab = getByText('First Content');
      expect(activeTab).toBeVisible();
    });
  });
});
