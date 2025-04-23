import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { LGIDS_TABS } from '../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: string = LGIDS_TABS.root,
): TestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId!(lgId);

  /**
   * Queries the `element` for the tab list element. Will throw if no element is found.
   * Then, finds and returns all elements with role=tab. Will throw if no tabs are found.
   */
  const getAllTabsInTabList = (): Array<HTMLElement> => {
    const tabList = queryBySelector<HTMLElement>(
      element,
      `[data-lgid=${LGIDS_TABS.tabList}]`,
    );

    if (!tabList) {
      throw new Error('Unable to find tab list');
    }

    const allTabs = tabList.querySelectorAll<HTMLElement>('[role="tab"]');

    if (allTabs.length === 0) {
      throw new Error('Unable to find any tabs in tab list');
    }

    return Array.from(allTabs);
  };

  /**
   * Gets all tabs in tab list and queries for a tab with matching name
   * Returns utils to read tab, to check if tab is selected, and to check if tab is disabled
   */
  const getTabUtilsByName = (name: string) => {
    const allTabs = getAllTabsInTabList();

    const foundTab = allTabs.find(tab => tab.textContent === name);

    if (!foundTab) return null;

    return {
      getTab: () => foundTab,
      isSelected: () => foundTab.getAttribute('aria-selected') === 'true',
      isDisabled: () => foundTab.hasAttribute('disabled'),
    };
  };

  /**
   * Queries the `element` for the tab panels element. Will throw if no element is found.
   * Then, finds and returns all elements with role=tabpanel. Will throw if no tab panels are found.
   */
  const getAllTabPanelsInDOM = () => {
    const tabPanels = queryBySelector<HTMLElement>(
      element,
      `[data-lgid=${LGIDS_TABS.tabPanels}]`,
    );

    if (!tabPanels) {
      throw new Error('Unable to find tab panels container');
    }

    const allTabPanels =
      tabPanels.querySelectorAll<HTMLElement>('[role="tabpanel"]');

    if (allTabPanels.length === 0) {
      throw new Error(
        'Unable to find any tabpanel elements in tab panels container',
      );
    }

    return Array.from(allTabPanels);
  };

  /**
   * Gets all tab panels and filters for the displayed tab panel. Returns null if selected panel is not found.
   */
  const getSelectedPanel = () => {
    const allTabPanels = getAllTabPanelsInDOM();

    const visibleTabPanel = allTabPanels.find(
      tabPanel => getComputedStyle(tabPanel).display !== 'none',
    );

    if (!visibleTabPanel) return null;

    return visibleTabPanel;
  };

  return {
    getAllTabsInTabList: () => getAllTabsInTabList(),
    getTabUtilsByName: (name: string) => getTabUtilsByName(name),
    getAllTabPanelsInDOM: () => getAllTabPanelsInDOM(),
    getSelectedPanel: () => getSelectedPanel(),
  };
};
