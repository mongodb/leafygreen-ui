import React from 'react';
import { render } from '@testing-library/react';

import { Tab, Tabs } from '../..';
import { getTestUtils } from '..';

import { getEnabledIndices } from './getEnabledIndices';

const renderTabs = (
  tabsProps = {},
  { disableFirst = false, disableSecond = false, disableThird = false },
) => {
  const renderUtils = render(
    <Tabs {...tabsProps} aria-label="Testing tabs">
      <Tab name="First" disabled={disableFirst}>
        Content 1
      </Tab>
      <Tab name="Second" disabled={disableSecond}>
        Content 2
      </Tab>
      <Tab name="Third" disabled={disableThird}>
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

describe('getEnabledIndices', () => {
  test('should return correct activeIndex and enabledIndices for enabled tabs', () => {
    const selected = 2;
    const { getAllTabsInTabList } = renderTabs(
      { selected },
      { disableSecond: true },
    );
    const tabTitleElements = getAllTabsInTabList();

    const enabledIndices = getEnabledIndices(tabTitleElements);

    expect(enabledIndices).toEqual([0, 2]);
  });

  test('should return correct activeIndex and enabledIndices when all tabs are enabled', () => {
    const selected = 1;
    const { getAllTabsInTabList } = renderTabs({ selected }, {});
    const tabTitleElements = getAllTabsInTabList();

    const enabledIndices = getEnabledIndices(tabTitleElements);

    expect(enabledIndices).toEqual([0, 1, 2]);
  });

  test('should return correct activeIndex and enabledIndices when no tabs are enabled', () => {
    const selected = 2;
    const { getAllTabsInTabList } = renderTabs(
      { selected },
      { disableFirst: true, disableSecond: true, disableThird: true },
    );
    const tabTitleElements = getAllTabsInTabList();

    const enabledIndices = getEnabledIndices(tabTitleElements);
    expect(enabledIndices).toEqual([]);
  });
});
