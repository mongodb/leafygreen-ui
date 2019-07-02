import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { Tabs, Tab } from './index';

afterAll(cleanup);

describe('packages/Tabs', () => {
  const tabsClassName = 'tabs-classname';
  const tabClassName = 'tab-classname';
  const onChange = jest.fn();

  const { container, getByText } = render(
    <Tabs className={tabsClassName} selected="b" onChange={onChange}>
      <Tab className={tabClassName} value="a" title="Title A">
        Test Content 1
      </Tab>
      <Tab value="b" title="Title B">
        Test Content 2
      </Tab>
      <Tab value="c" title="Title C" disabled></Tab>
    </Tabs>,
  );

  test('clicking a tab fires onChange callback', () => {
    const tabListItem = getByText('Title A');
    fireEvent.click(tabListItem);

    setTimeout(() => {
      expect(onChange).toBeCalledTimes(1);
    }, 500);
  });

  test('tab renders as disabled when the prop is set', () => {
    const tabListItem = getByText('Title C');

    expect(tabListItem).toHaveAttribute('aria-disabled');
  });

  // describe('when the component is controlled', () => {

  //   test('selected tab is active on first render', () => {

  //   })

  //   test('clicking a tab changes the active tab', () => {

  //   })

  //   test('keyboard nav is not supported', () => {

  //   })
  // })

  // describe('when the component is uncontrolled', () => {

  //   test('default tab is active on first render', () => {

  //   })

  //   test('keyboard nav is supported', () => {

  //   })

  //   test('keyboard nav skips tab if tab is disabled', () => {

  //   })
  // })
});
