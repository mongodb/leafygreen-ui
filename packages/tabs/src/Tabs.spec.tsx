import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Tabs, Tab } from './index';

describe('packages/Tabs', () => {
  describe('when controlled default', () => {
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

    test('selected tab is active on first render', () => {
      const activeTab = getByText('Test Content 2');
      expect(activeTab).toBeVisible();
    });

    test('clicking a tab fires setSelected callback', () => {
      const tabListItem = getByText('Name A');
      fireEvent.click(tabListItem);

      expect(setSelected).toHaveBeenCalledTimes(1);
    });

    test('keyboard nav is not supported', () => {
      const activeTabListItem = getByText('Name B');
      const activeTab = getByText('Test Content 2');
      fireEvent.keyDown(activeTabListItem, { key: 'ArrowLeft', keyCode: 37 });
      expect(activeTab).toBeVisible();
    });
  });

  describe('when uncontrolled', () => {
    const setUncontrolledSelected = jest.fn();

    const { container, getByText, getByTestId } = render(
      <Tabs setSelected={setUncontrolledSelected}>
        <Tab name="Sheep">Baa</Tab>
        <Tab default name="Cow" data-testid="default-tab">
          Moo
        </Tab>
        <Tab name="Pig" disabled>
          Oink
        </Tab>
      </Tabs>,
    );

    test('default tab is active on first render', () => {
      const defaultTab = getByTestId('default-tab');
      expect(defaultTab).toBeInTheDocument();
    });

    test('clicking a tab changes the active tab', () => {
      const tab = getByText('Sheep');
      fireEvent.click(tab);

      const firstContent = getByText('Baa');
      expect(firstContent).toBeInTheDocument();
      expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
    });

    test('keyboard nav is supported', () => {
      const activeTabListItem = getByText('Sheep');
      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowLeft',
        keyCode: 37,
      });

      const nextActiveTab = getByText('Moo');
      expect(nextActiveTab).toBeVisible();
      expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1);
    });

    test('keyboard nav skips tab if tab is disabled', () => {
      const activeTabListItem = getByText('Cow');
      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowRight',
        keyCode: 39,
      });

      const activeTab = getByText('Baa');
      expect(activeTab).toBeVisible();
    });

    test('keyboard nav does not work if modifier key is also pressed', () => {
      const activeTabListItem = getByText('Sheep');
      fireEvent.keyDown(activeTabListItem, {
        key: 'Control',
        keyCode: 17,
      });

      fireEvent.keyDown(activeTabListItem, {
        key: 'ArrowRight',
        keyCode: 39,
      });

      const activeTab = getByText('Baa');
      expect(activeTab).toBeVisible();
    });
  });
});
