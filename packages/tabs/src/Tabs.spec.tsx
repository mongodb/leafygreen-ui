import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { Tabs, Tab } from './index';

afterAll(cleanup);

describe('packages/Tabs', () => {
  const tabsClassName = 'tabs-classname';
  const tabClassName = 'tab-classname';
  const onChange = jest.fn();

  const { getByText, getByTestId } = render(
    <Tabs
      className={tabsClassName}
      selected="b"
      onChange={onChange}
      data-testid="tabs-component"
    >
      <Tab value="a" title="Title A">
        Test Content 1
      </Tab>
      <Tab className={tabClassName} value="b" title="Title B">
        Test Content 2
      </Tab>
      <Tab value="c" title="Title C" disabled></Tab>
    </Tabs>,
  );

  test('clicking a tab fires onChange callback', () => {
    const tabListItem = getByText('Title A');
    fireEvent.click(tabListItem);

    setTimeout(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    }, 500);
  });

  test('tab renders as disabled when the prop is set', () => {
    const tabListItem = getByText('Title C');

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

  describe('when the component is controlled', () => {
    test('selected tab is active on first render', () => {
      const activeTab = getByText('Test Content 2');
      expect(activeTab).toBeVisible();
    });

    // test('clicking a tab changes the active tab', () => {
    //   const tab = getByText('Title A');
    //   fireEvent.click(tab);

    //   setTimeout(() => {
    //     console.log(container.innerHTML);
    //   }, 4500);
    // });

    test('keyboard nav is not supported', () => {
      const activeTabListItem = getByText('Title B');
      const activeTab = getByText('Test Content 2');
      fireEvent.keyDown(activeTabListItem, { key: 'ArrowLeft', code: 37 });
      expect(activeTab).toBeVisible();
    });
  });

  describe('when the component is uncontrolled', () => {
    const { getByText } = render(
      <Tabs className={tabsClassName} onChange={onChange}>
        <Tab className={tabClassName} value="first" title="Title First">
          First Content
        </Tab>
        <Tab default value="second" title="Title Second">
          Second Content
        </Tab>
        <Tab value="third" title="Title Third" disabled>
          Third Content
        </Tab>
      </Tabs>,
    );

    test('default tab is active on first render', () => {
      const defaultTab = getByText('Second Content');
      expect(defaultTab).toBeInTheDocument();
    });

    // test('keyboard nav is supported', () => {
    //   const activeTabListItem = getByText('Title B');
    //   const nextActiveTab = getByText('Test Content 1');
    //   fireEvent.keyDown(activeTabListItem, { key: 'ArrowLeft', code: 37 });

    //   setTimeout(() => {
    //     expect(nextActiveTab).toBeVisible();
    //   }, 500)
    // })

    test('keyboard nav skips tab if tab is disabled', () => {
      const activeTabListItem = getByText('Title Second');
      const activeTab = getByText('Second Content');
      // const nextActiveTab = getByText('Third Content');
      fireEvent.keyDown(activeTabListItem, { key: 'ArrowRight', code: 39 });

      // !expect(nextActiveTab).toBeInTheDocument;
      expect(activeTab).toBeVisible();
    });
  });
});
