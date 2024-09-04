/**
 * Filters out disabled HTMLElements and returns an array of enabled indices
 *
 * @param tabTitleElements Array of HTMLElement
 * @returns Array<number>
 */
export function getEnabledIndices(tabTitleElements: Array<HTMLElement>) {
  return tabTitleElements
    .filter(tabTitleEl => !tabTitleEl.hasAttribute('disabled'))
    .map(tabTitleEl => tabTitleElements.indexOf(tabTitleEl));
}
