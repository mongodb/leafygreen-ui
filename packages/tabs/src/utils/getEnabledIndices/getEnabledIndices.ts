/**
 * Filters out disabled HTMLElements and returns an object with the index and node content for the HTMLElement
 *
 * @param tabTitleElements Array of HTMLElement
 * @returns Array<{index: number, name: string}>
 */
export function getEnabledIndices(tabTitleElements: Array<HTMLElement>) {
  return tabTitleElements
    .filter(tabTitleEl => !tabTitleEl.hasAttribute('disabled'))
    .map(tabTitleEl => {
      return {
        index: tabTitleElements.indexOf(tabTitleEl),
        name: tabTitleEl.dataset.name,
      };
    });
}
